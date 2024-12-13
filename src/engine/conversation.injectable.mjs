import injectable from "@ogre-tools/injectable";
import ogreToolsFp from "@ogre-tools/fp";
import { createRequire } from "module";
import OpenAI from "openai";
import { terminalInterfaceInjectable } from "./terminal-interface.injectable.mjs";
import { promptInputFromUserInjectable } from "./prompt-input-from-user.injectable.mjs";

const require = createRequire(import.meta.url);
const lodashFp = require("lodash/fp");

const { pipeline } = ogreToolsFp;
const { values, filter, spread } = lodashFp;
const { getInjectable, isInjectable } = injectable;

export const conversationInjectable = getInjectable({
  id: "conversation",

  instantiate: (di) => {
    const messageThread = [];

    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });

    const terminalInterface = di.inject(terminalInterfaceInjectable);
    const promptInputFromUser = di.inject(promptInputFromUserInjectable);

    const sendMessage = async (message) => {
      const userMessage = { role: "user", content: message };

      messageThread.push(userMessage);

      const runner = openai.beta.chat.completions
        .runTools({
          // stream: true,
          model: "gpt-4o",
          messages: messageThread,

          tools: [
            {
              type: "function",
              function: {
                function: () => {
                  return "42";
                },
                description: "Get the meaning of life",
                parameters: { type: "object", properties: {} },
              },
            },
          ],
        })
        //   .on("content", (delta, snapshot) => {
        //     console.log(snapshot);
        //   })
        .on("message", (message) => {
          if (message.tool_calls?.length === 0) {
            delete message.tool_calls;
          }

          messageThread.push(message);
        });

      return await runner.finalContent();
    };

    return {
      start: async () => {
        while (true) {
          const userInput = await promptInputFromUser();
          // terminalInterface.write(`User: ${userInput}\n`);

          const response = await sendMessage(userInput);

          terminalInterface.write(`AI: ${response}\n`);
        }
      },
    };

    // return {
    //   sendMessage: ,
    //
    //   get messageThread() {
    //     return messageThread
    //       .filter((message) => message.role !== "tool")
    //       .filter((message) => message.tool_calls === undefined)
    //       .map((message) => message.content);
    //   },
    // };
  },
});
