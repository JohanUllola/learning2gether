<template>
  <div class="main-container">
    <div class="game-container">
      <iframe
        id="game-element"
        class="game-iframe"
        allowfullscreen="true"
        :allow="permissions"
        name="gameFrame"
        scrolling="no"
        :sandbox="sandboxPermissions"
        :src="gameUrl"
        title="Game"
        @load="onIframeLoad"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const onIframeLoad = () => {
  console.log("Iframe cargado")
}

// URL del juego y permisos (ajústalos según sea necesario)
const gameUrl = ref("https://games.poki.com/458768/5947565b-1eae-4602-9e05-690e54616659?tag=pg-246f379031a6890f3d52fd9b469399db715944ce&site_id=52&iso_lang=es&country=DO&poki_url=https://poki.com/es/g/arithmetica&hoist=yes&nonPersonalized=n&cloudsavegames=n&familyFriendly=n&categories=7,9,35,72,832,933,1141")

const permissions = ref("autoplay; fullscreen; camera; focus-without-user-activation *; monetization; gamepad; keyboard-map *; xr-spatial-tracking; clipboard-write; web-share; accelerometer; magnetometer; gyroscope; display-capture")
const sandboxPermissions = ref("allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-downloads")
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f4f4f4; /* Fondo claro para destacar el área del juego */
  padding: 1rem;
}

.game-container {
  width: 100%;
  height: 70vh;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff; /* Fondo blanco para el área del juego */
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

/* Clase aplicada al iframe */
.game-iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
  animation: fadeIn 0.8s ease-out;
  aspect-ratio: 16/9;
}

/* Animación de aparición */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Efecto hover sutil en el contenedor para resaltar */
.game-container:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .game-container {
    height: 50vh;
    padding: 0 1rem;
  }
}
</style>
