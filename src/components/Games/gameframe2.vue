<template>
  <div class="main-container">
    <div class="game-container">
      <iframe 
        id="game-element" 
        class="game-iframe"
        allowfullscreen="true" 
        :sandbox="sandboxPermissions"
        :src="gameUrl"
        @load="onIframeLoad"
        title="Game"
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
const sandboxPermissions = ref("allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-downloads");
const gameUrl = ref("https://games.poki.com/458768/1f3ae540-a95f-4f20-a000-29512612e341?tag=pg-246f379031a6890f3d52fd9b469399db715944ce&site_id=52&iso_lang=es&country=DO&poki_url=https://poki.com/es/g/brain-test-3-tricky-quests&hoist=yes&nonPersonalized=n&cloudsavegames=n&familyFriendly=n&categories=4,7,16,37,67,72,96,400,832,843,929,1137,1140,1141,1150,1166");
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.game-container {
  width: 100%;
  height: 80vh; /* Altura ajustada */
  position: relative;
  overflow: hidden;
}

.game-iframe {
  width: 100%;
  height: 100%;
  border: none;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.grid-container {
  width: 100vw;
  margin-left: -50vw;
  left: 50%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 2rem;
  background: #f5f5f5;
}

.grid-item {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-content {
  text-align: center;
  font-size: 1.2rem;
  color: #333;
}

@media (max-width: 768px) {
  .game-container {
    height: 60vh;
  }
  
  .grid-container {
    padding: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>