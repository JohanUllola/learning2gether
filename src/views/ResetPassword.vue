<template>
    <div class="reset-container">
      <ErrorPopup 
        :message="errorMessage" 
        :is-visible="isErrorVisible" 
        @close="isErrorVisible = false"
      />
      
      <div class="reset-box animate-box">
        <button class="back-button" @click="$router.push('/login')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        
        <h2>Recuperar Contraseña</h2>
  
        <form @submit.prevent="sendResetEmail">
          <div class="input-group">
            <label for="email">Email:</label>
            <div class="input-wrapper">
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                placeholder="Ingresa tu email" 
                required
                class="input-animate"
                :class="{ 
                  'input-error': invalidEmail,
                  'valid': email && !invalidEmail 
                }"
                @input="validateEmail"
              />
              <span v-if="email && !invalidEmail" class="check-icon">✓</span>
            </div>
            <span v-if="invalidEmail" class="error-message">Correo electrónico inválido</span>
          </div>
  
          <div class="button-container">
            <button 
              type="submit" 
              class="btn-animate" 
              :disabled="loading || invalidEmail || cooldown"
            >
              <template v-if="!cooldown">
                <span v-if="!loading">Enviar enlace</span>
                <div v-else class="spinner"></div>
              </template>
              <span v-else class="cooldown-text">Reenviar en {{ countdown }}s</span>
            </button>
          </div>
        </form>
  
        <div v-if="emailSent" class="resend-section">
          <p class="resend-text">¿No recibiste el correo?
            <button 
              class="resend-link"
              @click="sendResetEmail"
              :disabled="cooldown"
            >
              Reenviar enlace
            </button>
          </p>
        </div>
  
        <router-link to="/login" class="back-link">Volver al login</router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
  import ErrorPopup from '../components/ErrorPopup.vue';
  
  const router = useRouter();
  const email = ref('');
  const loading = ref(false);
  const invalidEmail = ref(false);
  const errorMessage = ref('');
  const isErrorVisible = ref(false);
  const emailSent = ref(false);
  const countdown = ref(30);
  const cooldown = ref(false);
  let countdownInterval = null;
  
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    invalidEmail.value = !emailRegex.test(email.value);
  };
  
  const startCountdown = () => {
    cooldown.value = true;
    countdown.value = 30;
    countdownInterval = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(countdownInterval);
        cooldown.value = false;
      }
    }, 1000);
  };
  
  const sendResetEmail = async () => {
    if (invalidEmail.value || cooldown.value) return;
    
    loading.value = true;
    const auth = getAuth();
    
    try {
      await sendPasswordResetEmail(auth, email.value);
      emailSent.value = true;
      showSuccess('Correo enviado. Revisa tu bandeja de entrada.');
      startCountdown();
      setTimeout(() => router.push('/login'), 30000);
    } catch (error) {
      handleError(error);
    } finally {
      loading.value = false;
    }
  };
  
  const showSuccess = (message) => {
    errorMessage.value = message;
    isErrorVisible.value = true;
    setTimeout(() => isErrorVisible.value = false, 5000);
  };
  
  const handleError = (error) => {
    const errorMap = {
      'auth/invalid-email': 'Correo electrónico inválido',
      'auth/user-not-found': 'Usuario no registrado',
      'auth/too-many-requests': 'Espera antes de intentar nuevamente'
    };
    errorMessage.value = errorMap[error.code] || 'Error al enviar el correo';
    isErrorVisible.value = true;
    setTimeout(() => isErrorVisible.value = false, 5000);
  };
  
  onUnmounted(() => {
    if (countdownInterval) clearInterval(countdownInterval);
  });
  </script>
  
  <style scoped>
input-wrapper {
  position: relative;
}

.check-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #22c55e;
  font-size: 1.2rem;
  opacity: 0;
  animation: checkAppear 0.3s ease-out forwards;
}

@keyframes checkAppear {
  to {
    opacity: 1;
    right: 10px;
  }
}

.valid {
  border-color: #22c55e !important;
  padding-right: 35px;
}

.resend-section {
  margin-top: 1.5rem;
  text-align: center;
}

.resend-text {
  color: #4a5568;
  font-size: 0.9rem;
}

.resend-link {
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.resend-link:hover:not(:disabled) {
  color: #764ba2;
  text-decoration: underline;
}

.resend-link:disabled {
  color: #94a3b8;
  cursor: not-allowed;
}

.cooldown-text {
  display: inline-block;
  min-width: 120px;
}




.reset-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: url('../assets/Fondo-login.png') no-repeat center center/cover;
    font-family: 'Inter', sans-serif;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    animation: gradientShift 15s ease infinite alternate;
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .reset-box {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    padding: 2.5rem;
    border-radius: 1.5rem;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transform: translateY(20px);
    opacity: 0;
    animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    position: relative;
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .input-group {
    margin-bottom: 1.5rem;
    position: relative;
  }
  
  .error-message {
    color: #dc2626;
    font-size: 0.75rem;
    position: absolute;
    bottom: -1.2rem;
    left: 0.5rem;
  }
  
  .input-animate {
    width: 100%;
    padding: 0.875rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    font-size: 1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(5px);
    opacity: 0;
    animation: inputEnter 0.4s 0.4s ease-out forwards;
  }
  
  @keyframes inputEnter {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .btn-animate {
    background: #667eea;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    
    &:hover:not(:disabled) {
      background: #764ba2;
      transform: scale(1.02);
      box-shadow: 0 4px 12px rgba(118, 75, 162, 0.15);
    }
    
    &:disabled {
      background: #94a3b8 !important;
      cursor: not-allowed;
    }
  }
  
  .back-button {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: #4a5568;
    transition: all 0.3s ease;
    
    &:hover {
      color: #667eea;
      transform: translateX(-2px);
    }
  
    svg {
      width: 24px;
      height: 24px;
    }
  }
  
  .back-link {
    display: block;
    margin-top: 1.5rem;
    color: #667eea;
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: #764ba2;
      letter-spacing: 0.3px;
    }
  }
  
  .spinner {
    width: 24px;
    height: 24px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  </style>