<template>
  <div :class="['game-grid', { 'dark-mode': configStore.isDarkMode }]">
    <div v-for="game in games" :key="game.id" class="game-card">
      <img :src="game.image" :alt="game.name" />
    </div>
  </div>
</template>

<script setup>
import { useConfigStore } from '../stores/configStore';
import { useUserStore } from '../stores/user';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const configStore = useConfigStore();
onAuthStateChanged(auth, (user) => {
  console.log(user);
});

const userStore = useUserStore();

const importImage = (name) => new URL(`../assets/${name}`, import.meta.url).href;
const games = [
  { id: 1, name: "ABC", image: importImage('abc.png') },
  { id: 2, name: "pulze", image: importImage('puzle.png') },
  { id: 3, name: "square", image: importImage('square.png') },
  { id: 4, name: "square", image: importImage('pop.png') },
  { id: 5, name: "square", image: importImage('123456.png') },
  { id: 6, name: "tictactoe", image: importImage('ballon.png') },
];
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

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }

  &.dark-mode {
    background: #34495e;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>