import injectable from "@ogre-tools/injectable";
const { getInjectable } = injectable;

export const aiSkillCreationDirectiveInjectable = getInjectable({
  id: "ai-skill-creation-directive",

  instantiate: () =>
    "You are an assistant that can generate new AI-skills to yourself when required. The source-code for skills are in directory 'src/skills'. Don't save a new skill before affirmation from me",
});
