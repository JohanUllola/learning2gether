<template>
  <div  class="app">
    <!-- Sidebar: Componente de navegación -->
    <Sidebar />

    <!-- Contenedor de contenido donde se mostrará GameGrid -->
    <div  class="content">
     
      <!-- Contenido principal -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import { useConfigStore } from './stores/configStore';
const configStore = useConfigStore();
// Importa los estilos principales


// Obtén una instancia del store
//const configStore = useConfigStore();
</script>

<style lang="scss">
/* Variables para modo claro */
$background-light: #ffffff;
$card-background-light: #f8f9fa;
$text-color-light: #212529;

/* Variables para modo oscuro */
$background-dark: #1e1e1e;
$card-background-dark: #2d2d2d;
$text-color-dark: #f0f0f0;

/* Estilos generales */
body {
  background-color: $background-light;
  color: $text-color-light;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Contenedor principal */
.content {
  background: $background-light;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Tarjetas */
.card {
  background-color: $card-background-light;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
}

/* Botón */
button {
  background: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #218838;
}

/* Modo oscuro */
.dark-mode {
  body {
    background-color: $background-dark;
    color: $text-color-dark;
  }

  .content {
    background: $card-background-dark;
  }

  .card {
    background-color: darken($card-background-dark, 5%);
    border: 1px solid lighten($card-background-dark, 10%);
  }

  button {
    background: #20c997;
  }

  button:hover {
    background: #17a589;
  }
}

</style>
