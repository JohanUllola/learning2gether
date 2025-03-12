<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';
import { useUserStore } from '../stores/user';
import ErrorPopup from '../components/ErrorPopup.vue';
import {useRoute} from 'vue-router'
import YolfryBtn from '../components/yolfryBtn.vue';

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const router = useRouter();
const userStore = useUserStore();
const errorMessage = ref('');
const isErrorVisible = ref(false);
const invalidEmail = ref(false);
const invalidPassword = ref(false);
const isLoading = ref(false);

const goBack = () => {
  router.push('/profile-selection'); // o router.go(-1) para volver a la página anterior
};

const route = useRoute()

onMounted(async () => {

  console.log(route.params)

  await onAuthStateChanged(auth, (user) => {
    if (user) {
      userStore.userData = { email: user.email, uid: user.uid };
      router.push('/');
    }
  });
});

watch(email, (newVal) => validateEmail(newVal));
watch(password, (newVal) => validatePassword(newVal));

const getFirebaseError = (errorCode) => {
  const errors = {
    'auth/invalid-email': 'Correo electrónico inválido',
    'auth/user-disabled': 'Cuenta deshabilitada',
    'auth/user-not-found': 'Usuario no registrado',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/too-many-requests': 'Demasiados intentos, intente más tarde',
    'auth/network-request-failed': 'Error de conexión a internet'
  };
  return errors[errorCode] || 'Error desconocido al iniciar sesión';
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  invalidEmail.value = !emailRegex.test(email.value);
};

const validatePassword = () => {
  invalidPassword.value = password.value.length < 6;
};

const showError = (message) => {
  errorMessage.value = message;
  isErrorVisible.value = true;
  setTimeout(() => {
    isErrorVisible.value = false;
  }, 5000);
};

const handleLogin = async () => {
  if (invalidEmail.value || invalidPassword.value) return;

  try {
    isLoading.value = true;
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    userStore.userData = { email: user.email, uid: user.uid };
    router.push('/home');
  } catch (error) {
    console.error("Error de autenticación:", error);
    showError(getFirebaseError(error.code));
  } finally {
    isLoading.value = false;
  }
};
// Nuevo método para login con Google
const handleGoogleLogin = async () => {
  try {
    isLoading.value = true;
    await userStore.loginWithGoogle();
  } catch (error) {
    console.error("Error de autenticación con Google:", error);
    showError(getFirebaseError(error.code));
  } finally {
    isLoading.value = false;
  }
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div class="login-container">
    <ErrorPopup :message="errorMessage" :is-visible="isErrorVisible" @close="isErrorVisible = false" />

    <!-- <YolfryBtn :title="$route.params.met">
       <template v-slot>Hola</template>
       <template v-slot:title3>
        Holab
       </template>
    </YolfryBtn> -->

    <div class="login-box animate-box">
      <button class="back-button" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <h2>Hola, <br />Bienvenido.</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Correo:</label>
          <input type="email" id="email" v-model="email" placeholder="correo@example.com" required class="input-animate"
            :class="{ 'input-error': invalidEmail }" @input="validateEmail" />
          <span v-if="invalidEmail" class="error-message">Correo electrónico inválido</span>
        </div>

        <div class="input-group">
          <label for="password">Contraseña:</label>
          <div class="password-container">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" placeholder="********"
              required class="input-animate" :class="{ 'input-error': invalidPassword }" @input="validatePassword" />
            <span class="eye-icon" @click="togglePassword" @mousedown.prevent>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </div>
          <span v-if="invalidPassword" class="error-message">Mínimo 6 caracteres requeridos</span>
        </div>

        <router-link to="/reset-password-email" class="forgot-password">
          ¿Olvidaste tu contraseña?
        </router-link>

        <button type="submit" class="btn-animate" :disabled="isLoading || invalidEmail || invalidPassword">
          <span v-if="!isLoading">Ingresar</span>
          <div v-else class="spinner"></div>
        </button>
      </form>
      <!-- Sección de Login con Google -->
      <div class="social-login">
        <div class="separator">
          <span class="line"></span>
          <span class="text">o continúa con</span>
          <span class="line"></span>
        </div>

        <button class="google-btn btn-animate" @click="handleGoogleLogin" :disabled="isLoading">
          <svg class="google-icon" viewBox="0 0 24 24">
            <path
              d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
          </svg>
          Ingresar con Google
        </button>
      </div>
      <div class="register-prompt">
        <p>
          ¿No tienes una cuenta?
          <router-link to="/register" class="register-link">Regístrate</router-link>
        </p>
      </div>
    </div>
  </div>
</template>



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

html,
body {
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.login-container {
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
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.login-box {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  padding: 2.5rem;
  border-radius: 1.5rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  color: #2d3748;
  box-sizing: border-box;
  transform: translateY(20px);
  opacity: 0;
  animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;

  h2 {
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #4a5568;
    line-height: 1.3;
    transform: translateX(-20px);
    opacity: 0;
    animation: slideIn 0.4s 0.2s ease-out forwards;
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  transform: translateY(5px);
  opacity: 0;
  animation: inputEnter 0.4s 0.4s ease-out forwards;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
    outline: none;
    transform: scale(1.02);
  }

  &.input-error {
    border-color: #dc2626 !important;
    background: #fff5f5 !important;
    animation: shake 0.5s ease-in-out;
  }
}

@keyframes inputEnter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  50% {
    transform: translateX(5px);
  }

  75% {
    transform: translateX(-5px);
  }
}

.password-container {
  position: relative;
  opacity: 0;
  animation: fadeIn 0.4s 0.5s ease-out forwards;

  .eye-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #718096;
    transition: all 0.3s ease;
    padding: 4px;

    &:hover {
      color: #667eea;
      transform: translateY(-50%) scale(1.1);
    }

    &:active {
      transform: translateY(-50%) scale(0.95);
    }

    svg {
      display: block;
    }
  }
}

/* Nuevos estilos para Google Sign-In */
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
  width: 100%;
  background: #ffffff !important;
  color: #4a5568 !important;
  border: 1px solid #e2e8f0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  padding: 0.875rem 1rem;

  &:hover:not(:disabled) {
    border-color: #cbd5e0 !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.google-icon {
  width: 20px;
  height: 20px;
}

.forgot-password {
  font-size: 0.875rem;
  color: #667eea;
  text-decoration: none;
  text-align: right;
  transition: all 0.3s ease;
  opacity: 0;
  animation: fadeIn 0.4s 0.6s ease-out forwards;

  &:hover {
    color: #764ba2;
    letter-spacing: 0.3px;
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
  text-transform: none;
  margin-top: 0.5rem;
  opacity: 0;
  animation: fadeIn 0.4s 0.7s ease-out forwards;

  &:hover:not(:disabled) {
    background: #764ba2;
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(118, 75, 162, 0.15);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    background: #94a3b8 !important;
    cursor: not-allowed;
    transform: none !important;
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
  to {
    transform: rotate(360deg);
  }
}

.register-prompt {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #4a5568;
  opacity: 0;
  animation: fadeIn 0.4s 0.8s ease-out forwards;

  p {
    margin: 0;
  }
}

.register-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #764ba2;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>