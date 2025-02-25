<template>
    <div class="iframe-container">
      <iframe :src="gameUrl" frameborder="0" allowfullscreen></iframe>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const gameId = route.params.gameId;
  
  // Mapea los gameId a la URL correspondiente. Puedes obtener estas URLs de una API o definirlas manualmente.
  const gameUrls = {
    1: 'https://example.com/game1',
    2: 'https://www.cokitos.com/3-en-raya-de-tablas-de-multiplicar/play/',
    3: 'https://example.com/game3',
    4: 'https://example.com/game4',
    5: 'https://example.com/game5',
    6: 'https://example.com/game6'
  };
  
  // Selecciona la URL según el gameId recibido
  const gameUrl = gameUrls[gameId] || 'https://www.cokitos.com/3-en-raya-de-tablas-de-multiplicar/play/';
  </script>
  
  <style scoped>
  .iframe-container {
    width: 100%;
    height: 100vh; /* Puedes ajustar la altura según tus necesidades */
    overflow: hidden;
  }
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  </style>
  