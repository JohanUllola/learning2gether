// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/user';

// Importar componentes
import Home from '../views/Home-Views.vue';
import ConfigViews from '../views/Config-Views.vue';
import Login from '../views/Login-Views.vue';
import ProfileSelection from '../components/ProfileSelection.vue';
import RegisterViews from '../views/Register-Views.vue';
import ProfileViews from '../views/Profile-Views.vue';
import TeacherViews from '../views/Teacher-Views.vue';
import NotificationSystem from '../components/NotificationSystem.vue';
import AchievementSystem from '../components/AchievementSystem.vue';
import MessageView from '../views/MessageView.vue';
import Students from '../components/Students.vue';
import WordGame from '../components/Games/WordGame.vue';
import Game from '../views/GamesViews/GameIframeViews.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterViews,
    meta: { guestOnly: true }
  },
  {
    path: '/profile-selection',
    name: 'ProfileSelection',
    component: ProfileSelection,
    meta: { requiresAuth: true }
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: TeacherViews,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileViews,
    meta: { requiresAuth: true }
  },
  {
    path: '/students',
    name: 'Students',
    component: Students,
    meta: { requiresAuth: true }
  },
  {
    path: '/messages',
    name: 'Messages',
    component: MessageView,
    meta: { requiresAuth: true }
  },
  {
    path: '/notify',
    name: 'Notify',
    component: NotificationSystem,
    meta: { requiresAuth: true }
  },
  {
    path: '/goal',
    name: 'Goal',
    component: AchievementSystem,
    meta: { requiresAuth: true }
  },
  {
    path: '/config',
    name: 'Config',
    component: ConfigViews,
    meta: { requiresAuth: true }
  },
  {
    path: '/wordgame',
    name: 'WordGame',
    component: WordGame,
    meta: { requiresAuth: true }
  },
  // {
  //   path: '/gamerow',
  //   name: 'GameRow',
  //   component: GameRow,
  //   meta: { requiresAuth: true }
  // },
  
  // Ruta para manejar errores 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const isAuthRequired = to.meta.requiresAuth;
  const isGuestOnly = to.meta.guestOnly;

  try {
    userStore.loadingSession = true;
    const user = await userStore.currentUser();

    // Redirigir usuarios autenticados que intentan acceder a rutas para invitados
    if (isGuestOnly && user) {
      next('/');
      return;
    }

    // Redirigir usuarios no autenticados que intentan acceder a rutas protegidas
    if (isAuthRequired && !user) {
      next('/login');
      return;
    }

    next();
  } catch (error) {
    console.error('Error de navegación:', error);
    next('/login');
  } finally {
    userStore.loadingSession = false;
  }
});

export default router;