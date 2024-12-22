import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
const { getInjectable } = injectable;

export const directiveCreationSkill = getInjectable({
  id: "directive-creation-skill",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "get-directive-template",
      description:
        "Returns a JavaScript (.mjs) template for source code of a new directive. It needs to be specialized with context-specific changes, and the comments need to be removed. Use import over require, as the result should be ECMAScript Module (ESM) syntax.",
      parse: JSON.parse,

      function: async () => `
import injectable from "@ogre-tools/injectable";
import { aiDirectiveInjectionToken } from "../engine/ai-directive-injection-token.mjs";
const { getInjectable } = injectable;

// Change nameOfTheDirective to something specific. Use kebab-case, and a human-readable, descriptive value.
export const nameOfTheDirective = getInjectable({
// Change idOfTheDirective to something specific.
id: "some-id",

instantiate: () => "Your directive content here.",

injectionToken: aiDirectiveInjectionToken,
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