<template>
    <div class="login-container">
      <div class="login-box">
        <h2>Hola, <br>Bienvenido.</h2>
        <form @submit.prevent="handleLogin">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="username@email.com"
            required
          />
  
          <label for="password">Contraseña:</label>
          <div class="password-container">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              placeholder="*********"
              required
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
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </div>
  
          <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
  
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const showPassword = ref(false);
  const router = useRouter();
  
  const handleLogin = () => {
    if (email.value && password.value) {
      alert('Inicio de sesión exitoso');
      router.push('/home');
    }
  };
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };
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
    background: 
      url('../assets/Fondo-login.png') no-repeat center center/cover;
    font-family: 'Inter', sans-serif;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
  }
  
  .login-box {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    padding: 2.5rem;
    border-radius: 1.5rem;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    color: #2d3748;
    box-sizing: border-box;
  
    h2 {
      font-weight: 600;
      font-size: 2rem;
      margin-bottom: 2rem;
      color: #4a5568;
      line-height: 1.3;
    }
  
    form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
  }
  
  label {
    font-weight: 500;
    font-size: 0.875rem;
    color: #4a5568;
    margin-bottom: 0.5rem;
    display: block;
  }
  
  input {
    width: 100%;
    padding: 0.875rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    font-size: 1rem;
    transition: all 0.2s ease;
    background: rgba(255, 255, 255, 0.9);
    box-sizing: border-box;
    
    &:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      outline: none;
    }
  }
  
  .password-container {
    position: relative;
    
    .eye-icon {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      color: #718096;
      transition: color 0.2s ease;
      
      &:hover {
        color: #667eea;
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
    transition: color 0.2s ease;
    
    &:hover {
      color: #764ba2;
    }
  }
  
  button {
    background: #667eea;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: none;
    
    &:hover {
      background: #764ba2;
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  </style>