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

<style scoped="lang">
	body {
    background: #f1f5f9;
    font-family: 'Fira Sans', sans-serif;
  }
  .app {
	display: flex;
	min-height: 100vh;
  }
  .content {
	flex-grow: 1;
  padding: 20px;
  background: #f4f4f4;
  }

  
  :root {
	--dark: #1e1e2f;          /* Ejemplo: color de fondo del sidebar */
	--dark-alt: #2a2a3d;      /* Color alternativo para hover */
	--light: #f5f5f5;         /* Color de texto claro */
	--primary: #4f46e5;       /* Color principal para resaltar */
	--grey: #9ca3af;          /* Color gris para textos secundarios */
	--sidebar-width: 260px;   /* Ancho cuando está expandido */
  }
  
  

aside {
	display: flex;
	flex-direction: column;
	background-color: var(--dark);
	color: var(--light);
	width: calc(2rem + 32px);
	overflow: hidden;
	min-height: 100vh;
	padding: 1rem;
	transition: 0.2s ease-in-out;
  }
  
  aside .flex {
	flex: 1 1 0%;
  }
  
  aside .logo {
	margin-bottom: 1rem;
  }
  
  aside .logo img {
	width: 2rem;
  }
  
  .menu-toggle-wrap {
	display: flex;
	justify-content: flex-end;
	margin-bottom: 1rem;
	position: relative;
	top: 0;
	transition: 0.2s ease-in-out;
  }
  
  /* Estilos para el botón de toggle */
  .menu-toggle-wrap .menu-toggle {
	background: transparent;  /* Quita el fondo blanco por defecto */
	border: none;             /* Quita bordes por defecto */
	padding: 0.5rem;
	cursor: pointer;
	transition: 0.2s ease-in-out;
  }
  
  /* Estilos para el icono dentro del botón */
  .menu-toggle-wrap .menu-toggle .material-icons {
	font-size: 2rem;
	color: var(--light);
	transition: 0.2s ease-out;
  }
  
  /* Al pasar el mouse, cambia el color y mueve el icono */
  .menu-toggle-wrap .menu-toggle:hover .material-icons {
	color: var(--primary);
	transform: translateX(0.5rem);
  }
  
  
  aside h3,
  aside .button .text {
	opacity: 0;
	transition: opacity 0.3s ease-in-out;
  }
  
  aside h3 {
	color: var(--grey);
	font-size: 0.875rem;
	margin-bottom: 0.5rem;
	text-transform: uppercase;
  }
  
  aside .menu {
	margin: 0 -1rem;
  }
  
  aside .menu .button {
	display: flex;
	align-items: center;
	text-decoration: none;
	transition: 0.2s ease-in-out;
	padding: 0.5rem 1rem;
  }
  
  aside .menu .button .material-icons {
	font-size: 2rem;
	color: var(--light);
	transition: 0.2s ease-in-out;
  }
  
  aside .menu .button .text {
	color: var(--light);
	transition: 0.2s ease-in-out;
  }
  
  aside .menu .button:hover {
	background-color: var(--dark-alt);
  }
  
  aside .menu .button:hover .material-icons,
  aside .menu .button:hover .text {
	color: var(--primary);
  }
  
  aside .menu .button.router-link-exact-active {
	background-color: var(--dark-alt);
	border-right: 5px solid var(--primary);
  }
  
  aside .menu .button.router-link-exact-active .material-icons,
  aside .menu .button.router-link-exact-active .text {
	color: var(--primary);
  }
  
  aside .footer {
	opacity: 0;
	transition: opacity 0.3s ease-in-out;
  }
  
  aside .footer p {
	font-size: 0.875rem;
	color: var(--grey);
  }
  
  aside.is-expanded {
	width: var(--sidebar-width);
  }
  
  aside.is-expanded .menu-toggle-wrap {
	top: -3rem;
  }
  
  aside.is-expanded .menu-toggle-wrap .menu-toggle {
	transform: rotate(-180deg);
  }
  
  aside.is-expanded h3,
  aside.is-expanded .button .text {
	opacity: 1;
  }
  
  aside.is-expanded .button .material-icons {
	margin-right: 1rem;
  }
  
  aside.is-expanded .footer {
	opacity: 0;
  }
  
  @media (max-width: 1024px) {
	aside {
	  position: absolute;
	  z-index: 99;
	}
  }
  
</style>

