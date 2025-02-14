import OpenLayersMap from "vue3-openlayers";

export default defineNuxtPlugin(async ({ vueApp }) => {
  const auth = useAuthStore();

  vueApp.use(OpenLayersMap);

  if (auth.isLoggedIn) {
    await auth.getPermissions().catch((e) => e);
  }
});
