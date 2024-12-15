import injectable from "@ogre-tools/injectable";
const { getInjectionToken } = injectable;

export const aiDirectiveInjectionToken = getInjectionToken({
  id: "ai-directive",
});
