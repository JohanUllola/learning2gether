<template>
    <div class="game-container">
        <iframe 
  src= "https://www.cokitos.com/banderas-de-fracciones/play/"
  width="100%" 
  height="600" 
  frameborder="0" 
  allowfullscreen>
</iframe>

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