import { createRouter, createWebHistory } from 'vue-router';
import Account from "@/views/Account.vue";
import Annotations from '../views/Annotations.vue';
import Annotator from '../views/Annotator.vue';
import Criteria from '../views/Criteria.vue';
import Dashboard from '../views/Dashboard.vue';
import Dataset from '../views/Dataset.vue';
import Definitions from '../views/Definitions.vue';
import NotFound from "../views/404.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/account/:username',
      name: 'Account',
      component: Account,
    },
    {
      path: '/annotations',
      name: 'Annotations',
      component: Annotations,
    },
    {
      path: '/annotator',
      name: 'Annotator',
      component: Annotator,
    },
    {
      path: '/criteria',
      name: 'Criteria',
      component: Criteria,
    },
    {
      path: '/dataset/:datasetName',
      name: 'Dataset',
      component: Dataset,
    },
    {
      path: '/definitions',
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

router.beforeEach((to, _) => {
  if (to.name) {
    document.title = `DefNotator - ${to.name.toString()}`;
  } else {
    document.title = 'DefNotator';
  }
});

export default router
