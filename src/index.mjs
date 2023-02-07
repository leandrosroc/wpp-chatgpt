import { create } from "@open-wa/wa-automate";
import { openai } from "./config/index.mjs";

const prefix = '!gpt'
create({
  sessionId: "GPT-3",
  multiDevice: false,
  authTimeout: 60,
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: "PT_BR",
  logConsole: false,
  popup: true,
  qrTimeout: 0,
}).then((client) => start(client));

function start(client) {
  client.onMessage(async (message) => {
    if (message.body.startsWith(prefix)) {
      const body = message.body.substring(prefix.length + 1);

      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: body,
        temperature: 0.5,
        max_tokens: 200,
      });

      await client.sendText(message.from, completion.data.choices[0].text);
    }
    else {
      await client.sendText(message.from, "Exemplo de uso: *!gpt sua mensagem aqui*, para falar com o robô");
    }
  });
}
