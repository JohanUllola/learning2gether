<template>
  <div :class="['game-grid', { 'dark-mode': configStore.isDarkMode }]">
    <div v-for="game in games" :key="game.id" class="game-card">
      <img 
        :src="game.image" 
        :alt="game.name" 
        @click="openGame(game)" 
        style="cursor: pointer;"
      />
      <p class="game-name">{{ game.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useConfigStore } from '../stores/configStore';
import { useUserStore } from '../stores/user';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const configStore = useConfigStore();
onAuthStateChanged(auth, (user) => {
  console.log(user);
});

const userStore = useUserStore();
const router = useRouter();

const importImage = (name) =>
  new URL(`../assets/${name}`, import.meta.url).href;

const games = [
  { id: 1, name: "Game Numbers", image: importImage('cartasgame.jpg'), route: '/GameMomory' },
  { id: 2, name: "One Line", image: importImage('juegohabilidad.jpg'), route: '/GameOneline' },
  { id: 3, name: "Game Fracciones", image: importImage('gamefracciones.jpg'), route: '/Gamefracciones' },
  { id: 4, name: "Pop", image: importImage('pop.png'), route: '/rutaPop' },
  { id: 5, name: "123456", image: importImage('123456.png'), route: '/ruta123456' },
  { id: 6, name: "TicTacToe", image: importImage('ballon.png'), route: '/rutaTicTacToe' },
];

const openGame = (game) => {
  // Resuelve la URL a partir de la propiedad 'route' de cada juego
  const url = router.resolve({ path: game.route }).href;
  window.open(url, '_blank'); // Abre la ruta en una nueva pestaña
};
</script>

<style lang="scss" scoped>
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
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

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }

  &.dark-mode {
    background: #34495e;
  }

  img {
    width: 100%;
    height: 80%;
    object-fit: cover;
    display: block;
  }
}

.game-name {
  margin: 10px 0;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  color: inherit;
}
</style>
