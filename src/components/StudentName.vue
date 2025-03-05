<template>
  <div class="main-container">
    <div class="grid-container">
      <div class="name-card">
        <div class="header">
          <h1 class="title-animation">Ingresa tu nombre</h1>
        </div>

        <div class="form-wrapper">
          <form @submit.prevent="submitName" class="name-form">
            <div class="input-group">
              <label for="studentName" class="sr-only">Nombre del estudiante</label>
              <input
                id="studentName"
                type="text"
                v-model="studentName"
                placeholder="Ej: Juan Pérez"
                required
                class="name-input"
                :class="{ 'input-error': errorMessage }"
              />
              <transition name="slide-fade">
                <div v-if="errorMessage" class="error-message">
                  {{ errorMessage }}
                </div>
              </transition>
            </div>

            <button type="submit" class="submit-button">
              <span class="button-text">Continuar a los juegos</span>
              <span class="button-icon">🎮</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const router = useRouter();
const userStore = useUserStore();
const studentName = ref('');
const errorMessage = ref('');

const submitName = () => {
  const trimmedName = studentName.value.trim();
  
  if (!trimmedName) {
    errorMessage.value = 'Por favor ingresa tu nombre antes de continuar';
    return;
  }
  
  if (trimmedName.length > 50) {
    errorMessage.value = 'El nombre no puede exceder los 50 caracteres';
    return;
  }

  // Simulación de guardado en store
  userStore.setStudentName(trimmedName);
  
  // Limpiar errores y redirigir
  errorMessage.value = '';
  router.push('/wordgame');
};
</script>

<style lang="scss" scoped>
.main-container {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem;
}

.grid-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.name-card {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  max-width: 480px;
  margin: 0 auto;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: #1a365d;
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
  }
}

.input-group {
  margin-bottom: 1.5rem;
}

.name-input {
  width: 100%;
  padding: 1.2rem;
  border: 2px solid #cbd5e0;
  border-radius: 0.75rem;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  background: #fff;
  color: #2d3748;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }

  &::placeholder {
    color: #a0aec0;
  }

  &.input-error {
    border-color: #fc8181;
    box-shadow: 0 0 0 3px rgba(252, 129, 129, 0.2);
  }
}

.error-message {
  color: #e53e3e;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #fff5f5;
  border-radius: 0.5rem;
}

.submit-button {
  width: 100%;
  padding: 1.2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  &:hover {
    background: #553c9a;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(85, 60, 154, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
}

.button-icon {
  font-size: 1.4rem;
}

// Animaciones
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

@media (max-width: 640px) {
  .main-container {
    padding: 1.5rem;
  }

  .name-card {
    padding: 1.5rem;
    border-radius: 1rem;
  }

  .header h1 {
    font-size: 1.75rem;
  }
}
</style>