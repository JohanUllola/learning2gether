<template>
    <div class="error-container">
      <div class="error-content">
        <h1 class="error-title">¡Juego no disponible!</h1>
        <p class="error-message">Lo sentimos, este juego no está disponible en este momento.</p>
        
        <div class="error-actions">
          <button @click="handleRetry" class="retry-button">
            <span class="material-icons">refresh</span>
            Intentar nuevamente
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const emit = defineEmits(['retry']);
  
  const handleRetry = () => {
    emit('retry');
  };
  </script>
  
  <style scoped>
  .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #2c3e50;
    padding: 2rem;
  }
  
  .error-content {
    text-align: center;
    max-width: 600px;
    padding: 2rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  }
  
  .error-title {
    color: #e74c3c;
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .error-message {
    color: #34495e;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .error-actions {
    display: flex;
    justify-content: center;
  }
  
  .retry-button {
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #3498db;
    color: white;
  }
  
  .retry-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
  
  @media (max-width: 768px) {
    .error-content {
      width: 90%;
    }
    
    .error-title {
      font-size: 2rem;
    }
    
    .error-message {
      font-size: 1rem;
    }
    
    .retry-button {
      width: 100%;
      justify-content: center;
    }
  }
  </style>