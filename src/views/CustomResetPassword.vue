<template>
  <div class="reset-password-container">
    <div class="reset-box animate-fade-in">
      <h2>🎮 Restablecer Contraseña</h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <label>Nueva Contraseña</label>
          <input
            type="password"
            v-model="newPassword"
            placeholder="Mínimo 6 caracteres"
            required
            :class="{ 'input-error': invalidPassword }"
          />
          <span v-if="invalidPassword" class="error-message">
            La contraseña debe tener al menos 6 caracteres
          </span>
        </div>

        <button type="submit" class="btn-animate" :disabled="loading">
          <span v-if="!loading">Actualizar</span>
          <div v-else class="spinner"></div>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const newPassword = ref('');
const loading = ref(false);
const invalidPassword = ref(false);

const validatePassword = () => {
  invalidPassword.value = newPassword.value.length < 6;
};

const handleSubmit = async () => {
  validatePassword();
  if (invalidPassword.value) return;

  loading.value = true;
  try {
    const result = await authStore.handlePasswordReset(
      route.query.oobCode,
      newPassword.value
    );
    
    if (result.success) {
      router.push({ name: 'PasswordResetSuccess' });
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    alert(error.message || 'Error al actualizar la contraseña');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Contenedor principal */
.reset-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('../assets/Fondo-login.png') no-repeat center center/cover;
  animation: gradientShift 15s ease infinite alternate;
}

/* Caja del formulario */
.reset-box {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transform: translateY(-20px);
  animation: slideIn 0.6s ease forwards;
}

/* Animación de deslizamiento */
@keyframes slideIn {
  to {
    transform: translateY(0);
  }
}

/* Título */
h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

/* Grupo de entrada */
.input-group {
  margin-bottom: 1rem;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

/* Campo de entrada */
input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

/* Mensaje de error */
.error-message {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

/* Botón */
button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  transform: scale(0.98);
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Spinner de carga */
.spinner {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #fff;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
