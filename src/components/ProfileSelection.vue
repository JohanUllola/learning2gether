<template>
    <div class="profile-selection-container">
      <h1>¿Quién Va Usar?</h1>
  
      <!-- Contenedor de perfiles existentes -->
      <div class="profiles-box">
        <div class="profiles">
          <div
            v-for="(profile, index) in profiles"
            :key="index"
            class="profile"
          >
            <div class="avatar" :style="{ backgroundColor: profile.bgColor }">
              <img v-if="profile.img" :src="getAvatar(profile.img)" alt="avatar" />
              <span v-else>{{ profile.initial }}</span>
            </div>
            <span class="profile-name">{{ profile.name }}</span>
          </div>
  
          <!-- Opción de "Nuevo" perfil -->
          <div class="profile">
            <div class="avatar new">
              <span class="plus">+</span>
            </div>
            <span class="profile-name">Nuevo</span>
          </div>
        </div>
      </div>
  
      <!-- Botón para administrar perfiles -->
      <button class="manage-button">Administrar Perfiles</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const profiles = ref([
    { name: 'Modesto', bgColor: '#d4a5ff', initial: 'M', img: 'boy.png' },
    { name: 'Johan', bgColor: '#b185db', initial: 'J', img: 'kid.png' }
  ]);
  
  const getAvatar = (imageName) => {
    return new URL(`../assets/${imageName}`, import.meta.url).href;
  };
  </script>
  
  <style scoped>
  /* Contenedor principal */
  .profile-selection-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    font-family: Arial, sans-serif;
    color: #fff;
    background-color: #d4a5ff;
    min-height: 100vh;
    width: 100vw;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* Título */
  .profile-selection-container h1 {
    margin-bottom: 2rem;
    font-size: 1.8rem;
  }
  
  /* Caja alrededor de los perfiles */
  .profiles-box {
    background: rgba(255, 255, 255, 0.9);
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    max-width: 800px;
    width: 100%;
  }
  
  /* Contenedor de perfiles */
  .profiles {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  /* Cada perfil */
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  
  /* Avatar circular */
  .avatar {
    width: 100px;
    height: 100px;
    background-color: #ccc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #fff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .profile:hover .avatar {
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  }
  
  /* Imagen dentro del avatar */
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Opción especial para "Nuevo" */
  .avatar.new {
    background-color: #b185db;
  }
  
  .plus {
    font-size: 3rem;
    color: #6a1b9a;
  }
  
  /* Nombre del perfil */
  .profile-name {
    margin-top: 0.5rem;
    font-size: 1rem;
    color: #6a1b9a;
    font-weight: bold;
  }
  
  /* Botón de administración */
  .manage-button {
    margin-top: 2rem;
    padding: 0.6rem 1.5rem;
    border: none;
    background-color: #b185db;
    color: #fff;
    border-radius: 20px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .manage-button:hover {
    background-color: #9d74c2;
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  </style>
  