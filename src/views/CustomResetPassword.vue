<template>
    <div class="reset-password-container">
      <div class="reset-box animate-box">
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
  import { ref, computed } from 'vue';
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
  .reset-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: url('../assets/Fondo-login.png') no-repeat center center/cover;
    animation: gradientShift 15s ease infinite alternate;
  }
  
  .reset-box {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    padding: 2.5rem;
    border-radius: 1.5rem;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  /* Mantén los mismos estilos de animación que en tu login */
  </style>