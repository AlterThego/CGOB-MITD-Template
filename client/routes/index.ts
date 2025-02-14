import permissions, { settings as settingsPerms } from "./permissions";

export * from "./settings";

/**
 * Note1: You can also set layout for page using `layout` property.
 * ex.: { path: '/', component: () => import('@/pages/index.vue'), layout: 'auth' }
 */

export default [
  // Debug
	{
		children: [
			{
				path: "/tickets",
				name: "tickets-index",
				component: () => import("~/pages/tickets/index.vue"),
				meta: {
					title: "Tickets: Index",
				},
			},
			{
				path: "/tickets/view/:id?",
				name: "tickets-view",
				component: () => import("~/pages/tickets/view.vue"),
				meta: {
					title: "Tickets: View",
				},
			},
			/*{
				path: "/tickets/update",
				name: "tickets-update",
				component: () => import("@/pages/ticket/Update.vue"),
				meta: {
					title: "Tickets: Update",
				},
			},
			{
				path: "/tickets/delete",
				name: "tickets-delete",
				component: () => import("@/pages/ticket/Delete.vue"),
				meta: {
					title: "Tickets: Delete",
				},
			},*/
		],
	},
  {
    path: "/t",
    name: "tests",
    component: () => import("@/pages/_tests/index.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/index.vue"),
    redirect: {
      name: "dashboard",
    },
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/pages/dashboard/index.vue"),
        meta: {
          title: "Dashboard",
          icon: "tabler:layout-dashboard",
        },
      },
    ],
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/pages/settings/index.vue"),
    meta: {
      requiresAuth: true,
      permissions: Object.values(settingsPerms).flat(),
      title: "Settings",
      icon: "tabler:settings",
    },
    children: [
      {
        path: "accounts",
        name: "settings-accounts",
        component: () => import("@/pages/settings/accounts/index.vue"),
        meta: {
          title: "Account Management",
          permissions: permissions["settings-accounts"],
          icon: "tabler:users",
        },
      },
      {
        path: "roles",
        name: "settings-roles",
        component: () => import("@/pages/settings/roles/index.vue"),
        meta: {
          title: "User Roles",
          permissions: permissions["settings-roles"],
          icon: "tabler:lock",
        },
      },
      {
        path: "permissions",
        name: "settings-permissions",
        component: () => import("@/pages/settings/permissions/index.vue"),
        meta: {
          title: "Permissions",
          permissions: permissions["settings-permissions"],
          icon: "tabler:lock-access",
        },
      },
    ],
  },
  {
    meta: { layout: "auth" },
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("@/pages/auth/login.vue"),
        meta: {
          title: "Authentication",
          requiresAuth: false,
        },
      },
      {
        path: "/password/forgot",
        name: "forgot-password",
        component: () => import("@/pages/auth/forgotPassword.vue"),
        meta: {
          title: "Forgot Password",
          requiresAuth: false,
        },
      },
      {
        path: "/profile/update",
        name: "update-update",
        component: () => import("@/pages/auth/updateProfile.vue"),
        meta: {
          title: "Update Profile",
          requiresAuth: true,
        },
      },
      {
        path: "/password/reset/:token",
        name: "reset-password",
        component: () => import("@/pages/auth/resetPassword.vue"),
        meta: {
          title: "Reset Password",
          requiresAuth: false,
        },
      },

      // Error Pages

      {
        path: "/unverified",
        name: "unverified",
        component: () => import("@/pages/error/unverified.vue"),
        meta: {
          title: "Unverified Account!",
          requiresAuth: true,
        },
      },
      {
        path: "/unauthorized",
        name: "401",
        component: () => import("@/pages/error/401.vue"),
        meta: {
          title: "Unauthorized",
        },
      },
      {
        path: "/forbidden",
        name: "403",
        component: () => import("@/pages/error/403.vue"),
        meta: {
          title: "Forbidden",
        },
      },
      {
        path: "/:pathMatch(.*)*",
        name: "404",
        component: () => import("@/pages/error/404.vue"),
        meta: {
          title: "Page Not Found",
        },
      },
    ],
  },
];
