import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Account from '../views/Account.vue';
import Annotations from '../views/Annotations.vue';
import Annotator from '../views/Annotator.vue';
import Criteria from '../views/Criteria.vue';
import Dataset from '../views/Dataset.vue';
import Definitions from '../views/Definitions.vue';
import NotFound from "../views/404.vue";
import {defineAsyncComponent} from "vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/account/:userName',
      name: 'Account',
      component: defineAsyncComponent(() => import("../views/Account.vue")),
    },
    {
      path: '/Annotations',
      name: 'Annotations',
      component: Annotations,
    },
    {
      path: '/Annotator',
      name: 'Annotator',
      component: Annotator,
    },
    {
      path: '/Criteria',
      name: 'Criteria',
      component: Criteria,
    },
    {
      path: '/dataset/:datasetName',
      name: 'Dataset',
      component: Dataset,
    },
    {
      path: '/Definitions',
      name: 'Definitions',
      component: Definitions,
    },
    {
      path: "/:pathMatch(.*)*",
      name: 'NotFound',
      component: NotFound,
    },
  ]
});

router.beforeEach((to, from) => {
  if (to.name) {
    document.title = `DefNotator - ${to.name.toString()}`;
  } else {
    document.title = 'DefNotator';
  }
});

export default router
