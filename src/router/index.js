// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home-Views.vue';
import ConfigViews from '../views/Config-Views.vue';
import Login from '../views/Login-Views.vue';
import ProfileSelection from '../components/ProfileSelection.vue';
import RegisterViews from '../views/Register-Views.vue';
import { useUserStore } from '../stores/user';
import ProfileViews from '../views/Profile-Views.vue';
import TeacherViews from '../views/Teacher-Views.vue';
import NotificationSystem from '../components/NotificationSystem.vue';
import AchievementSystem from '../components/AchievementSystem.vue';
import MessageView from '../views/MessageView.vue';
import students from '../components/Students.vue';


const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSesion = true;
  const user = userStore.currentUser();
  if (user) {
    next();
  } else {
    next('/login');
  }
  userStore.loadingSesion = false;
};

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterViews
  },
  {
    path: '/profile-Selection',
    name: 'profile-Selection',
    component: ProfileSelection
  },
  {
    path: '/teacher',
    name: 'teacher-views',
    component: TeacherViews
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileViews
  },
  {
    path: '/students',
    name: 'students',
    component: students
  },
  {
    path: '/message',
    name: 'Mensajes',
    component: MessageView
  },
  
  {
    path: '/notify',
    name: 'Notifiy',
    component: NotificationSystem
  },
  {
    path: '/goal',
    name: 'goal',
    component: AchievementSystem
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
