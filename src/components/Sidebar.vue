<template>
	<aside v-if="!userStore.userData" :class="{ 'is-expanded': is_expanded }">
		<div class="logo">
			<img :src="logoURL" alt="Vue" /> 
		</div>

		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="ToggleMenu">
				<span class="material-icons">keyboard_double_arrow_right</span>
			</button>
		</div>

		<h3>Menú</h3>
		<div class="menu">
			<router-link 
				v-for="item in mainMenu" 
				:key="item.path" 
				:to="item.path" 
				class="button"
				:class="{ active: isActive(item.path) }"
			>
				<span class="material-icons">{{ item.icon }}</span>
				<span class="text">{{ item.text }}</span>
			</router-link>
		</div>

		<div class="flex"></div>
		
		<div class="menu">
			<router-link to="/config" class="button">
				<span class="material-icons">settings</span>
				<span class="text">Configuración</span>
			</router-link>
		</div>

		<div class="menu">
	<button class="button logout-button" @click="userStore.logoutUser">
		<span class="material-icons">logout</span>
		<span class="text">Cerrar sesión</span>
	</button>
</div>

	</aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import logoURL from '../assets/logo1-01.png'
import {useUserStore} from'../stores/user';
import {onAuthStateChanged}from 'firebase/auth';
import { auth } from '../firebaseConfig';

onAuthStateChanged(auth,(user)=>{
	console.log(user);
})

const userStore = useUserStore();



const route = useRoute()
const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const mainMenu = [
	{ path: '/', icon: 'home', text: 'Inicio' },
	{ path: '/profile', icon: 'description', text: 'Perfil' },
	{ path: '/friends', icon: 'group', text: 'Amigos' },
	{ path: '/contact', icon: 'email', text: 'Mensajes' },
	{ path: '/goal', icon: 'flag', text: 'Logros' },
	{ path: '/notify', icon: 'notifications', text: 'Notificaciones' }
]

const isActive = (path) => route.path === path

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem("is_expanded", is_expanded.value)
}

const logout=()=>{

}
</script>


