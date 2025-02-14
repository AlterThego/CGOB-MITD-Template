import type { Profile, StringList, User } from "~/types";

export const useAuthStore = defineStore("auth", () => {
  const email = ref<string | null>(null);
  const username = ref<string | null>(null);
  const active = ref<boolean>(false);
  const verified = ref<string | null>(null);
  const roles = ref<StringList>([]);
  const permissions = ref<StringList>([]);

  const profile = ref<Profile | null>(null);

  const isLoggedIn = computed(() => username.value !== null);
  const hasProfileName = computed(() => profile.value?.full_name !== null);

  const reset = () => {
    email.value = null;
    username.value = null;
    active.value = false;
    verified.value = null;
    roles.value = [];
    permissions.value = [];
    profile.value = null;
  };

  const _setUser = (data: User) => {
    email.value = data.email;
    username.value = data.username;
    active.value = data.active;
    verified.value = data.verified;
    roles.value = (data.roles as StringList) ?? [];
    permissions.value = (data.permissions as StringList) ?? [];
    profile.value = {
      ...data.profile,
    } as Profile;
  };

  const login = async (payload: Object) => {
    const { $api } = useNuxtApp();
    return new Promise((resolve, reject) => {
      $api
        .post("/auth/login", payload)
        .then((res) => {
          _setUser(res.data.data);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /**
   * Sign out user
   * @returns {Promise}
   */
  const logout = async (): Promise<any> => {
    const { $api } = useNuxtApp();
    return new Promise((resolve, reject) => {
      $api
        .post("/auth/logout")
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(reset);
    });
  };

  const getPermissions = async () => {
    const { $api } = useNuxtApp();
    return new Promise((resolve, reject) => {
      $api
        .get("/auth/permissions")
        .then((res) => {
          _setUser(res.data.data);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return {
    email,
    username,
    verified,
    active,
    isLoggedIn,
    hasProfileName,
    roles,
    permissions,
    profile,
    login,
    logout,
    getPermissions,
    reset,
  };
});
