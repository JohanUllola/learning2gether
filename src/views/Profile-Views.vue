<template>
  <div :class="['profile-container', { 'dark-mode': isDarkMode }]">
    <h1>Perfil</h1>
    
    <div :class="['profile-card', { 'dark-mode': isDarkMode }]">
      <div class="profile-pic-wrapper">
        <label for="profilePic">
          <img :src="profilePic" alt="Avatar" class="avatar" />
          <input id="profilePic" type="file" @change="updateProfilePic" />
        </label>
      </div>
      
      <div class="profile-details">
        <div class="detail-row">
          <label class="detail-label">Usuario:</label>
          <span v-if="!editingName">{{ userName }}</span>
          <input v-else v-model="userName" @blur="editingName = false" :class="{ 'dark-mode': isDarkMode }" />
          <button class="edit-button" @click="toggleEditing('name')">
            <i class="fas fa-edit"></i>
          </button>
        </div>
        <div class="detail-row">
          <label class="detail-label">Email:</label>
          <span v-if="!editingEmail">{{ userEmail }}</span>
          <input v-else v-model="userEmail" @blur="editingEmail = false" :class="{ 'dark-mode': isDarkMode }" />
          <button class="edit-button" @click="toggleEditing('email')">
            <i class="fas fa-edit"></i>
          </button>
        </div>
        <div class="detail-row">
          <label class="detail-label">Teléfono:</label>
          <span v-if="!editingPhone">{{ userPhone }}</span>
          <input v-else v-model="userPhone" @blur="editingPhone = false" :class="{ 'dark-mode': isDarkMode }" />
          <button class="edit-button" @click="toggleEditing('phone')">
            <i class="fas fa-edit"></i>
          </button>
        </div>
        <div class="detail-row">
          <label class="detail-label">Biografía:</label>
          <span v-if="!editingBio">{{ userBio }}</span>
          <textarea v-else v-model="userBio" @blur="editingBio = false" :class="{ 'dark-mode': isDarkMode }"></textarea>
          <button class="edit-button" @click="toggleEditing('bio')">
            <i class="fas fa-edit"></i>
          </button>
        </div>
      </div>
      
      <div class="preferences">
        <div class="preference-item">
          <span>Modo Oscuro</span>
          <label class="switch">
            <input type="checkbox" v-model="isDarkMode" @change="toggleDarkMode" />
            <span class="slider"></span>
          </label>
        </div>
        <div class="preference-item">
          <span>Notificaciones</span>
          <label class="switch">
            <input type="checkbox" v-model="notifications" />
            <span class="slider"></span>
          </label>
        </div>
      </div>
      
      <div class="action-buttons">
        <button class="action-btn" @click="toggleSection('changePassword')">
          <i class="fas fa-key"></i> Cambiar Contraseña
        </button>
        <button class="action-btn" @click="toggleSection('socialLinks')">
          <i class="fas fa-share-alt"></i> Redes Sociales
        </button>
      </div>
      
      <div v-if="showChangePassword" class="security-settings">
        <input type="password" v-model="currentPassword" placeholder="Contraseña Actual" :class="{ 'dark-mode': isDarkMode }" />
        <input type="password" v-model="newPassword" placeholder="Nueva Contraseña" :class="{ 'dark-mode': isDarkMode }" />
        <input type="password" v-model="confirmNewPassword" placeholder="Confirmar Nueva Contraseña" :class="{ 'dark-mode': isDarkMode }" />
        <button class="action-btn" @click="changePassword">Guardar Contraseña</button>
      </div>
      
      <div v-if="showSocialLinks" class="social-links">
        <input type="text" v-model="facebookLink" placeholder="Facebook URL" :class="{ 'dark-mode': isDarkMode }" />
        <input type="text" v-model="twitterLink" placeholder="Twitter URL" :class="{ 'dark-mode': isDarkMode }" />
        <input type="text" v-model="linkedinLink" placeholder="LinkedIn URL" :class="{ 'dark-mode': isDarkMode }" />
        <button class="action-btn" @click="saveSocialLinks">Guardar Enlaces</button>
      </div>
      
      <div class="save-button-container">
        <button class="save-btn" @click="saveProfile">Guardar Cambios</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useConfigStore } from '../stores/configStore';

const configStore = useConfigStore();
const profilePic = ref(new URL('../assets/perfil.png', import.meta.url).href);
const userName = ref(configStore.userName);
const userEmail = ref(configStore.userEmail);
const userPhone = ref('+01 234 567 000');
const userBio = ref('Esta es mi biografía...');
const isDarkMode = ref(configStore.isDarkMode);
const notifications = ref(configStore.notifications);
const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');
const facebookLink = ref('');
const twitterLink = ref('');
const linkedinLink = ref('');

const editingName = ref(false);
const editingEmail = ref(false);
const editingPhone = ref(false);
const editingBio = ref(false);
const showChangePassword = ref(false);
const showSocialLinks = ref(false);

const toggleEditing = (field) => {
  if (field === 'name') editingName.value = true;
  else if (field === 'email') editingEmail.value = true;
  else if (field === 'phone') editingPhone.value = true;
  else if (field === 'bio') editingBio.value = true;
};

const toggleSection = (section) => {
  if (section === 'changePassword') showChangePassword.value = !showChangePassword.value;
  else if (section === 'socialLinks') showSocialLinks.value = !showSocialLinks.value;
};

const updateProfilePic = (event) => {
  const file = event.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    profilePic.value = url;
    configStore.setProfilePic(url);
  }
};

const toggleDarkMode = () => {
  configStore.toggleDarkMode();
  isDarkMode.value = configStore.isDarkMode;
};

const changePassword = () => {
  if (newPassword.value === confirmNewPassword.value) {
    // Lógica para cambiar la contraseña
    alert('Contraseña cambiada con éxito');
  } else {
    alert('Las contraseñas no coinciden');
  }
};

const saveSocialLinks = () => {
  // Lógica para guardar los enlaces de redes sociales
  alert('Enlaces de redes sociales guardados con éxito');
};

const saveProfile = () => {
  configStore.userName = userName.value;
  configStore.userEmail = userEmail.value;
  configStore.saveSettings();
  alert('Perfil guardado con éxito');
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.profile-container {
  padding: 20px;
  background: #f5f7fa;
  height: 100vh;
  transition: background 0.3s, color 0.3s;
  color: #2c3e50;
}
.profile-container.dark-mode {
  background: #2c3e50;
  color: #ecf0f1;
}
.profile-card {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  margin: 20px auto; /* Adjusted margin to move the card higher */
  transition: background 0.3s, color 0.3s;
  position: relative;
  top: -20px; /* Move the card higher */
}
.profile-card.dark-mode {
  background: #34495e;
  color: #ecf0f1;
}
.profile-pic-wrapper {
  position: relative;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px 0;
  object-fit: cover;
}
.profile-pic-wrapper input {
  display: none;
}
.detail-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}
.detail-label {
  flex: 0 0 100px;
  font-weight: bold;
}
.detail-row input, .detail-row textarea {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.detail-row input.dark-mode, .detail-row textarea.dark-mode {
  background: #2c3e50;
  color: #ecf0f1;
  border: 1px solid #95a5a6;
}
.edit-button {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.2em;
  transition: color 0.3s;
}
.edit-button:hover {
  color: #3498db;
}
.preferences, .security-settings, .social-links {
  margin: 20px 0;
}
.preference-item, .security-settings input, .social-links input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.preference-item input.dark-mode, .security-settings input.dark-mode, .social-links input.dark-mode {
  background: #2c3e50;
  color: #ecf0f1;
  border: 1px solid #95a5a6;
}
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #4caf50;
}
input:checked + .slider:before {
  transform: translateX(20px);
}
.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}
.action-btn, .save-btn {
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, border 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.action-btn:hover, .save-btn:hover {
  background: #2980b9;
}
.action-btn:focus, .save-btn:focus {
  outline: none;
}
.action-btn.dark-mode, .save-btn.dark-mode {
  background: #2980b9;
  border: 1px solid #3498db;
}
.save-button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.save-btn {
  background: #4caf50;
}
.save-btn:hover {
  background: #45a049;
}
.save-btn.dark-mode {
  background: #45a049;
  border: 1px solid #4caf50;
}
</style>