// stores/gameStore.js
import { defineStore } from 'pinia';

// export const useGameStore = defineStore('game', {
//   state: () => ({
//     score: 0,
//     gameLoaded: false
//   }),
//   actions: {
//     updateScore(points) {
//       this.score += points;
//     }
//   }
// });





export const useGameStore = defineStore('game', {
  state: () => ({
    totalGamesPlayed: 50,
    highestScore: 1000,
    scores: [800, 900, 1000, 850, 900, 950, 1000, 960, 970, 990],
    gamesWon: 30,
    gamesLost: 20,
  }),
  getters: {
    averageScore(state) {
      if (state.scores.length === 0) return 0
      const sum = state.scores.reduce((a, b) => a + b, 0)
      return (sum / state.scores.length).toFixed(2)
    }
  },
  actions: {
    incrementGamesPlayed() {
      this.totalGamesPlayed++
    },
    updateHighestScore(score) {
      if (score > this.highestScore) {
        this.highestScore = score
      }
    },
    addScore(score) {
      this.scores.push(score)
      this.updateHighestScore(score)
    },
    incrementGamesWon() {
      this.gamesWon++
    },
    incrementGamesLost() {
      this.gamesLost++
    }
  }
})