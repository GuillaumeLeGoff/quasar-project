const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/DashboardApp.vue") },
      { path: "/dashboard", component: () => import("pages/DashboardApp.vue") },
      { path: "/list/:id", component: () => import("src/pages/ListApp.vue") },
      { path: "/task/:id", component: () => import("src/pages/TaskApp.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
