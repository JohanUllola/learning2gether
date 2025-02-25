// stores/gameStore.js
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    score: 0,
    gameLoaded: false
  }),
  actions: {
    updateScore(points) {
      this.score += points;
    }
  }
});