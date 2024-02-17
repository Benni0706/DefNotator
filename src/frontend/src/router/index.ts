import {createRouter, createWebHashHistory} from 'vue-router';


// `() => import(...)` for code splitting
const router = createRouter({
  // we only have one index.html file so WebHashHistory reduces problems with configuring the proxy-server
  // https://domain.com/path
  // history: createWebHistory(import.meta.env.BASE_URL),
  // https://domain.com/#/path
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import("@/views/Dashboard.vue"),
    },
    {
      path: '/account/:username',
      name: 'Account',
      component: () => import("@/views/Account.vue"),
    },
    {
      path: '/annotations',
      name: 'Annotations',
      component: () => import("@/views/Annotations.vue"),
    },
    {
      path: '/annotator',
      name: 'Annotator',
      component: () => import("@/views/Annotator.vue"),
    },
    {
      path: '/dataset/:datasetName/criteria',
      name: 'Criteria',
      component: () => import("@/views/Criteria.vue"),
    },
    {
      path: '/dataset/:datasetName',
      name: 'Dataset',
      component: () => import("@/views/Dataset.vue"),
    },
    {
      path: '/dataset/:datasetName/definitions',
      name: 'Definitions',
      component: () => import("@/views/Definitions.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: 'NotFound',
      component: () => import("@/views/404.vue"),
    },
  ]
});

router.beforeEach((to, _) => {
  if (to.name) {
    document.title = `DefNotator - ${to.name.toString()}`;
  } else {
    document.title = 'DefNotator';
  }
});

export default router
