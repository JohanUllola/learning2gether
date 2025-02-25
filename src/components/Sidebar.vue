<template>
	<aside v-if="userStore.isAuthenticated" class="sidebar" :class="{ 'is-expanded': is_expanded }">
	  <div class="header-section">
		<div class="logo">
		  <img :src="logoURL" alt="Logo" />
		</div>
  
		<div class="menu-toggle-wrap">
		  <button class="menu-toggle" @click="ToggleMenu">
			<span class="material-icons">
			  {{ is_expanded ? 'keyboard_double_arrow_left' : 'keyboard_double_arrow_right' }}
			</span>
		  </button>
		</div>
	  </div>
  
	  <div class="main-menu">
		<h3 v-show="is_expanded">Menú</h3>
		<div class="menu">
		  <router-link 
			v-for="item in mainMenu" 
			:key="item.path" 
			:to="item.path" 
			class="button"
			:class="{ active: $route.path === item.path }"
		  >
			<span class="material-icons">{{ item.icon }}</span>
			<span v-show="is_expanded" class="text">{{ item.text }}</span>
		  </router-link>
		</div>
	  </div>
  
	  <div class="flex"></div>
	  
	  <div class="footer-section">
		<div class="menu">
		  <router-link to="/config" class="button">
			<span class="material-icons">settings</span>
			<span v-show="is_expanded" class="text">Configuración</span>
		  </router-link>
		</div>
  
		<div class="menu">
		  <button class="button" @click="userStore.logoutUser">
			<span class="material-icons">logout</span>
			<span v-show="is_expanded" class="text">Cerrar sesión</span>
		  </button>
		</div>
	  </div>
	</aside>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import logoURL from '../assets/logo1-01.png'
  import { useUserStore } from '../stores/user'
  
  const userStore = useUserStore()
  const route = useRoute()
  const is_expanded = ref(localStorage.getItem("is_expanded") === "true")
  
  const mainMenu = [
	{ path: '/', icon: 'home', text: 'Inicio' },
	{ path: '/profile', icon: 'description', text: 'Perfil' },
	{ path: '/students', icon: 'school', text: 'Estudiantes' },
	{ path: '/messages', icon: 'email', text: 'Mensajes' },
	{ path: '/goal', icon: 'flag', text: 'Logros' },
	{ path: '/notify', icon: 'notifications', text: 'Notificaciones' }
  ]
  
  const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem("is_expanded", is_expanded.value)
  }
  </script>
  
  <style scoped lang="scss">
  .sidebar {
	background: #2c3e50;
	color: white;
	width: 60px;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	transition: 0.3s ease;
	z-index: 1000;
	display: flex;
	flex-direction: column;
	overflow: hidden;
  
	&.is-expanded {
	  width: 250px;
	}
  
	.header-section {
	  flex-shrink: 0;
	  padding: 1rem;
	  position: relative;
	  height: 80px;
  
	  .logo {
		img {
		  width: 100%;
		  max-width: 45px;
		  transition: 0.3s ease;
		}
	  }
  
	  .menu-toggle-wrap {
		position: absolute;
		top: 1rem;
		right: 1rem;
  
		.menu-toggle {
		  background: rgba(255, 255, 255, 0.1);
		  border: none;
		  color: white;
		  cursor: pointer;
		  padding: 0.5rem;
		  border-radius: 8px;
		  transition: 0.3s ease;
		  display: flex;
		  align-items: center;
  
		  &:hover {
			background: rgba(255, 255, 255, 0.2);
			transform: rotate(180deg);
		  }
  
		  .material-icons {
			font-size: 1.5rem;
		  }
		}
	  }
	}
  
	.main-menu {
	  
	  flex-wrap: wrap;
	  min-height: 0;
	  
	  padding: 0 0.5rem;
	  height: 100%;
  
	  &::-webkit-scrollbar {
		width: 6px;
		background-color: transparent;
	  }
  
	  &::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.2);
		border-radius: 3px;
	  }
  
	  &::-webkit-scrollbar-thumb:hover {
		background-color: rgba(255, 255, 255, 0.3);
	  }
  
	  h3 {
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.875rem;
		margin: 0 1rem 1rem;
		text-transform: uppercase;
	  }
  
	  .menu {
		margin-bottom: 1rem;
  
		.button {
		  display: flex;
		  align-items: center;
		  text-decoration: none;
		  color: white;
		  padding: 0.8rem;
		  border-radius: 8px;
		  transition: 0.3s ease;
		  margin-bottom: 0.25rem;
		  background: transparent;
		  position: relative;
  
		  &:hover {
			background: rgba(255, 255, 255, 0.05);
		  }
  
		  &.active {
			background: rgba(255, 255, 255, 0.1);
			
			&::after {
			  content: '';
			  position: absolute;
			  right: 0;
			  top: 50%;
			  transform: translateY(-50%);
			  height: 40%;
			  width: 3px;
			  background: #42b983;
			  border-radius: 2px;
			}
		  }
  
		  .material-icons {
			margin-right: 1rem;
			flex-shrink: 0;
			font-size: 1.2rem;
		  }
  
		  .text {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 0.9rem;
		  }
		}
	  }
	}
  
	.flex {
	  flex-grow: 1;
	  min-height: 2rem;
	}
  
	.footer-section {
	  flex-shrink: 0;
	  padding: 1rem 0.5rem;
	  border-top: 1px solid rgba(255, 255, 255, 0.1);
	  height: 80px;
  
	  .menu {
		margin-bottom: 0.5rem;
  
		.button {
		  width: 100%;
		  justify-content: flex-start;
		  padding: 0.8rem;
  
		  &:hover {
			background: rgba(255, 255, 255, 0.05);
		  }
  
		  &.logout-button:hover {
			background: rgba(255, 0, 0, 0.1);
		  }
  
		  .material-icons {
			color: rgba(255, 255, 255, 0.8);
		  }
		}
	  }
	}
  }
  </style>