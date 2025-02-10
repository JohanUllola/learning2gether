<template>
  <div class="app">
    <!-- Sidebar: tu componente de navegación -->
     <sidebar/>
    <Sidebar class="sidebar" />
    <!-- Contenedor de contenido: aquí se mostrará GameGrid -->
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>




  
  <script setup>
  import sidebar from './components/sidebar.vue';
  import Home from './views/Home-Views.vue';

  
  </script>
  
  <style lang="scss">
  @import './styles/main.scss';
  </style>
  