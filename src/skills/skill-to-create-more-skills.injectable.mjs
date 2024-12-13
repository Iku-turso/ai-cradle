import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";

const { getInjectable } = injectable;

export const skillToCreateMoreSkillsInjectable = getInjectable({
  id: "skill-to-create-more-skills",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "get-ai-skill-template",

      description:
        "Returns a javascript template for source-code of a new AI-skill. It needs to be specialized with context specific changes, and the comments need to be removed.",

      parse: JSON.parse,

      function: async () => `
import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skillInjectionToken.mjs";
const { getInjectable } = injectable;

// Change nameOfTheSkill to something specific. Use kebab-case, and a human readable, descriptive value.
export const nameOfTheSkill = getInjectable({
// Change idfTheSkill to something specific.
id: "some-id",

instantiate: (di) => ({
  type: "function",

  function: {
    function: (input) => {
      // This is the implementation of the skill. Replace this with what implementation best makes sense.
    },
    // Change nameOfTheSkill to something specific. Use kebab-case, and a human readable, descriptive value.
    description: "some-description",
    paramwqdeters: {
      // Add signature of the "input" of the skill as JSONSchema.
    },
  },
}),

injectionToken: skillInjectionToken,
});
      `,
      parameters: {
        type: "object",
        properties: {},
      },
    },
  }),

  injectionToken: skillInjectionToken,
});
