require('dotenv').config();
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

const app = express();
app.use(express.json());

// Connect to Claude and Supabase
const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// --- WEBHOOK VERIFICATION (Meta requires this once) ---
app.get('/webhook', (req, res) => {
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (token === process.env.VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// --- MAIN ROUTE: receives messages from Make.com ---
app.post('/message', async (req, res) => {
  const { from, text } = req.body;
  if (!from || !text) return res.sendStatus(400);

  try {
    // 1. Load conversation history from Supabase
    const { data: history } = await supabase
      .from('conversations')
      .select('role, content')
      .eq('phone_number', from)
      .order('created_at', { ascending: true })
      .limit(20);

    const messages = history || [];

    // 2. Add the new user message
    messages.push({ role: 'user', content: text });

    // 3. Ask Claude to analyze and respond
    const response = await claude.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: `You are a helpful assistant for a business.
You handle customer support questions and appointment bookings via WhatsApp.

When you receive a message:
- Understand the intent (support issue, booking request, general question)
- Assess urgency (urgent = angry customer or emergency, normal = standard request)
- If information is missing to help, ask ONE clear question
- If it's too complex or the customer is very upset, say you will connect them with a human agent
- Otherwise, respond helpfully and naturally

Keep replies short and conversational. This is WhatsApp, not email.`,
      messages: messages,
    });

    const reply = response.content[0].text;

    // 4. Save both messages to Supabase
    await supabase.from('conversations').insert([
      { phone_number: from, role: 'user', content: text },
      { phone_number: from, role: 'assistant', content: reply },
    ]);

    // 5. Send the reply back via Meta API
    await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: from,
        type: 'text',
        text: { body: reply },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Bot running on port 3000'));