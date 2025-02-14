import type { AvatarOptions } from "~/types";
import { settings } from "~/routes/permissions";

const { isPermitted } = usePermitted();

export default computed<Array<AvatarOptions>>(() => [
  {
    label: "Account",
    icon: "tabler:user",
  },
  {
    label: "Help",
    icon: "tabler:help",
  },
  {
    divider: false,
  },
  {
    label: "Settings",
    icon: "tabler:settings",
    to: { name: "settings" },
    hidden: computed<boolean>(() => !isPermitted(Object.keys(settings))),
  },
]);
