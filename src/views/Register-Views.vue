<template>
    <div class="register-container">
      <div class="register-box animate-box">
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
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </div>
  
          <div class="button-container">
            <button type="submit" class="animate-button" :disabled="userStore.loadingUser">
            <span v-if="userStore.loadingUser" class="loader"></span>
            <span v-else>Registrarse</span>
            </button>

          </div>
        </form>
        
        <div class="social-login">
          <p>O regístrate con:</p>
          <div class="social-buttons">
            <button @click="registerWithGoogle" class="google-button animate-button">
              <i class="fab fa-google"></i> Google
            </button>
            <button @click="registerWithFacebook" class="facebook-button animate-button">
              <i class="fab fa-facebook-f"></i> Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
  import { useUserStore } from '../stores/user';
  
  const userStore = useUserStore();
  const router = useRouter();
  const email = ref('');
  const password = ref('');
  const showPassword = ref(false);
  //const auth = getAuth();

  const handleRegister = async () => {
    if (!email.value || password.value.length < 6) {
      return alert('llena todos los campos')
    }
   await userStore.registerUser(email.value, password.value)
   router.push('/')
  }
  
  // const handleRegister = async () => {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
  //     userStore.setUser(userCredential.user);
  //     alert('Registro exitoso');
  //     router.push('/home');
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };
  
//   const registerWithGoogle = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       userStore.setUser(result.user);
//       router.push('/home');
//     } catch (error) {
//       alert(error.message);
//     }
//   };
  
//   const registerWithFacebook = async () => {
//     try {
//       const provider = new FacebookAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       userStore.setUser(result.user);
//       router.push('/home');
//     } catch (error) {
//       alert(error.message);
//     }
//   };
  </script>
  
  <style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: url('../assets/Fondo-login.png') no-repeat center center/cover;
    font-family: 'Inter', sans-serif;
    position: fixed;
    top: 0;
    left: 0;
    animation: gradientShift 15s ease infinite;
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
    box-sizing: border-box;
    transform: translateY(20px);
    opacity: 0;
    animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  
    h2 {
      font-weight: 600;
      font-size: 2rem;
      margin-bottom: 2rem;
      color: #4a5568;
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
  
  .input-field {
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
    margin-bottom: 1rem;
    opacity: 0;
    animation: fadeIn 0.4s 0.5s ease-out forwards;
  
    #password {
      padding-right: 2.5rem;
    }
  
    .eye-icon {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      color: #718096;
      transition: all 0.3s ease;
      padding: 4px;
      z-index: 2;
      
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
  
  .button-container {
    display: flex;
    justify-content: center;
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
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
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
  
  .social-login {
    margin-top: 2rem;
    text-align: center;
    opacity: 0;
    animation: fadeIn 0.4s 0.8s ease-out forwards;
  
    p {
      margin-bottom: 1.5rem;
      color: #4a5568;
    }
  }
  
  .social-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  
    button {
      display: flex;
      align-items: center;
      justify-content: center;
  
      i {
        margin-right: 0.75rem;
      }
    }
  }
  .loader {
  width: 18px;
  height: 18px;
  border: 2px solid white;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 5.8s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
  
  .google-button {
    background: #db4437;
  
    &:hover {
      background: #c23325;
    }
  }
  
  .facebook-button {
    background: #1877f2;
  
    &:hover {
      background: #1665d1;
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  </style>






