export const useGuard = () => {
  const $auth = useAuthStore();
  const _super = import.meta.env.NUXT_APP_SUPERMAN ?? "Admin";

  const isSuperAdmin = () => hasRole(_super);

  const can = (permission: string | string[]): boolean => {
    if (Array.isArray(permission)) {
      return hasAnyPermission(permission) || isSuperAdmin();
    } else if (typeof permission === "string") {
      const x = permission.split("|");
      if (x.length > 1) {
        return can(x);
      }

      return hasPermission(permission) || isSuperAdmin();
    }
    return false;
  };

  const hasRole = (role: string): boolean => {
    return !!role && $auth.roles.includes(role);
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.length > 0 && roles.some((r) => hasRole(r));
  };

  const hasAllRoles = (roles: string[]): boolean => {
    return roles.length > 0 && roles.every((r) => hasRole(r));
  };

  const hasPermission = (permission: string): boolean => {
    return !!permission && $auth.permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.length > 0 && permissions.some((p) => hasPermission(p));
  };

  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.length > 0 && permissions.every((p) => hasPermission(p));
  };

  const hasAll = (permissions: string[], roles: string[]): boolean => {
    return hasAllPermissions(permissions) && hasAllRoles(roles);
  };

  const hasAny = (permissions: string[], roles: string[]): boolean => {
    return hasAnyPermission(permissions) || hasAnyRole(roles);
  };

  const hasNone = (permissions: string[], roles: string[]): boolean => {
    return !hasAnyPermission(permissions) && !hasAnyRole(roles);
  };

  return {
    isSuperAdmin,
    can,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasAll,
    hasAny,
    hasNone,
  };
};
