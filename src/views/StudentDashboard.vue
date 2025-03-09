<template>
  <div class="dashboard-container">
    <div class="header">
      <h1>¡Bienvenido, {{ studentName }}! 🎉</h1>
      <button @click="clearData" class="logout-button">
        Cerrar sesión
      </button>
    </div>

    <div class="games-grid">
      <div 
        v-for="game in games"
        :key="game.id"
        class="game-card"
        @click="navigateToGame(game.route)"
      >
        <img :src="game.image" :alt="game.name" class="game-image">
        <h3>{{ game.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const studentName = ref('');

const games = ref([
  { id: 1, name: "Memoria Numérica", image: "/game1.png", route: "/memory-game" },
  { id: 2, name: "Línea Única", image: "/game2.png", route: "/line-game" },
  { id: 3, name: "Fracciones", image: "/game3.png", route: "/fractions" },
  { id: 4, name: "Pop", image: "/game4.png", route: "/pop-game" },
]);

const loadStudentData = () => {
  const savedData = localStorage.getItem('studentData');
  if (!savedData) {
    router.push('/');
    return;
  }
  
  const data = JSON.parse(savedData);
  studentName.value = data.name;
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
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    color: #1a365d;
    font-size: 2rem;
  }
}

.logout-button {
  background: #e53e3e;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c53030;
    transform: translateY(-2px);
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
  }
}

.game-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .games-grid {
    grid-template-columns: 1fr;
  }
}
</style>