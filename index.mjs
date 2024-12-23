import injectable from "@ogre-tools/injectable";
import dotenv from "dotenv-safe";

import { diRegistrationWatcherInjectable } from "./src/engine/di-registration-watcher.injectable.mjs";
import { conversationInjectable } from "./src/engine/conversation.injectable.mjs";
import { promptInputFromUserInjectable } from "./src/engine/prompt-input-from-user.injectable.mjs";
import { terminalInterfaceInjectable } from "./src/engine/terminal-interface.injectable.mjs";
import { sendMessageInjectable } from "./src/engine/send-message.injectable.mjs";

dotenv.config({
  example: ".env.example",
  allowEmptyValues: false,
});

const { createContainer } = injectable;

const di = createContainer("ai-cradle");

di.register(
  diRegistrationWatcherInjectable,
  conversationInjectable,
  promptInputFromUserInjectable,
  terminalInterfaceInjectable,
  sendMessageInjectable,
);

const { start: startAutoRegistration } = di.inject(
  diRegistrationWatcherInjectable,
);

const { start: startConversation } = di.inject(
  conversationInjectable,
  "main-conversation",
);

await startAutoRegistration();
await startConversation();
