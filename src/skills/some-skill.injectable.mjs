import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skillInjectionToken.mjs";
const { getInjectable } = injectable;

export const someSkillInjectable = getInjectable({
  id: "some-skill",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "reveal-big-secret",
      parse: JSON.parse,
      function: () => "Spanish babies are cute",
      description: "This is the big secret",
      parameters: { type: "object", properties: {} },
    },
  }),

  injectionToken: skillInjectionToken,
});
