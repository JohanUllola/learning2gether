<template>
    <div class="game-container">
      <iframe id="playframe" width="1000" height="600" frameborder="0" scrolling="no" allowfullscreen="true" src="https://www.digipuzzle.net/minigames/makeanynumber/makeanynumber.htm?language=spanish"></iframe>
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