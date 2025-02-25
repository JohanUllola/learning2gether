<template>
    <div>
      <h1>Juego de Multiplicar</h1>
      <GameIframe />
      <p>Puntuación: {{ gameStore.score }}</p>
    </div>
  </template>
  
  <script setup>
  import GameIframe from '../../components/Games/GameIframe.vue';
  import { useGameStore } from '../../stores/gameStore';
  const gameStore = useGameStore();
  </script>