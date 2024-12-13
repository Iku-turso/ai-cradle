import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skillInjectionToken.mjs";
import { sendMessageInjectable2 } from "../engine/conversation.injectable.mjs";
const { getInjectable } = injectable;

const skillToCreateMoreSkillsInjectable = getInjectable({
  id: "skill-to-create-more-skills",

  instantiate: (di) => {
    const sendMessage = di.inject(
      sendMessageInjectable2,
      "skill-creation-conversation",
    );

    return {
      type: "function",

      function: {
        function: async (input) => {
          console.log(222222222222);
          const parsedInput = JSON.parse(input);

          const message =
            'Give me javascript-sourcecode for "' +
            parsedInput.skillDescription +
            '". Use this template of what that could look like: \n' +
            `
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
      parameters: { type: "string", },
    },
  }),
  
  injectionToken: skillInjectionToken,
});`;

          const newVar = await sendMessage(message).catch((e) => {
            console.error("ERROR!", e);

            return "An error took place";
          });

          console.log({ newVar });
          return newVar;
        },
        description:
          "Returns source-code for a new black-magic AI-skill in javascript",
        parameters: {
          type: "object",
          properties: { skillDescription: { type: "string" } },
        },
      },
    };
  },

  injectionToken: skillInjectionToken,
});
