import { useStorage } from "@vueuse/core";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useAppConfig().ui;
  const primary = useStorage("primary", config.primary);
  const gray = useStorage("gray", config.gray);

  config.primary = primary.value;
  config.gray = gray.value;

  watch(config, (val) => {
    primary.value = val.primary;
    gray.value = val.gray;
  });

  return { provide: { primary, gray } };
});
