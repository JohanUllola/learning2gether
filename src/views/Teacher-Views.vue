<template>
  <div class="teacher-dashboard">
    <h1>Control del Profesor</h1>
    <!-- Panel de Control -->
    <div class="teacher-card">
      <p>
        El profesor tiene control total sobre los juegos y puede gestionar la
        actividad de los estudiantes.
      </p>
      <div class="controls">
        <button class="control-button" @click="startGame">Iniciar Juego</button>
        <button class="control-button" @click="pauseGame">Pausar Juego</button>
        <button class="control-button" @click="stopGame">Detener Juego</button>
      </div>
    </div>

    <!-- Sección de Estudiantes -->
    <div class="student-section">
      <h2>Estudiantes conectados</h2>
      <div class="filter-controls">
        <input type="text" v-model="searchTerm" placeholder="Buscar estudiante..." />
        <select v-model="selectedGame">
          <option value="">Todos los juegos</option>
          <option v-for="game in availableGames" :key="game" :value="game">{{ game }}</option>
        </select>
      </div>
      <ul class="students-list">
        <li
          v-for="student in filteredStudents"
          :key="student.id"
          class="student-item"
          @click="openModal(student)"
        >
          <div class="student-info">
            <strong>{{ student.name }}</strong>
            <span class="status" :class="{ online: student.online, offline: !student.online }">
              {{ student.online ? 'En línea' : 'Fuera de línea' }}
            </span>
          </div>
          <div class="student-game">
            Jugando: <em>{{ student.game ? student.game : 'Ninguno' }}</em>
          </div>
        </li>
      </ul>
    </div>

    <!-- Modal de Detalles del Estudiante -->
    <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h3>Detalles del Estudiante</h3>
        <p><strong>Nombre:</strong> {{ selectedStudent.name }}</p>
        <p>
          <strong>Estado:</strong>
          {{ selectedStudent.online ? 'En línea' : 'Fuera de línea' }}
        </p>
        <p>
          <strong>Juego actual:</strong>
          {{ selectedStudent.game ? selectedStudent.game : 'Ninguno' }}
        </p>
        <button @click="closeModal">Cerrar</button>
      </div>
    </div>

    <!-- Sistema de Amigos -->
    <FriendsSystem />

    <!-- Sistema de Notificaciones -->
    <NotificationSystem />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { db } from "../firebaseConfig"; // Asegúrate de tener configurado Firebase
import { collection, onSnapshot } from "firebase/firestore";
import FriendsSystem from "../components/Friends.vue";
import NotificationSystem from "../components/NotificationSystem.vue";

const students = ref([]);
const searchTerm = ref("");
const selectedGame = ref("");
const modalOpen = ref(false);
const selectedStudent = ref(null);

let unsubscribe = null;

onMounted(() => {
  const studentsCollection = collection(db, "students");
  unsubscribe = onSnapshot(studentsCollection, (snapshot) => {
    students.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});

const filteredStudents = computed(() => {
  return students.value.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchesGame = selectedGame.value ? (student.game === selectedGame.value) : true;
    return matchesSearch && matchesGame;
  });
});

const availableGames = computed(() => {
  const games = new Set();
  students.value.forEach((student) => {
    if (student.game) games.add(student.game);
  });
  return Array.from(games);
});

const openModal = (student) => {
  selectedStudent.value = student;
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
  selectedStudent.value = null;
};

const startGame = () => {
  console.log("Juego iniciado");
  // Aquí puedes actualizar Firestore para notificar a los estudiantes.
};

const pauseGame = () => {
  console.log("Juego pausado");
};

const stopGame = () => {
  console.log("Juego detenido");
};
</script>

<style scoped lang="scss">
.teacher-dashboard {
  padding: 40px;
  background: #f5f7fa;
  min-height: 100vh;
  font-family: "Fira Sans", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.teacher-dashboard h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #4a5568;
}

.teacher-card {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 350px;
  width: 100%;
  margin-bottom: 40px;
}

.controls {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  
  .control-button {
    background: linear-gradient(90deg, #6236ff, #9c50ff);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background 0.3s ease;
    
    &:hover {
      background: darken(#6236ff, 10%);
    }
  }
}

.student-section {
  width: 100%;
  max-width: 800px;
  margin-bottom: 40px;
}

.student-section h2 {
  font-size: 1.75rem;
  margin-bottom: 20px;
  color: #4a5568;
}

.filter-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  
  input,
  select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
}

.students-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.student-item {
  background: white;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #f9f9f9;
  }
}

.student-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
}

.status {
  font-size: 0.9rem;
  padding: 2px 6px;
  border-radius: 4px;
  color: #fff;
}

.status.online {
  background-color: green;
}

.status.offline {
  background-color: red;
}

.student-game {
  font-size: 0.95rem;
  color: #555;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  text-align: center;
}

.modal-content h3 {
  margin-top: 0;
  color: #4a5568;
}

.modal-content button {
  margin-top: 15px;
  padding: 8px 16px;
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
