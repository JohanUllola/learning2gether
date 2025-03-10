<template>
  <div class="achievement-cards">
    <h2 class="header-title">Tus Logros</h2>
    <div class="cards-container">
      <div v-for="achievement in achievements" :key="achievement.id" class="card">
        <div class="card-header">
          <span class="card-icon material-icons">{{ achievement.icon || 'emoji_events' }}</span>
          <h3 class="card-title">{{ achievement.title }}</h3>
        </div>
        <p class="card-description">{{ achievement.description }}</p>
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: achievement.progress + '%' }"></div>
          </div>
          <span class="progress-text">{{ achievement.progress }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const achievements = ref([
  { id: 1, title: 'Primer Paso', description: 'Completa el tutorial', progress: 100, icon: 'emoji_events' },
  { id: 2, title: 'Aprendizaje Activo', description: 'Completa 5 juegos', progress: 60, icon: 'school' },
  { id: 3, title: 'Maestro del Conocimiento', description: 'Completa 10 juegos', progress: 40, icon: 'military_tech' },
  { id: 4, title: 'Super Estudiante', description: 'Alcanza 1000 puntos en total', progress: 80, icon: 'star' },
  // Agrega más logros según necesites
]);
</script>

<style scoped lang="scss">
.achievement-cards {
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

  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .card {
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

    .card-description {
      font-size: 1rem;
      color: #4b5563;
    }

    .progress-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .progress-bar {
        flex-grow: 1;
        background: #e5e7eb;
        border-radius: 10px;
        overflow: hidden;
        height: 10px;

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6236ff, #9c50ff);
          transition: width 0.3s ease;
        }
      }

      .progress-text {
        font-size: 0.9rem;
        color: #4b5563;
        min-width: 40px;
        text-align: right;
      }
    }
  }
}
</style>
