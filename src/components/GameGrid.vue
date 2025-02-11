<template>
  <div class="game-grid">
    <div v-for="game in games" :key="game.id" class="game-card">
      <img :src="game.image" :alt="game.name" />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './sidebar.vue';

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
}

.game-card {
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  aspect-ratio: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>