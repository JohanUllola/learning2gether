<template>
    <div class="auth-action-container">
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
        <p>Procesando solicitud...</p>
      </div>
      
      <div v-else-if="error" class="error-message">
        <p>⚠️ {{ errorMessage }}</p>
        <router-link to="/login" class="retry-link">
          Volver al inicio
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/auth';
  
  const route = useRoute();
  const router = useRouter();
  const authStore = useAuthStore();
  
  const loading = ref(true);
  const error = ref(false);
  const errorMessage = ref('');
  
  onMounted(async () => {
    try {
      const { mode, oobCode } = route.query;
      
      switch (mode) {
        case 'resetPassword':
          router.push({ name: 'CustomResetPassword', query: { oobCode } });
          break;
          
        case 'verifyEmail':
          await handleEmailVerification(oobCode);
          router.push({ name: 'EmailVerified' });
          break;
          
        default:
          throw new Error('Acción no válida');
      }
    } catch (error) {
      handleError(error);
    } finally {
      loading.value = false;
    }
  });
  
  const handleEmailVerification = async (oobCode) => {
    const result = await authStore.verifyEmail(oobCode);
    if (!result.success) throw new Error(result.message);
  };
  
  const handleError = (error) => {
    error.value = true;
    errorMessage.value = error.message || 'Error procesando la solicitud';
  };
  </script>
  
  <style scoped>
  .auth-action-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('@/assets/Fondo-login.png') no-repeat center center/cover;
  }
  
  .loading-overlay {
    text-align: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #667eea;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }
  
  .error-message {
    background: rgba(255, 255, 255, 0.9);
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
    max-width: 400px;
  }
  
  .retry-link {
    color: #667eea;
    margin-top: 1rem;
    display: inline-block;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  </style>