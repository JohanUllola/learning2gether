<template>
  <div class="app">
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



</script>

<style lang="scss">
@import './styles/main.scss';
</style>
