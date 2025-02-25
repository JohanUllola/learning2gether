<template>
    <div class="container">
      <h1>Word Game</h1>
      <WordGame />
    </div>
  </template>
  
  <script>
  import WordGame from '../components/Games/WordGame.vue';
  
  export default {
    name: 'WordGameView',
    components: {
      WordGame
    }
  }
  </script>
  
  <style scoped>
  .container {
    text-align: center;
  }
  </style>