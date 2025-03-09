<template>
  <div class="register-container">
    <div class="register-box animate-box">
      <button class="back-button" @click="goBack">
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


      <h2>Crear Cuenta</h2>
      
      <form @submit.prevent="handleRegister">
        <label for="email">Email:</label>        
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          placeholder="username@email.com" 
          required
          class="input-field"
        />

        <label for="password">Contraseña:</label>
        <div class="password-container">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            placeholder="*********"
            required
            class="input-field"
          />
          <span class="eye-icon" @click="togglePassword">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </span>
        </div>

        <div class="button-container">
          <button type="submit" class="animate-button" :disabled="loading">
            <span v-if="loading" class="loader"></span>
            <span v-else>Registrarse</span>
          </button>
        </div>
      </form>

      <div class="social-login">
        <div class="separator">
          <span class="line"></span>
          <span class="text">o continúa con</span>
          <span class="line"></span>
        </div>
        
        <button 
          class="google-btn animate-button"
          @click="loginWithGoogle"
          :disabled="loading"
        >
          <svg class="google-icon" viewBox="0 0 24 24">
            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
          </svg>
          Continuar con Google
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { getAuth } from 'firebase/auth';

const router = useRouter();
const userStore = useUserStore();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);

const goBack = () => {
  router.push('/login'); // o router.go(-1) para volver a la página anterior
};

const handleRegister = async () => {
  if (!email.value || password.value.length < 6) {
    return alert('Llena todos los campos y usa una contraseña de al menos 6 caracteres.');
  }

  loading.value = true;
  try {
    await userStore.registerUser(email.value, password.value);
    alert('Registro exitoso');
    router.push('/home');
  } catch (error) {
    alert("Error en el registro: " + error.message);
  } finally {
    loading.value = false;
  }
};

const loginWithGoogle = async () => {
  try {
    loading.value = true;
    await userStore.loginWithGoogle();
    router.push('/home');
  } catch (error) {
    alert("Error al iniciar sesión con Google: " + error.message);
  } finally {
    loading.value = false;
  }
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');


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

.register-box {
  position: relative; // Añade esto para posicionar el botón absolutamente
  // Resto de estilos...
}



.register-container {
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


.register-box {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  padding: 2.5rem;
  border-radius: 1.5rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  color: #2d3748;

  h2 {
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #4a5568;
    text-align: center;
  }
}

.input-field {
  width: 100%;
  padding: 0.875rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
    outline: none;
  }
}

.password-container {
  position: relative;
  margin-bottom: 1rem;

  .eye-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #718096;
    transition: color 0.3s ease;

    &:hover {
      color: #667eea;
    }
  }
}

.button-container {
  margin-top: 1.5rem;
}

.animate-button {
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

.social-login {
  margin-top: 2rem;
}

.separator {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;

  .line {
    flex: 1;
    height: 1px;
    background: #e2e8f0;
  }

  .text {
    padding: 0 1rem;
    color: #718096;
    font-size: 0.875rem;
  }
}

.google-btn {
  background: #ffffff !important;
  color: #4a5568 !important;
  border: 1px solid #e2e8f0 !important;

  &:hover:not(:disabled) {
    border-color: #cbd5e0 !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}

.google-icon {
  width: 20px;
  height: 20px;
}

.loader {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>