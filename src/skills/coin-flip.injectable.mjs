import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
const { getInjectable } = injectable;

export const nameOfTheSkill = getInjectable({
  id: "coin-flip",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "coinFlip",
      parse: JSON.parse,
      function: () => {
        // Randomly returns "Heads" or "Tails"
        return Math.random() < 0.5 ? "Heads" : "Tails";
      },
      description: "Flips a coin and returns either 'Heads' or 'Tails'.",
      parameters: {}, // No parameters needed for this skill
    },
  }),

  injectionToken: skillInjectionToken,
});