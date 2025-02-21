<template>
  <div  class="app">
    <!-- Sidebar: Componente de navegación -->
    <sidebar />

    <!-- Contenedor de contenido donde se mostrará GameGrid -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'; 

import { useUserStore } from './stores/user.js';



const userStore = useUserStore();



</script>

<style lang="scss">
@import './styles/main.scss';
</style>
