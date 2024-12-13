import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
import cowsay from "cowsay";

const { getInjectable } = injectable;

export const cowsayBannerSkill = getInjectable({
  id: "cowsay-banner-skill",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "cowsay-banner",
      parse: JSON.parse,
      function: (input) => {
        const { text } = input;
        return cowsay.say({ text });
      },
      description: "Use cowsay to show a banner from a provided string.",
      parameters: {
        type: "object",
        properties: {
          text: {
            type: "string",
            description: "The text to display in the cowsay banner.",
          },
        },
        required: ["text"],
      },
    },
  }),

  injectionToken: skillInjectionToken,
});
