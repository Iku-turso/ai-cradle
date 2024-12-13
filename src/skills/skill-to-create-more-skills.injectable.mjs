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
        "Returns a javascript (.mjs) template for source-code of a new AI-skill. It needs to be specialized with context specific changes, and the comments need to be removed. Use import over require, as the result should be ECMAScript Module (ESM) syntax. The filename of skill should have extension '.injectable.mjs'",
      parse: JSON.parse,

      function: async () => `
import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
const { getInjectable } = injectable;

// Change nameOfTheSkill to something specific. Use kebab-case, and a human readable, descriptive value.
export const nameOfTheSkill = getInjectable({
// Change idfTheSkill to something specific.
id: "some-id",

instantiate: (di) => ({
  type: "function",

  function: {
    // This is the name of the skill. Replace this with a good name.
    name: "some-skill-name",
    parse: JSON.parse,
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
