import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home-Views.vue';
import About from '../views/About-Views.vue';
import Team from '../views/Team-Views.vue';
import Contact from '../views/Contact-Views.vue';
import ConfigViews from '../views/Config-Views.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/team',
    name: 'team',
    component: Team
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/config',
    name: 'config',
    component: ConfigViews
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
