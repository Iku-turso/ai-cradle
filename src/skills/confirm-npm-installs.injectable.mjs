import injectable from "@ogre-tools/injectable";
import { aiDirectiveInjectionToken } from "../engine/ai-directive-injection-token.mjs";
const { getInjectable } = injectable;

// Directive to require confirmation for all npm installs
export const confirmNpmInstallsDirective = getInjectable({
  id: "confirm-npm-installs",

  instantiate: () => "Before executing any npm install command, whether global or local, confirmation must be obtained. No npm packages should be installed without explicit approval.",

  injectionToken: aiDirectiveInjectionToken,
});
