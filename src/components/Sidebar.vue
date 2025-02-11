<template>
	<aside :class="`${is_expanded ? 'is-expanded' : ''}`">
		<div class="logo">
			<img :src="logoURL" alt="Vue" /> 
		</div>

		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="ToggleMenu">
				<span class="material-icons">keyboard_double_arrow_right</span>
			</button>
		</div>

		<h3>Menu</h3>
		<div class="menu">
			<router-link to="/" class="button">
				<span class="material-icons">home</span>
				<span class="text">Inicio</span>
			</router-link>
			<router-link to="/profile" class="button">
				<span class="material-icons">description</span>
				<span class="text">Perfil</span>
			</router-link>
			<router-link to="/Friends" class="button">
				<span class="material-icons">group</span>
				<span class="text">Amigos</span>
			</router-link>
			<router-link to="/contact" class="button">
				<span class="material-icons">email</span>
				<span class="text">Mensajes</span>
			</router-link>

			<router-link to="/goal" class="button">
				<span class="material-icons">email</span>
				<span class="text">Logros</span>
			</router-link>

			<router-link to="/notify" class="button">
				<span class="material-icons">email</span>
				<span class="text">Notificaciones</span>
			</router-link>

		</div>

		<div class="flex"></div>
		
		<div class="menu">
			<router-link to="/config" class="button">
				<span class="material-icons">settings</span>
				<span class="text">Configuracion</span>
			</router-link>
		</div>
	</aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import logoURL from '../assets/logo1-01.png'

const route = useRoute()
const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const mainMenu = [
	{ path: '/', icon: 'home', text: 'Inicio' },
	{ path: '/about', icon: 'description', text: 'Perfil' },
	{ path: '/team', icon: 'group', text: 'Amigos' },
	{ path: '/contact', icon: 'email', text: 'Mensajes' }
]

const isActive = (path) => route.path === path

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem("is_expanded", is_expanded.value)
}
</script>

