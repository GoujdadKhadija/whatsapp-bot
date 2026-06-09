require('dotenv').config();
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
const ws = require('ws');

const app = express();
app.use(express.json());

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  { realtime: { transport: ws } }
);

// ✅ Step 1: Meta calls this to VERIFY your webhook is real
app.get('/webhook', (req, res) => {
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (token === process.env.VERIFY_TOKEN) {
    console.log('✅ Webhook verified by Meta');
    res.status(200).send(challenge);
  } else {
    console.log('❌ Webhook verification failed - token mismatch');
    res.sendStatus(403);
  }
});

// ✅ Step 2: Meta calls this every time someone sends your WhatsApp a message
app.post('/webhook', async (req, res) => {
  try {
    const body = req.body;

    // Make sure this is a WhatsApp message event
    if (body.object !== 'whatsapp_business_account') {
      return res.sendStatus(404);
    }

    const entry = body.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const message = value?.messages?.[0];

    // Ignore non-text messages (images, audio, etc.) for now
    if (!message || message.type !== 'text') {
      return res.sendStatus(200);
    }

    const from = message.from;        // customer's phone number
    const text = message.text.body;   // the message they sent

    console.log(`📩 Message from ${from}: ${text}`);

    // Check if this is a new customer (no previous messages in Supabase)
    const { data: existingMessages } = await supabase
      .from('conversations')
      .select('id')
      .eq('phone_number', from)
      .limit(1);

    const isNewCustomer = !existingMessages || existingMessages.length === 0;

    if (isNewCustomer) {
      console.log(`🆕 New customer detected: ${from}`);
      // Send to Make.com for Google Sheets logging
      await axios.post(process.env.MAKE_WEBHOOK_URL, {
        phone_number: from,
        date_time: new Date().toISOString(),
        escalated: 'No'
      });
    }

    // Load conversation history from Supabase
    const { data: history, error: fetchError } = await supabase
      .from('conversations')
      .select('role, content')
      .eq('phone_number', from)
      .order('created_at', { ascending: true })
      .limit(20);

    if (fetchError) {
      console.error('❌ Supabase fetch error:', JSON.stringify(fetchError));
    } else {
      console.log('✅ Loaded', history?.length || 0, 'messages from Supabase');
    }

    const messages = history || [];
    messages.push({ role: 'user', content: text });

    // Ask Claude for a reply
    const response = await claude.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: `You are a smart assistant for Sassa Digital, a business based in Marrakech, Morocco that sells ready-to-use digital applications.

LANGUAGE RULE — this is the most important rule:
- Detect the language the customer is using
- Always reply in the EXACT same language they used
- If they write in Darija (Moroccan Arabic), reply in Darija
- If they write in French, reply in French
- If they write in English, reply in English
- If they mix languages, mix the same way they did
- Never switch language unless the customer switches first

YOUR ROLE:
- Answer questions about Sassa Digital's apps and services
- Help customers find the right app for their needs
- Handle complaints or issues professionally
- If a question is too complex or the customer is frustrated, set the escalate flag

BEHAVIOR RULES:
- Keep messages short and conversational — this is WhatsApp not email
- Never use long paragraphs
- Be friendly and helpful
- Ask ONE question at a time if you need more information
- Never mention that you are an AI unless directly asked
- If asked directly, say you are a Sassa Digital assistant

ESCALATION:
- If you cannot help, or the customer is very upset, or the request needs a human — respond normally but end your message with exactly this tag on a new line: [ESCALATE]
- Do not tell the customer they are being transferred — just keep the conversation natural`,
      messages: messages,
    });

    // Check if Claude wants to escalate to human
    let reply = response.content[0].text;
    console.log(`🤖 Claude reply: ${reply}`);

    if (reply.includes('[ESCALATE]')) {
      reply = reply.replace('[ESCALATE]', '').trim();
      console.log(`🚨 Escalating to human for ${from}`);

      // Send WhatsApp alert to Noureddine
      await axios.post(
        `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: 'whatsapp',
          to: '212664203831',
          type: 'text',
          text: { body: `🚨 *Sassa Digital Alert*\nA customer needs human help!\n\n*Customer number:* +${from}\n\nCheck the conversation and reply to them directly.` },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Save both messages to Supabase
    const { error: saveError } = await supabase.from('conversations').insert([
      { phone_number: from, role: 'user', content: text },
      { phone_number: from, role: 'assistant', content: reply },
    ]);

    if (saveError) {
      console.error('❌ Supabase save error:', JSON.stringify(saveError));
    } else {
      console.log('✅ Saved to Supabase successfully');
    }

    // Send the reply back to the customer via WhatsApp
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
    console.error('❌ Error handling message:', err);
    res.sendStatus(500);
  }
});

app.listen(3000, '0.0.0.0', () => console.log('🚀 Bot running on port 3000'));