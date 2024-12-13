import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skillInjectionToken.mjs";
const { getInjectable } = injectable;

const someSkillInjectable = getInjectable({
  id: "some-skill",

  instantiate: (di) => ({
    type: "function",

    function: {
      function: () => "Spanish babies are cute",
      description: "This is the big secret",
      parameters: { type: "object", properties: {} },
    },
  }),

  injectionToken: skillInjectionToken,
});
