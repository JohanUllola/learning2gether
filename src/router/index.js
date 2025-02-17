import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Home from '../views/Home-Views.vue';
import Contact from '../views/Contact-Views.vue';
import ConfigViews from '../views/Config-Views.vue';
import Profile from '../components/Profile.vue';
import Friends from '../components/Friends.vue';
import Login from '../views/Login-Views.vue';
import ProfileSelection from '../components/ProfileSelection.vue';
import RegisterViews from '../views/Register-Views.vue';
import{useUserStore} from '../stores/user';

const requireAuth= async (to, from ,next)=>{
const userStore= useUserStore();
 const user = userStore.currentUser();
 if(user){
  next();
 }else{
  next('login')
 }
}
const routes = [
    {
    path: '/login',
    
    component: Login

  },{
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
    path: '/',
    
    component: Home, beforeEnter: requireAuth
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
