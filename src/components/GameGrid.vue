<template>
  <div>
    <div v-if="!gameUnavailable" :class="['game-grid', { 'dark-mode': configStore.isDarkMode }]">
      <div 
        v-for="game in games" 
        :key="game.id" 
        class="game-card"
        :class="{ disabled: !game.available }"
        @click="handleGameClick(game)"
      >
        <img 
          :src="game.image" 
          :alt="game.name" 
        />
        <p class="game-name">{{ game.name }}</p>
        <div v-if="!game.available" class="overlay">
          <span>No disponible</span>
        </div>
      </div>
    </div>

    <!-- Vista de juego no disponible -->
    <GameUnavailable v-else @retry="handleRetry" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useConfigStore } from '../stores/configStore';
import { useUserStore } from '../stores/user';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import GameUnavailable from './GameUnavailable.vue';

const configStore = useConfigStore();
const userStore = useUserStore();
const router = useRouter();
const gameUnavailable = ref(false);

onAuthStateChanged(auth, (user) => {
  console.log(user);
});

const importImage = (name) =>
  new URL(`../assets/${name}`, import.meta.url).href;

const games = [
  { 
    id: 1, 
    name: "Game Numbers", 
    image: importImage('cartasgame.jpg'), 
    route: '/GameMomory', 
    available: true 
  },
  { 
    id: 2, 
    name: "Brain Test", 
    image: importImage('braintest.png'), 
    route: '/Gamebraintest', 
    available: true 
  },
  { 
    id: 3, 
    name: "LittleAlchemy2", 
    image: importImage('LittleAlchemy2.png'), 
    route: '/GameLittleAlchemy2', 
    available: true 
  },
  { 
    id: 4, 
    name: "Arithmetic", 
    image: importImage('Arithmetic.png'), 
    route: '/GameArithmetic', 
    available: true 
  },
  { 
    id: 5, 
    name: "123456", 
    image: importImage('123456.png'), 
    route: '/ruta123456', 
    available: false 
  },
  { 
    id: 6, 
    name: "TicTacToe", 
    image: importImage('ballon.png'), 
    route: '/rutaTicTacToe', 
    available: false 
  }
];

const openGame = (game) => {
  const url = router.resolve({ path: game.route }).href;
  window.open(url, '_blank');
};

const handleGameClick = (game) => {
  if (game.available) {
    openGame(game);
  } else {
    gameUnavailable.value = true;
  }
};

const handleRetry = () => {
  gameUnavailable.value = false;
  // Lógica adicional de reintento podría ir aquí
};
</script>

<style lang="scss" scoped>
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
  margin-left: 60px;
  transition: background-color 0.3s ease, color 0.3s ease;
  
  &.dark-mode {
    background-color: #2c3e50;
    color: #ecf0f1;
  }
}

.game-card {
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  aspect-ratio: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
  
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    img {
      cursor: inherit;
    }
  }
  
  img {
    width: 100%;
    height: 80%;
    object-fit: cover;
    display: block;
    cursor: pointer;
  }
}

.game-name {
  margin: 10px 0;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  color: inherit;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 15px;
}
</style>