<template>
    <div class="game-container">
      <iframe
        src="https://www.cokitos.com/3-en-raya-de-tablas-de-multiplicar/play/"
        title="Juego de Multiplicar"
        class="game-iframe"
        sandbox="allow-scripts allow-same-origin"
        @load="onIframeLoad"
      ></iframe>
    </div>
  </template>
  
  <script setup>
  const onIframeLoad = () => {
    console.log("Iframe cargado");
  };
  </script>
  
  <style scoped>
  .game-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .game-iframe {
    width: 100%;
    height: 600px;
    border: none;
  }
  </style>