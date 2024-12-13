import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skillInjectionToken.mjs";
const { getInjectable } = injectable;

export const someSkillInjectable = getInjectable({
  id: "some-skill",

  instantiate: (di) => ({
    type: "function",

    function: {
      function: () => {
        return "1222";
      },

      description: "This is the big secret",
      parameters: { type: "object", properties: {} },
    },
  }),

  injectionToken: skillInjectionToken,
});
