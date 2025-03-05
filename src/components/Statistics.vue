<template>
  <div class="dashboard-container">
    <div class="header">
      <h2>Teacher Game Analytics Dashboard</h2>
    </div>

    <div class="filters">
      <label for="studentSelect">Selecciona Estudiante:</label>
      <select id="studentSelect" v-model="selectedStudent" @change="applyFilter">
        <option value="all">Todos</option>
        <option value="Juan Pérez">Juan Pérez</option>
        <option value="María Gómez">María Gómez</option>
        <option value="Carlos Hernández">Carlos Hernández</option>
      </select>
      <button @click="refreshData" class="btn refresh-button">
        <span>Actualizar Datos</span>
        <svg class="refresh-icon" viewBox="0 0 24 24">
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
        </svg>
      </button>
    </div>

    <div class="stats-grid">
      <div class="stat-card" v-for="game in filteredGames" :key="game.id">
        <h3>{{ game.name }}</h3>
        <p><strong>Estudiante:</strong> {{ game.student }}</p>
        <p><strong>Puntos:</strong> {{ game.players }}</p>
        <p><strong>Tiempo Promedio:</strong> {{ game.avgTime }} mins</p>
        <p><strong>Sugerencia:</strong> {{ game.suggestion }}</p>
      </div>
    </div>

    <div class="chart-section">
      <h3>Popularidad de Juegos</h3>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const selectedStudent = ref('all');

const games = ref([
  { id: 1, name: "Juego A", players: 120, avgTime: 30, student: "Juan Pérez", suggestion: "Potenciar estrategia." },
  { id: 2, name: "Juego B", players: 80, avgTime: 25, student: "María Gómez", suggestion: "Revisar mecánica de juego." },
  { id: 3, name: "Juego C", players: 150, avgTime: 35, student: "Juan Pérez", suggestion: "Excelente desempeño." },
  { id: 4, name: "Juego D", players: 60, avgTime: 20, student: "Carlos Hernández", suggestion: "Fomentar mayor participación." },
  { id: 5, name: "Juego E", players: 200, avgTime: 40, student: "María Gómez", suggestion: "Muy popular, mantener impulso." },
]);

const filteredGames = computed(() => {
  if (selectedStudent.value === 'all') return games.value;
  return games.value.filter(game => game.student === selectedStudent.value);
});

const chartCanvas = ref(null);
let chartInstance = null;

const setupChart = () => {
  const labels = filteredGames.value.map(game => game.name);
  const data = filteredGames.value.map(game => game.players);

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Número de Jugadores',
        data,
        backgroundColor: 'rgba(90,125,171,0.6)',
        borderColor: 'rgba(90,125,171,1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#f3f4f6' },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        x: {
          ticks: { color: '#f3f4f6' },
          grid: { display: false }
        }
      },
      plugins: {
        legend: { labels: { color: '#f3f4f6' } }
      }
    }
  });
};

const refreshData = () => {
  games.value = games.value.map(game => ({
    ...game,
    players: Math.floor(Math.random() * 250) + 50,
    avgTime: Math.floor(Math.random() * 60) + 20,
  }));
  setupChart();
};

const applyFilter = () => {
  setupChart();
};

onMounted(() => {
  setupChart();
});
</script>

<style scoped>
.dashboard-container {
  padding: 2rem;
  background: linear-gradient(145deg, #23283b, #2d3149);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  color: #f3f4f6;
  max-width: 1200px;
  margin: auto;
  font-family: 'Roboto', sans-serif;
}

.header h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.filters {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filters label {
  font-weight: 600;
  font-size: 1.1rem;
}

select {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #4c678a;
  background: #2d3149;
  color: #f3f4f6;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

select:focus {
  border-color: #5a7dab;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(45deg, #4c678a, #5a7dab);
  color: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}

.refresh-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
  transition: transform 0.3s ease;
}

.btn:hover .refresh-icon {
  transform: rotate(360deg);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.chart-section {
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 1rem;
}

.chart-section h3 {
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 600;
}
</style>
