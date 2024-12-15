import { terminalInterfaceInjectable } from "./terminal-interface.injectable.mjs";
import { promptInputFromUserInjectable } from "./prompt-input-from-user.injectable.mjs";
import { sendMessageInjectable } from "./send-message.injectable.mjs";

import injectable from "@ogre-tools/injectable";
import { aiDirectiveInjectionToken } from "./ai-directive-injection-token.mjs";
const { getInjectable } = injectable;

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
          terminalInterface.write("\n");

          const response = await sendMessage(userInput);

          terminalInterface.write(`AI: ${response}\n\n`);
        }
      },
    };
  },
});
