<template>
  <div class="dashboard-container">
    <!-- Vista principal del dashboard -->
    <div v-if="!gameUnavailable">
      <div class="header">
        <div class="user-info">
          <h1>¡Bienvenido, {{ studentName }}! 🎉</h1>
          <p class="last-login">Último acceso: {{ formattedLastLogin }}</p>
        </div>
        <button @click="clearData" class="logout-button-students">
          Cerrar sesión
        </button>
      </div>

      <div class="games-grid">
        <div 
          v-for="game in games"
          :key="game.id"
          class="game-card"
          @click="checkGameAvailability(game)"
        >
          <img :src="game.image" :alt="game.name" class="game-image">
          <h3>{{ game.name }}</h3>
          <div v-if="!game.available" class="unavailable-overlay">
            <span>No disponible</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Vista de juego no disponible -->
    <GameUnavailable 
      v-else
      :gameName="selectedGameName"
      @retry="handleRetry"
      @return-to-dashboard="gameUnavailable = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import GameUnavailable from '../components/GameUnavailable.vue';

const router = useRouter();
const studentName = ref('');
const lastLogin = ref(null);
const gameUnavailable = ref(false);
const selectedGameName = ref('');

const importImage = (name) => 
  new URL(`../assets/${name}`, import.meta.url).href;

// Lista de juegos con estado de disponibilidad
const games = ref([
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
  },
]);

const formattedLastLogin = computed(() => {
  if (!lastLogin.value) return 'Primer ingreso';
  const date = new Date(lastLogin.value);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
});

const checkGameAvailability = (game) => {
  if (!game.available) {
    selectedGameName.value = game.name;
    gameUnavailable.value = true;
    return;
  }
  navigateToGame(game.route);
};

const handleRetry = () => {
  gameUnavailable.value = false;
  // Lógica adicional de reintento podría ir aquí
};

const loadStudentData = () => {
  const savedData = localStorage.getItem('studentData');
  if (!savedData) {
    router.push('/');
    return;
  }
  
  const data = JSON.parse(savedData);
  studentName.value = data.name;
  lastLogin.value = data.lastLogin || new Date().toISOString();
  
  localStorage.setItem('studentData', JSON.stringify({
    ...data,
    lastLogin: new Date().toISOString()
  }));
};

const clearData = () => {
  localStorage.removeItem('studentData');
  router.push('/');
};

const navigateToGame = (route) => {
  router.push(route);
};

onMounted(() => {
  loadStudentData();
});
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 2rem;
  min-height: 100vh;
  position: relative;
  max-width: 1200px;
  //margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  .user-info {
    h1 {
      color: #1a365d;
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    .last-login {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
  }
}

.logout-button-students {
  background: #e53e3e;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    background: #c53030;
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  }
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.game-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }

  .unavailable-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
    cursor: not-allowed;
  }
}

.game-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 2px solid #e0e0e0;
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .games-grid {
    grid-template-columns: 1fr;
  }
  
  .game-card {
    .unavailable-overlay {
      font-size: 1rem;
    }
  }
}
</style>