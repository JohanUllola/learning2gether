<template>
 
 <div class="app">
  
     <!-- Sidebar: tu componente de navegación  -->
    <Sidebar class="sidebar" />
 <sidebar/>
    
     <!-- Contenedor de contenido: aquí se mostrará GameGrid  -->
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>



  
  <script setup>
  import Login from './views/Login-Views.vue';
//import sidebar from './components/sidebar.vue';



  
  </script>
  
  <style lang="scss">
  @import './styles/main.scss';
  </style>
  