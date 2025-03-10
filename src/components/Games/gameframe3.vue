<template>
  <div class="main-container">
    <div class="game-container">
      <iframe 
        id="game-element"
        class="game-iframe"
        :src="gameUrl"
        allowfullscreen
        :allow="permissions"
        name="gameFrame"
        scrolling="no"
        :sandbox="sandboxPermissions"
        title="Game"
        @load="onIframeLoad"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const onIframeLoad = () => {
  console.log("Iframe cargado");
};

// Configuración del juego
const gameUrl = ref("https://games.poki.com/458768/5dd2dbe9-015f-11ea-ad56-9cb6d0d995f7?tag=pg-246f379031a6890f3d52fd9b469399db715944ce&site_id=52&iso_lang=es&country=DO&poki_url=https://poki.com/es/g/little-alchemy-2&hoist=yes&nonPersonalized=n&cloudsavegames=n&familyFriendly=n&categories=6,7,72,400,823,832,929,1013,1103,1140,1155&special_condition=landing");

const permissions = ref("autoplay; fullscreen; camera; focus-without-user-activation *; monetization; gamepad; keyboard-map *; xr-spatial-tracking; clipboard-write; web-share; accelerometer; magnetometer; gyroscope; display-capture");

const sandboxPermissions = ref("allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-downloads");
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.game-container {
  width: 100%;
  height: 70vh;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.game-iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  aspect-ratio: 16/9;
}



@media (max-width: 768px) {
  .game-container {
    height: 50vh;
    padding: 0 1rem;
  }
  
  .grid-container {
    padding: 1rem;
    grid-template-columns: 1fr;
  }
  
  .grid-item {
    min-height: 120px;
  }
}
</style>