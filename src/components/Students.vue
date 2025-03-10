<template>
  <div class="estudiantes-en-linea">
    <h2 class="header-title">Estudiantes en línea 📚</h2>
    <div class="students-list">
      <div v-for="student in students" :key="student.id" class="student-card">
        <div class="card-header">
          <i class="fas fa-user-graduate card-icon"></i>
          <h3 class="card-title">{{ student.name }}</h3>
        </div>
        <p class="learning-progress">
          <i class="fas fa-book-open"></i>
          Nivel {{ student.level }}
        </p>
        <p class="current-game" v-if="student.status === 'online'">
          <i class="fas fa-gamepad"></i>
          Jugando: {{ student.currentGame }}
        </p>
        <button class="action-button" v-if="student.status === 'online'" @click="terminarJuego(student.name)">
          <i class="fas fa-stop-circle"></i>
          Terminar Juego
        </button>
        <button class="action-button" v-if="student.status !== 'online'">
          <i class="fas fa-chalkboard-teacher"></i>
          Estudiar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const students = ref([
  { id: 1, name: "Joan Manuel", status: "online", level: 3, currentGame: "Juego A" },
  { id: 2, name: "Jose Luis", status: "away", level: 5, currentGame: null },
  { id: 3, name: "Jenifer", status: "online", level: 2, currentGame: "Juego B" },
  { id: 4, name: "Laydi", status: "busy", level: 4, currentGame: null },
  { id: 5, name: "Verzan", status: "online", level: 1, currentGame: "Juego C" },
  { id: 6, name: "Modesto", status: "offline", level: 6, currentGame: null }
]);

const terminarJuego = (studentName) => {
  alert(`Juego terminado para ${studentName}`);
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";

.estudiantes-en-linea {
  padding: 2rem;
  background: #f1f5f9;
  min-height: 100vh;
  font-family: 'Fira Sans', sans-serif;
  margin-left: var(--sidebar-width, 60px);

  .header-title {
    text-align: center;
    font-size: 2rem;
    color: #4f46e5;
    margin-bottom: 1.5rem;
  }

  .students-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .student-card {
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    padding: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0,0,0,0.15);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      .card-icon {
        font-size: 2rem;
        color: #f59e0b;
      }
      
      .card-title {
        font-size: 1.25rem;
        color: #1e293b;
        margin: 0;
      }
    }

    .learning-progress {
      font-size: 1rem;
      color: #4b5563;

      i {
        margin-right: 0.5rem;
      }
    }

    .current-game {
      font-size: 1rem;
      color: #4b5563;

      i {
        margin-right: 0.5rem;
      }
    }

    .action-button {
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 8px;
      background: #4f46e5;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: background 0.2s ease;

      &:hover {
        background: darken(#4f46e5, 10%);
      }

      i {
        font-size: 1.1rem;
      }
    }
  }
}
</style>