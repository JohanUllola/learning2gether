<template>
    <div class="success-container">
      <div class="success-box animate-box">
        <div class="success-icon">🎉</div>
        <h2>¡Contraseña Actualizada!</h2>
        <p>Ya puedes iniciar sesión con tu nueva contraseña</p>
        <router-link to="/login" class="btn-animate">
          Volver al Login
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  </script>
  
  <style scoped>
  .success-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: url('../assets/Fondo-login.png') no-repeat center center/cover;
    animation: gradientShift 15s ease infinite alternate;
  }
  
  .success-box {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    padding: 2.5rem;
    border-radius: 1.5rem;
    width: 90%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  .success-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    animation: bounce 1s ease infinite;
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  
  h2 {
    color: #4a5568;
    margin-bottom: 1rem;
  }
  
  p {
    color: #718096;
    margin-bottom: 2rem;
  }
  
  .btn-animate {
    /* Mantén los mismos estilos de tu botón principal */
    background: #667eea;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  &:hover:not(:disabled) {
    background: #764ba2;
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(118, 75, 162, 0.15);
  }

  &:disabled {
    background: #94a3b8 !important;
    cursor: not-allowed;
    transform: none !important;
  }
  }
  </style>