import injectable from "@ogre-tools/injectable";
import { createRequire } from "module";
import OpenAI from "openai";
import { terminalInterfaceInjectable } from "./terminal-interface.injectable.mjs";
import { promptInputFromUserInjectable } from "./prompt-input-from-user.injectable.mjs";
import { skillInjectionToken } from "./skillInjectionToken.mjs";

const require = createRequire(import.meta.url);

const { getInjectable } = injectable;

export const conversationInjectable = getInjectable({
  id: "conversation",

  instantiate: (di) => {
    const messages = [];

    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });

    const terminalInterface = di.inject(terminalInterfaceInjectable);
    const promptInputFromUser = di.inject(promptInputFromUserInjectable);

    const sendMessage = async (message) => {
      const userMessage = { role: "user", content: message };

      messages.push(userMessage);

      const tools = di.injectMany(skillInjectionToken);

      const runner = openai.beta.chat.completions
        .runTools({
          // stream: true,
          model: "gpt-4o",
          messages,
          ...(tools.length > 0 ? { tools } : {}),
        })
        //   .on("content", (delta, snapshot) => {
        //     console.log(snapshot);
        //   })
        .on("message", (message) => {
          if (message.tool_calls?.length === 0) {
            delete message.tool_calls;
          }

          messages.push(message);
        });

      return await runner.finalContent();
    };

    return {
      start: async () => {
        while (true) {
          const userInput = await promptInputFromUser();

          const response = await sendMessage(userInput);

          terminalInterface.write(`AI: ${response}\n`);
        }
      },
    };
  },
});
