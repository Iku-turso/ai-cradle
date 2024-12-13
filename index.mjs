import injectable from "@ogre-tools/injectable";
import dotenv from "dotenv";

import { diRegistrationWatcherInjectable } from "./src/engine/di-registration-watcher.injectable.mjs";
import {
  conversationInjectable,
  sendMessageInjectable,
} from "./src/engine/conversation.injectable.mjs";
import { promptInputFromUserInjectable } from "./src/engine/prompt-input-from-user.injectable.mjs";
import { terminalInterfaceInjectable } from "./src/engine/terminal-interface.injectable.mjs";

dotenv.config();

const { createContainer } = injectable;

const di = createContainer("ai-cradle");

di.register(
  diRegistrationWatcherInjectable,
  conversationInjectable,
  promptInputFromUserInjectable,
  terminalInterfaceInjectable,
  sendMessageInjectable,
);

const { start: startAutoRegistration, close } = di.inject(
  diRegistrationWatcherInjectable,
);

const { start: startConversation } = di.inject(
  conversationInjectable,
  "main-conversation",
);

startAutoRegistration();
await startConversation();
