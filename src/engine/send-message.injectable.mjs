import OpenAI from "openai";
import injectable from "@ogre-tools/injectable";
const { getInjectable, lifecycleEnum } = injectable;
import { skillInjectionToken } from "./skill-injection-token.mjs";
import { aiDirectiveInjectionToken } from "./ai-directive-injection-token.mjs";

export const sendMessageInjectable = getInjectable({
  id: "send-message",

  instantiate: (di) => {
    const directives = di
      .injectMany(aiDirectiveInjectionToken)
      .map(toUserMessage);

    const messages = [...directives];

    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });

    return async (message) => {
      messages.push(toUserMessage(message));

      const skills = di.injectMany(skillInjectionToken);

      const skillsWithErrorHandling = skills.map((skill) => ({
        ...skill,

        function: {
          ...skill.function,
          function: withTryForResult(
            skill.function.function,
            skill.function.name,
          ),
        },
      }));

      const runner = openai.beta.chat.completions
        .runTools({
          // stream: true,
          model: "gpt-4o",
          messages,
          ...(skills.length > 0 ? { tools: skillsWithErrorHandling } : {}),
        })
        //   .on("content", (delta, snapshot) => {
        //     console.log(snapshot);
        //   })
        // .on("error", (e) => {
        //   throw new Error(e);
        // })

        .on("message", (message) => {
          if (message.tool_calls?.length === 0) {
            delete message.tool_calls;
          }

          messages.push(message);
        });

      return await runner.finalContent();
    };
  },

  lifecycle: lifecycleEnum.keyedSingleton({
    getInstanceKey: (conversationId) => conversationId,
  }),
});

const result = {
  ok: (value) => ({ ok: true, value }),
  error: (error) => ({ ok: false, error }),
};

const isFunction = (val) => typeof val === "function";

const isObject = (val) => typeof val === "object" && val !== null;

const isPromiseLike = (res) => {
  if (res instanceof Promise) {
    return true;
  }

  return isObject(res) && hasTypedProperty(res, "then", isFunction);
};

export const withTryForResult =
  (toBeDecorated, skillName) =>
  (...args) => {
    try {
      console.log(`Skill(${skillName}):`, args[0]);

      const maybePromise = toBeDecorated(...args);

      if (isPromiseLike(maybePromise)) {
        return maybePromise.then(result.ok).catch((e) => {
          console.error(`Skill(${skillName}):`, "error", e);
          return result.error(e);
        });
      }

      return result.ok(maybePromise);
    } catch (e) {
      console.error(`Skill(${skillName}):`, "error", e);
      return result.error(e);
    }
  };

const toUserMessage = (message) => ({
  role: "user",
  content: message,
});
