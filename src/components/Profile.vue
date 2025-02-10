<template>
    <div class="profile-container">
      <h1>Perfil</h1>
      
      <div class="profile-card">
        <h3>Joan</h3>
        <img class="avatar" src="../assets/perfil.png" alt="Avatar" />
        
        <h2>Joan Manuel</h2>
        
        <div class="rating">
          <span v-for="star in 4" :key="star" class="star filled">★</span>
          <span class="star">☆</span>
        </div>
  
        <div class="info">
          <p><span class="material-icons">email</span> joan@email.com</p>
          <p><span class="material-icons">phone</span> +01 234 567 000</p>
          <p><span class="material-icons">location_on</span> Fantino, Sanchez Ramirez</p>
        </div>
  
        <button class="edit-button">EDITAR</button>
      </div>
    </div>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .profile-container {
    padding: 40px;
    background: #f5f7fa;
    height: 100vh;
  }
  
  .profile-card {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 350px;
    margin: auto;
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .avatar {
    width: 100px;
    border-radius: 50%;
    margin: 10px 0;
  }
  
  .rating {
    color: #9c50ff;
    font-size: 20px;
  }
  
  .star {
    margin: 2px;
  }
  
  .info {
    margin: 20px 0;
    text-align: left;
  }
  
  .info p {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 5px 0;
  }
  
  .edit-button {
    background: linear-gradient(90deg, #6236ff, #9c50ff);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
  }
  </style>
  