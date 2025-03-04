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
  
	  <!-- Contenedor unificado para todos los elementos del menú -->
	  <div class="menu-container">
		<router-link 
			v-for="item in allMenuItems" 
			:key="item.path" 
			:to="item.path" 
			class="button"
			:class="{ active: $route.path === item.path }"
		>
			<span class="material-icons">{{ item.icon }}</span>
			<span v-show="is_expanded" class="text">{{ item.text }}</span>
		</router-link>
  
		<!-- Botón de logout -->
		<button class="button" @click="userStore.logoutUser">
			<span class="material-icons">logout</span>
			<span v-show="is_expanded" class="text">Cerrar sesión</span>
		</button>
	  </div>
	</aside>
</template>
  
<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import logoURL from '../assets/logo1-01.png'
import { useUserStore } from '../stores/user'
  
const userStore = useUserStore()
const route = useRoute()
const is_expanded = ref(localStorage.getItem('is_expanded') === 'true')
  
// Unificamos todos los elementos del menú en una sola lista
const allMenuItems = [
	{ path: '/', icon: 'home', text: 'Inicio' },
	{ path: '/profile', icon: 'description', text: 'Perfil' },
	{ path: '/students', icon: 'school', text: 'Estudiantes' },
	{ path: '/messages', icon: 'email', text: 'Mensajes' },
	{ path: '/goal', icon: 'flag', text: 'Logros' },
	{ path: '/notify', icon: 'notifications', text: 'Notificaciones' },
	{ path: '/config', icon: 'settings', text: 'Configuración' }
]
  
const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem('is_expanded', is_expanded.value)
}
  
// Al montar el componente, establecemos la variable CSS según el estado inicial
onMounted(() => {
  document.documentElement.style.setProperty('--sidebar-width', is_expanded.value ? '200px' : '50px')
})
  
// Actualizamos la variable CSS cada vez que is_expanded cambie
watch(is_expanded, (newVal) => {
  document.documentElement.style.setProperty('--sidebar-width', newVal ? '200px' : '50px')
})
</script>
  
<style scoped lang="scss">
.sidebar {
	background: #2c3e50;
	color: white;
	width: 50px;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	transition: 0.3s ease;
	z-index: 1000;
	overflow: hidden;
	font-family: 'Roboto', sans-serif;

	&.is-expanded {
	  width: 200px;
	}

	.header-section {
	  flex-shrink: 0;
	  padding: 0.8rem;
	  position: relative;
	  height: 70px;
  
	  .logo {
		img {
		  width: 100%;
		  max-width: 40px;
		  transition: 0.3s ease;
		}
	  }
  
	  .menu-toggle-wrap {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
  
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

	.menu-container {
	  flex: 1;
	  display: flex;
	  flex-direction: column;
	  gap: 0.5rem;
	  padding: 0 0.5rem;
	  margin-top: 0.8rem;
	}
  
	.button {
	  display: flex;
	  align-items: center;
	  justify-content: flex-start;
	  font-size: 1.2rem;
	  padding: 0.8rem;
	  border-radius: 8px;
	  text-decoration: none;
	  color: white;
	  background: transparent;
	  transition: background 0.3s ease;
	  position: relative;
	  
	  &:hover {
		background: rgba(255, 255, 255, 0.1);
	  }
  
	  &.active {
		background: rgba(255, 255, 255, 0.2);
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
  
	  .material-icons,
	  .text {
		font-size: inherit;
	  }
  
	  .material-icons {
		margin-right: 0.5rem;
	  }
	}
}
</style>
