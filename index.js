PS C:\Users\goujd\Desktop\AIautomation\whatsapp-bot> flyctl secrets set SUPABASE_URL=https://ckclcyhhaezkrjmrhplb.supabase.co
Updating existing machines in 'whatsapp-bot-damp-shape-5114' with rolling strategy

-------
 ✖ Machine 2867541b54d938 [app] update failed: smoke checks for 2867541b54d938 …
-------
Error: smoke checks for 2867541b54d938 failed: the app appears to be crashing
Smoke checks for 2867541b54d938 failed: the app appears to be crashing
Check its logs: here's the last lines below, or run 'fly logs -i 2867541b54d938':
 INFO Main child exited normally with code: 1
 INFO Starting clean up.
[    3.065170] reboot: Restarting system
Configuring firecracker
2026-05-18T14:59:09.019371642 [01KRXSJ421TCY4ZH05KAPYQ8WD:main] Running Firecracker v1.14.4
2026-05-18T14:59:09.019582399 [01KRXSJ421TCY4ZH05KAPYQ8WD:main] Listening on API socket ("/fc.sock").
 INFO Starting init (commit: d21f468d)...
 INFO Preparing to run: `docker-entrypoint.sh node index.js` as root
 INFO [fly api proxy] listening at /.fly/api
Machine created and started in 2.498s
[PC01] instance refused connection. is your app listening on 0.0.0.0:3000? make sure it is not only listening on 127.0.0.1 (hint: look at your startup logs, servers often print the address they are listening on)
2026/05/18 14:59:10 INFO SSH listening listen_address=[fdaa:76:6955:a7b:f3:daeb:d8d9:2]:22
◇ injected env (0) from .env // tip: ◈ secrets for agents [www.dotenvx.com]
/app/node_modules/@supabase/supabase-js/dist/index.cjs:363
                if (!supabaseKey) throw new Error("supabaseKey is required.");
                                  ^
Error: supabaseKey is required.
    at new SupabaseClient (/app/node_modules/@supabase/supabase-js/dist/index.cjs:363:27)
    at createClient (/app/node_modules/@supabase/supabase-js/dist/index.cjs:587:9)
    at Object.<anonymous> (/app/index.js:12:18)
    at Module._compile (node:internal/modules/cjs/loader:1521:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1623:10)
    at Module.load (node:internal/modules/cjs/loader:1266:32)
    at Module._load (node:internal/modules/cjs/loader:1091:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:164:12)
    at node:internal/main/run_main_module:28:49
Node.js v20.20.2
 INFO Main child exited normally with code: 1
 INFO Starting clean up.
[    2.007357] reboot: Restarting system
2026-05-18T14:59:12.151892931 [01KRXSJ421TCY4ZH05KAPYQ8WD:main] Running Firecracker v1.14.4
2026-05-18T14:59:12.152092067 [01KRXSJ421TCY4ZH05KAPYQ8WD:main] Listening on API socket ("/fc.sock").
 INFO Starting init (commit: d21f468d)...
Starting machine
[PM01] machines API returned an error: "machine ID 2867541b54d938 lease currently held by 21fa95b3-2efc-56a5-b486-e1547d11edba@tokens.fly.io, expires at 2026-05-18T14:59:24Z"
 INFO Preparing to run: `docker-entrypoint.sh node index.js` as root
 INFO [fly api proxy] listening at /.fly/api
Machine started in 1.385s
2026/05/18 14:59:13 INFO SSH listening listen_address=[fdaa:76:6955:a7b:f3:daeb:d8d9:2]:22
◇ injected env (0) from .env // tip: ⌁ auth for agents [www.vestauth.com]
/app/node_modules/@supabase/supabase-js/dist/index.cjs:363
                if (!supabaseKey) throw new Error("supabaseKey is required.");
                                  ^
Error: supabaseKey is required.
    at new SupabaseClient (/app/node_modules/@supabase/supabase-js/dist/index.cjs:363:27)
    at createClient (/app/node_modules/@supabase/supabase-js/dist/index.cjs:587:9)
    at Object.<anonymous> (/app/index.js:12:18)
    at Module._compile (node:internal/modules/cjs/loader:1521:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1623:10)
    at Module.load (node:internal/modules/cjs/loader:1266:32)
    at Module._load (node:internal/modules/cjs/loader:1091:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:164:12)
    at node:internal/main/run_main_module:28:49
Node.js v20.20.2
 INFO Main child exited normally with code: 1
 INFO Starting clean up.
[    2.001934] reboot: Restarting system
2026-05-18T14:59:15.384480548 [01KRXSJ421TCY4ZH05KAPYQ8WD:main] Running Firecracker v1.14.4
2026-05-18T14:59:15.384692385 [01KRXSJ421TCY4ZH05KAPYQ8WD:main] Listening on API socket ("/fc.sock").


PS C:\Users\goujd\Desktop\AIautomation\whatsapp-bot> flyctl secrets set SUPABASE_KEY=sb_publishable_sLdhuLTzlUxmapcQClfKmg_y9ukbc11
Updating existing machines in 'whatsapp-bot-damp-shape-5114' with rolling strategy

-------
 ✖ Machine 2867541b54d938 [app] update failed: smoke checks for 2867541b54d938 …
-------
Error: smoke checks for 2867541b54d938 failed: the app appears to be crashing
Smoke checks for 2867541b54d938 failed: the app appears to be crashing
Check its logs: here's the last lines below, or run 'fly logs -i 2867541b54d938':
 INFO Main child exited with signal (with signal 'SIGINT', core dumped? false)
 INFO Starting clean up.
[    2.127343] reboot: Restarting system
2026-05-18T14:59:50.855493998 [01KRXSKB5ATKMZYNHQ57PXYWD3:main] Running Firecracker v1.14.4
2026-05-18T14:59:50.855747384 [01KRXSKB5ATKMZYNHQ57PXYWD3:main] Listening on API socket ("/fc.sock").
 INFO Starting init (commit: d21f468d)...
 INFO Preparing to run: `docker-entrypoint.sh node index.js` as root
 INFO [fly api proxy] listening at /.fly/api
Machine created and started in 4.269s
2026/05/18 14:59:52 INFO SSH listening listen_address=[fdaa:76:6955:a7b:f3:daeb:d8d9:2]:22
◇ injected env (0) from .env // tip: ⌘ override existing { override: true }
/app/node_modules/@supabase/realtime-js/dist/main/lib/websocket-factory.js:103
        throw new Error(errorMessage);
        ^
Error: Node.js 20 detected without native WebSocket support.
Suggested solution: For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })
    at WebSocketFactory.getWebSocketConstructor (/app/node_modules/@supabase/realtime-js/dist/main/lib/websocket-factory.js:103:15)
    at RealtimeClient._initializeOptions (/app/node_modules/@supabase/realtime-js/dist/main/RealtimeClient.js:642:164)
    at new RealtimeClient (/app/node_modules/@supabase/realtime-js/dist/main/RealtimeClient.js:185:43)
    at SupabaseClient._initRealtimeClient (/app/node_modules/@supabase/supabase-js/dist/index.cjs:554:10)
    at new SupabaseClient (/app/node_modules/@supabase/supabase-js/dist/index.cjs:389:24)
    at createClient (/app/node_modules/@supabase/supabase-js/dist/index.cjs:587:9)
    at Object.<anonymous> (/app/index.js:12:18)
    at Module._compile (node:internal/modules/cjs/loader:1521:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1623:10)
    at Module.load (node:internal/modules/cjs/loader:1266:32)
Node.js v20.20.2
 INFO Main child exited normally with code: 1
 INFO Starting clean up.
[    1.990829] reboot: Restarting system
 INFO Starting init (commit: d21f468d)...
 INFO Preparing to run: `docker-entrypoint.sh node index.js` as root
 INFO [fly api proxy] listening at /.fly/api
Machine started in 1.272s
2026/05/18 14:59:55 INFO SSH listening listen_address=[fdaa:76:6955:a7b:f3:daeb:d8d9:2]:22
◇ injected env (0) from .env // tip: ⌘ override existing { override: true }
/app/node_modules/@supabase/realtime-js/dist/main/lib/websocket-factory.js:103
        throw new Error(errorMessage);
        ^
Error: Node.js 20 detected without native WebSocket support.
Suggested solution: For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })
    at WebSocketFactory.getWebSocketConstructor (/app/node_modules/@supabase/realtime-js/dist/main/lib/websocket-factory.js:103:15)
    at RealtimeClient._initializeOptions (/app/node_modules/@supabase/realtime-js/dist/main/RealtimeClient.js:642:164)
    at new RealtimeClient (/app/node_modules/@supabase/realtime-js/dist/main/RealtimeClient.js:185:43)
    at SupabaseClient._initRealtimeClient (/app/node_modules/@supabase/supabase-js/dist/index.cjs:554:10)
    at new SupabaseClient (/app/node_modules/@supabase/supabase-js/dist/index.cjs:389:24)
    at createClient (/app/node_modules/@supabase/supabase-js/dist/index.cjs:587:9)
    at Object.<anonymous> (/app/index.js:12:18)
    at Module._compile (node:internal/modules/cjs/loader:1521:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1623:10)
    at Module.load (node:internal/modules/cjs/loader:1266:32)
Node.js v20.20.2
 INFO Main child exited normally with code: 1
 INFO Starting clean up.
[    1.991685] reboot: Restarting system
2026-05-18T14:59:58.113368757 [01KRXSKB5ATKMZYNHQ57PXYWD3:main] Running Firecracker v1.14.4
2026-05-18T14:59:58.113541324 [01KRXSKB5ATKMZYNHQ57PXYWD3:main] Listening on API socket ("/fc.sock").