import injectable from "@ogre-tools/injectable";

import { diRegistrationWatcherInjectable } from "./src/engine/di-registration-watcher.injectable.mjs";

const { createContainer } = injectable;

const di = createContainer("ai-cradle");

di.register(diRegistrationWatcherInjectable);

const { start, close } = di.inject(diRegistrationWatcherInjectable);

start();

setInterval(() => {}, 1000);
