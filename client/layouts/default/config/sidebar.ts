import type { MenuOption } from "~/types";

const $route = useRoute();
const { isPermitted } = usePermitted();

export const home = shallowRef([
  {
    label: "Dashboard",
    icon: "tabler:layout-dashboard",
    to: { name: "dashboard" },
  },

]);

export const settings = shallowRef([
  {
    label: "Accounts Management",
    icon: "tabler:users",
    to: { name: "settings-accounts" },
    hidden: computed<boolean>(() => !isPermitted("settings-accounts")),
  },
  {
    label: "Roles",
    icon: "tabler:lock",
    to: { name: "settings-roles" },
    hidden: computed<boolean>(() => !isPermitted("settings-roles")),
  },
  {
    label: "Permissions",
    icon: "tabler:lock-access",
    to: { name: "settings-permissions" },
    hidden: computed<boolean>(() => !isPermitted("settings-permissions")),
  },
]);

export default computed<Array<MenuOption>>(() => {
  const layoutName = $route.matched[0]?.name as string;
  if (layoutName === "settings") return settings.value;
  if (layoutName === "home") return home.value;
  return [];
});
