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
                maxlength="50"
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

          <div class="info-message">
            <p class="access-warning">
              ⚠️ Acceso limitado para usuarios no registrados:
            </p>
            <ul class="benefits-list">
              <li>Tu progreso se guardará temporalmente por 24h</li>
              <li>Acceso limitado a 3 juegos básicos</li>
              <li>Estadísticas no disponibles</li>
            </ul>
            
            <div class="auth-links">
              <router-link to="/login/studen" class="auth-link login">
                ¿Ya tienes cuenta? Inicia Sesión
              </router-link>
              <router-link to="/registro" class="auth-link register">
                Regístrate Gratis
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const studentName = ref('');
const errorMessage = ref('');

const validateName = (name) => {
  if (!name.trim()) return 'Por favor ingresa tu nombre';
  if (name.length > 50) return 'Máximo 50 caracteres';
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) return 'Solo letras y espacios';
  return null;
};

const submitName = () => {
  const error = validateName(studentName.value);
  if (error) {
    errorMessage.value = error;
    return;
  }
  
  localStorage.setItem('studentData', JSON.stringify({
    name: studentName.value.trim(),
    timestamp: new Date().getTime()
  }));
  
  router.push('/student-dashboard');
};
</script>

<style lang="scss" scoped>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.main-container {
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  background: 
    linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)),
    url('../assets/Fondo-login.png') center/cover no-repeat fixed;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
}

.grid-container {
  width: 100%;
  max-width: 1200px;
  max-height: 100vh;
  padding: 20px 20px 80px;
  margin-bottom: -80px;
  overflow-y: auto;
  
  /* Ocultar scrollbar para todos los navegadores */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.name-card {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 480px;
  margin: 0 auto 40px;
  transition: transform 0.3s ease;
  animation: popIn 0.6s ease-out;
  
  &:hover {
    transform: translateY(-5px);
  }
}

@keyframes popIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.header {
  margin-bottom: 2rem;
  
  h1 {
    color: #1a365d;
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
    animation: slideDown 0.6s ease-out;
  }
}

@keyframes slideDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.input-group {
  margin-bottom: 1.5rem;
}

.name-input {
  width: 100%;
  padding: 1rem;
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
  
  &.input-error {
    border-color: #fc8181;
    box-shadow: 0 0 0 3px rgba(252, 129, 129, 0.2);
  }
}

.error-message {
  color: #e53e3e;
  font-size: 0.9rem;
  margin: 0.5rem 0 0;
  padding: 0.5rem;
  background: #fff5f5;
  border-radius: 0.5rem;
  width: 100%;
}

.submit-button {
  width: 100%;
  padding: 1rem;
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

.info-message {
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(245, 245, 245, 0.95);
  border-radius: 1rem;
  animation: fadeIn 0.6s ease-out;
}

.access-warning {
  color: #2d3748;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.benefits-list {
  text-align: left;
  margin: 1.5rem 0;
  padding-left: 1rem;
  color: #4a5568;
  
  li {
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    position: relative;
    line-height: 1.4;
    
    &::before {
      content: '•';
      color: #667eea;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
}

.auth-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.auth-link {
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: block;
  
  &.login, &.register {
    background: #667eea;
    color: white;
    
    &:hover {
      background: #553c9a;
      transform: translateY(-2px);
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 640px) {
  .grid-container {
    padding: 0 15px 60px;
    margin-bottom: -60px;
  }
  
  .name-card {
    padding: 1.5rem;
    margin-bottom: 30px;
  }
  
  .header h1 {
    font-size: 1.75rem;
  }
  
  .benefits-list li {
    font-size: 0.85rem;
  }
}
</style>