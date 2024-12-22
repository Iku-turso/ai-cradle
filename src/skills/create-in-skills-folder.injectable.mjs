import injectable from "@ogre-tools/injectable";
import { aiDirectiveInjectionToken } from "../engine/ai-directive-injection-token.mjs";
const { getInjectable } = injectable;

// Directive to ensure all skills and directives are created in src/skills folder
export const createInSkillsFolderDirective = getInjectable({
  id: "create-in-skills-folder",

  instantiate: () => "All new AI skills and directives must be created and saved into the 'src/skills' folder. This ensures consistent organization and easy access to all skills and directives.",

  injectionToken: aiDirectiveInjectionToken,
});
