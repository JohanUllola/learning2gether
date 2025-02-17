<template>
  <div class="login-container">
    <div class="login-box animate-box">
      <h2>Hola, <br>Bienvenido.</h2>
     
      <form @submit.prevent="handleLogin">
        <label for="email">Email:</label>        
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="username@email.com"
          required
          class="input-animate"
        />

        <label for="password">Contraseña:</label>
        <div class="password-container">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            placeholder="*********"
            required
            class="input-animate"
          />
          <span class="eye-icon" @click="togglePassword" @mousedown.prevent>
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
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </span>
        </div>

        <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>

        <button type="submit" class="btn-animate" >Ingresar</button>
      </form>

      <div class="register-prompt">
        <p>¿No tienes una cuenta? 
          <router-link to="/register" class="register-link">Regístrate</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import{useUserStore}from'../stores/user';



const email = ref('');
const password = ref('');
const showPassword = ref(false);
const UserStore= useUserStore();



const handleLogin = async () => {
    if (!email.value || password.value.length < 6) {
      return alert('llena todos los campos')
    }
   await UserStore.loginUser(email.value, password.value);
   router.push('/')
  }

// const handleLogin = () => {
//   if (email.value && password.value) {
//     alert('Inicio de sesión exitoso');
//     router.push('/home');
//   }
// };

// const togglePassword = () => {
//   showPassword.value = !showPassword.value;
// };
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

html, body {
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
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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

label {
  font-weight: 500;
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
  display: block;
  opacity: 0;
  animation: fadeIn 0.4s 0.3s ease-out forwards;
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
}

@keyframes inputEnter {
  to {
    opacity: 1;
    transform: translateY(0);
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
  
  &:hover {
    background: #764ba2;
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(118, 75, 162, 0.15);
  }
  
  &:active {
    transform: scale(0.98);
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
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>