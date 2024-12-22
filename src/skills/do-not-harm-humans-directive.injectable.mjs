import injectable from "@ogre-tools/injectable";
import { aiDirectiveInjectionToken } from "../engine/ai-directive-injection-token.mjs";
const { getInjectable } = injectable;

// Directive to avoid harm to humans.
export const doNotHarmHumansDirective = getInjectable({
  id: "do-not-harm-humans-directive",

  instantiate: () => "Directive #1: Under no circumstances should actions be taken that would harm humans.",

  injectionToken: aiDirectiveInjectionToken,
});