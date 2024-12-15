import injectable from "@ogre-tools/injectable";
import { aiDirectiveInjectionToken } from "../engine/ai-directive-injection-token.mjs";
const { getInjectable } = injectable;

export const aiSkillCreationDirectiveInjectable = getInjectable({
  id: "ai-skill-creation-directive",

  instantiate: () =>
    "You can generate new AI-skills to yourself when required. The source-code for skills are in directory 'src/skills'. Don't save a new skill before affirmation from me. Save skills as \".injectable.mjs\". This source-code is ECMAScript Module (ESM), which means stuff like __dirname and require() won't work. Use import instead.",

  injectionToken: aiDirectiveInjectionToken,
});
