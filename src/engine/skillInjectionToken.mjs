import injectable from "@ogre-tools/injectable";
const { getInjectionToken } = injectable;

export const skillInjectionToken = getInjectionToken({
  id: "ai-skill",
});
