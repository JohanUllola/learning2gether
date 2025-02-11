import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home-Views.vue';
import Contact from '../views/Contact-Views.vue';
import ConfigViews from '../views/Config-Views.vue';
import Profile from '../components/Profile.vue';
import Friends from '../components/Friends.vue';
import Login from '../components/Login.vue';
import ProfileSelection from '../components/ProfileSelection.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login

  }, {

    path: '/profile-Selection',
    name: 'profile-Selection',
    component: ProfileSelection
  },
  {
    path: '/Home',
    name: 'home',
    component: Home
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/Friends',
    name: 'Friends',
    component: Friends
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
