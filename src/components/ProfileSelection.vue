<template>
  <div class="role-selection-container">
    <div class="roles-box animate-box">
      <h2 class="title-animation">¿Quién Va a Usar?</h2>
      
      <div class="roles-container">
        <div class="roles">
          <button 
            class="role student-card"
            @click="selectRole('student')"
            @keyup.enter="selectRole('student')"
          >
            <div class="avatar student animate-float">
              <span class="role-icon">🎮</span>
            </div>
            <span class="role-name">Estudiante</span>
          </button>
  
          <button 
            class="role teacher-card"
            @click="selectRole('teacher')"
            @keyup.enter="selectRole('teacher')"
          >
            <div class="avatar teacher animate-float">
              <span class="role-icon">👩🏫</span>
            </div>
            <span class="role-name">Profesor</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const selectRole = (role) => {
  if (role === 'teacher') {
    router.push('/login');
  } else {
    router.push('/student-name'); // Nueva ruta para estudiantes
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

.role-selection-container {
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
}

.roles-box {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  padding: 2.5rem;
  border-radius: 1.5rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  color: #2d3748;
  transform: translateY(20px);
  opacity: 0;
  animation: fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  
  h2 {
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #4a5568;
    text-align: center;
    transform: translateX(-20px);
    opacity: 0;
    animation: slideIn 0.8s 0.4s ease-out forwards;
  }
}

.roles-container {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: transform 0.5s ease, opacity 0.5s ease;
  animation: slideIn 1s ease-out;
}

.roles {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.role {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.5s ease;
  opacity: 0;
  animation: fadeIn 0.8s 0.8s ease-out forwards;
  
  &:nth-child(2) {
    animation-delay: 1s;
  }
  
  &:hover {
    transform: scale(1.05);
  }
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  background: #667eea;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  &.teacher {
    background: #764ba2;
    box-shadow: 0 4px 15px rgba(118, 75, 162, 0.3);
  }
}

.role-icon {
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.1));
  transition: transform 0.5s ease;
}

.role:hover .role-icon {
  transform: scale(1.1);
}

.role-name {
  margin-top: 1rem;
  font-size: 1.1rem;
  color: #4a5568;
  font-weight: 600;
  transition: color 0.5s ease;
}

.role:hover .role-name {
  color: #2d3748;
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

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>