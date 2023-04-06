import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
});

router.beforeEach((to, from) => {
  if (to.name) {
    document.title = 'DefNotator - ' + to.name.toString();
  } else {
    document.title = 'DefNotator';
  }
});

export default router
