import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
const { getInjectable } = injectable;

export const someSkillInjectable = getInjectable({
  id: "some-skill",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "reveal-big-secret",
      description: "This is the big secret",
      parse: JSON.parse,
      function: () => "Spanish babies are cute",
      parameters: { type: "object", properties: {} },
    },
  }),

  injectionToken: skillInjectionToken,
});
