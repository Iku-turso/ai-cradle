import injectable from "@ogre-tools/injectable";
import { createRequire } from "module";
import OpenAI from "openai";
import { terminalInterfaceInjectable } from "./terminal-interface.injectable.mjs";
import { promptInputFromUserInjectable } from "./prompt-input-from-user.injectable.mjs";
import { skillInjectionToken } from "./skill-injection-token.mjs";

const require = createRequire(import.meta.url);

const { getInjectable, lifecycleEnum } = injectable;

export const conversationInjectable = getInjectable({
  id: "conversation",

  instantiate: (di) => {
    const terminalInterface = di.inject(terminalInterfaceInjectable);
    const promptInputFromUser = di.inject(promptInputFromUserInjectable);
    const sendMessage = di.inject(sendMessageInjectable);

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

export const sendMessageInjectable = getInjectable({
  id: "send-message",

  instantiate: (di) => {
    const messages = [];

    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });

    return async (message) => {
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
        // .on("error", (e) => {
        //   throw new Error(e);
        // })

        .on("message", (message) => {
          if (message.tool_calls?.length === 0) {
            delete message.tool_calls;
          }

          messages.push(message);
        });

      return await runner.finalContent();
    };
  },

  lifecycle: lifecycleEnum.keyedSingleton({
    getInstanceKey: (conversationId) => conversationId,
  }),
});

export const sendMessageInjectable2 = getInjectable({
  id: "send-message-2",

  instantiate: (di) => {
    const messages = [];

    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });

    return async (message) => {
      const userMessage = { role: "user", content: message };

      messages.push(userMessage);

      const runner = openai.beta.chat.completions
        .runTools({
          // stream: true,
          model: "gpt-4o",
          messages,
        })
        //   .on("content", (delta, snapshot) => {
        //     console.log(snapshot);
        //   })
        // .on("error", (e) => {
        //   throw new Error(e);
        // })
        .on("message", (message) => {
          if (message.tool_calls?.length === 0) {
            delete message.tool_calls;
          }

          messages.push(message);
        });

      return await runner.finalContent();
    };
  },

  lifecycle: lifecycleEnum.keyedSingleton({
    getInstanceKey: (conversationId) => conversationId,
  }),
});
