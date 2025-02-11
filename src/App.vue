<template>
 <router-view/>
 <div class="app">
    <!-- Sidebar: tu componente de navegación -->
    <Sidebar class="sidebar" />
    <!-- Contenedor de contenido: aquí se mostrará GameGrid -->
    <div class="content">
      
    </div>
  </div>
</template>



  
  <script setup>
  import Login from './components/Login.vue';
import sidebar from './components/sidebar.vue';


  
  </script>
  
  <style lang="scss">
  @import './styles/main.scss';
  </style>
  