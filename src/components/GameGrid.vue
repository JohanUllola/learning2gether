<template>
  <div>
    <div class="search-container">
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar juegos..."
        />
        <button class="search-button" aria-label="Ejecutar búsqueda">
          <svg class="search-icon" viewBox="0 0 24 24">
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div v-if="!gameUnavailable" :class="['game-grid', { 'dark-mode': configStore.isDarkMode }]">
      <div 
        v-for="game in filteredGames" 
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
import { ref, computed } from 'vue';
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
const searchQuery = ref('');

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
    route: '/GameMemory', 
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

const filteredGames = computed(() => {
  if (!searchQuery.value) return games;
  return games.filter(game => 
    game.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style lang="scss" scoped>
.search-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  &.dark-mode {
    background-color: #2c3e50;
    color: #ecf0f1;
  }
}

.search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 2.5rem;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease, border 0.3s ease;
  border: 1px solid #e0e0e0;

  &:focus-within {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: #2196f3;
  }

  input {
    flex: 1;
    border: none;
    background: none;
    padding: 0.75rem;
    font-size: 1rem;
    color: #333333;
    transition: color 0.3s ease;

    &::placeholder {
      color: #999999;
    }
  }

  .search-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-icon {
    width: 24px;
    height: 24px;
    fill: #999999;
  }
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
  margin-left: var(--sidebar-width, 60px);
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
    max-width: 150px; /* Añadido para limitar el tamaño máximo */
    max-height: 150px; /* Añadido para limitar el tamaño máximo */
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