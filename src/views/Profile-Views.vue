<template>
  <div class="profile-container" :class="{ 'dark-mode': isDarkMode }">
    <h1 class="header-title">
      <i class="fas fa-chalkboard-teacher"></i>
      Perfil del Profesor
    </h1>
    
    <main class="profile-card">
      <!-- Sección Avatar -->
      <section class="profile-section avatar-section">
        <label class="avatar-upload">
          <input type="file" accept="image/*" @change="updateProfilePic" />
          <img :src="profilePic" alt="Avatar del profesor" class="avatar" />
          <span class="upload-overlay">
            <i class="fas fa-camera"></i>
          </span>
        </label>
        <h3 class="user-name">{{ userDetails.name.value }}</h3>
        <p class="user-role">Profesor de {{ userDetails.subjects.value }}</p>
      </section>

      <!-- Sección Detalles -->
      <section class="profile-section details-section">
        <h2 class="section-title">
          <i class="fas fa-user-edit"></i>
          Información Personal
        </h2>
        
        <div class="detail-grid">
          <div v-for="(detail, key) in editableDetails" :key="key" class="detail-item">
            <label :for="`input-${key}`" class="detail-label">
              {{ detail.label }}
              <button 
                class="edit-icon" 
                @click="toggleEditing(key)"
                :aria-label="`Editar ${detail.label}`"
              >
                <i class="fas fa-pencil-alt"></i>
              </button>
            </label>
            
            <template v-if="!detail.editing">
              <div class="detail-value">{{ detail.value || '-' }}</div>
            </template>
            
            <template v-else>
              <input
                v-if="detail.type !== 'select' && detail.type !== 'textarea'"
                :type="detail.type || 'text'"
                :id="`input-${key}`"
                v-model="detail.value"
                class="detail-input"
                @blur="detail.editing = false"
              />
              
              <select
                v-if="detail.type === 'select'"
                :id="`input-${key}`"
                v-model="detail.value"
                class="detail-input"
                @blur="detail.editing = false"
              >
                <option v-for="option in genderOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              
              <textarea
                v-if="detail.type === 'textarea'"
                :id="`input-${key}`"
                v-model="detail.value"
                class="detail-input"
                @blur="detail.editing = false"
                rows="3"
              ></textarea>
            </template>
          </div>
        </div>
      </section>

      <!-- Sección Preferencias -->
      <section class="profile-section preferences-section">
        <h2 class="section-title">
          <i class="fas fa-cog"></i>
          Preferencias
        </h2>
        
        <div class="preferences-grid">
          <div class="preference-item">
            <label>Modo Oscuro</label>
            <div class="toggle-switch">
              <input 
                type="checkbox" 
                v-model="isDarkMode" 
                @change="toggleDarkMode"
                id="darkModeToggle"
              />
              <span class="slider"></span>
            </div>
          </div>
          <div class="preference-item">
            <label>Notificaciones</label>
            <div class="toggle-switch">
              <input 
                type="checkbox" 
                v-model="notifications"
                id="notificationsToggle"
              />
              <span class="slider"></span>
            </div>
          </div>
        </div>
      </section>

      <!-- Sección Contraseña -->
      <section class="accordion-section">
        <div class="accordion-header" @click="toggleSection('changePassword')">
          <i class="fas fa-key"></i>
          <h3>Cambiar Contraseña</h3>
          <i class="fas" :class="showChangePassword ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </div>
        <transition name="slide-down">
          <div v-if="showChangePassword" class="accordion-content">
            <div class="password-form">
              <input
                type="password"
                v-model="currentPassword"
                placeholder="Contraseña actual"
                class="form-input"
              />
              <input
                type="password"
                v-model="newPassword"
                placeholder="Nueva contraseña"
                class="form-input"
              />
              <input
                type="password"
                v-model="confirmNewPassword"
                placeholder="Confirmar contraseña"
                class="form-input"
              />
              <button class="btn primary" @click="changePassword">
                <i class="fas fa-save"></i>
                Guardar Contraseña
              </button>
            </div>
          </div>
        </transition>
      </section>

      <!-- Sección Redes Sociales -->
      <section class="accordion-section">
        <div class="accordion-header" @click="toggleSection('socialLinks')">
          <i class="fas fa-share-alt"></i>
          <h3>Redes Sociales</h3>
          <i class="fas" :class="showSocialLinks ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </div>
        <transition name="slide-down">
          <div v-if="showSocialLinks" class="accordion-content">
            <div class="social-links-form">
              <input
                type="url"
                v-model="facebookLink"
                placeholder="URL de Facebook"
                class="form-input"
              />
              <input
                type="url"
                v-model="twitterLink"
                placeholder="URL de Twitter"
                class="form-input"
              />
              <input
                type="url"
                v-model="linkedinLink"
                placeholder="URL de LinkedIn"
                class="form-input"
              />
              <button class="btn primary" @click="saveSocialLinks">
                <i class="fas fa-save"></i>
                Guardar Enlaces
              </button>
            </div>
          </div>
        </transition>
      </section>

      <!-- Acciones Principales -->
      <div class="action-bar">
        <button class="btn secondary" @click="resetChanges">
          <i class="fas fa-undo"></i>
          Restablecer
        </button>
        <button class="btn primary" @click="saveProfile">
          <i class="fas fa-save"></i>
          Guardar Cambios
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const profilePic = ref('https://via.placeholder.com/150');
const isDarkMode = ref(false);
const notifications = ref(true);
const showChangePassword = ref(false);
const showSocialLinks = ref(false);

const userDetails = ref({
  name: { label: 'Nombre completo', value: 'Ana María López', editing: false },
  email: { label: 'Correo electrónico', value: 'ana.lopez@example.com', editing: false, type: 'email' },
  phone: { label: 'Teléfono', value: '+34 612 345 678', editing: false, type: 'tel' },
  gender: { label: 'Género', value: 'Femenino', editing: false, type: 'select' },
  bio: { label: 'Biografía', value: 'Profesora de Historia apasionada por la enseñanza...', editing: false, type: 'textarea' },
  subjects: { label: 'Asignaturas', value: 'Historia, Geografía, Arte', editing: false }
});

const genderOptions = ['Femenino', 'Masculino', 'Otro', 'Prefiero no decir'];
const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');
const facebookLink = ref('');
const twitterLink = ref('');
const linkedinLink = ref('');

const editableDetails = computed(() => 
  Object.entries(userDetails.value)
    .filter(([key]) => !['subjects'].includes(key))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
);

const toggleEditing = (key) => {
  userDetails.value[key].editing = !userDetails.value[key].editing;
};

const toggleSection = (section) => {
  if (section === 'changePassword') {
    showChangePassword.value = !showChangePassword.value;
  } else {
    showSocialLinks.value = !showSocialLinks.value;
  }
};

const updateProfilePic = (event) => {
  const file = event.target.files[0];
  if (file) {
    profilePic.value = URL.createObjectURL(file);
  }
};

const toggleDarkMode = () => {
  // Agregamos o quitamos la clase 'dark-mode' al elemento raíz
  document.documentElement.classList.toggle('dark-mode', isDarkMode.value);
};

const changePassword = () => {
  if (newPassword.value === confirmNewPassword.value) {
    alert('Contraseña actualizada correctamente');
    showChangePassword.value = false;
  } else {
    alert('Las contraseñas no coinciden');
  }
};

const saveSocialLinks = () => {
  alert('Enlaces sociales guardados');
  showSocialLinks.value = false;
};

const resetChanges = () => {
  Object.values(userDetails.value).forEach(detail => {
    if (detail.editing) detail.editing = false;
  });
};

const saveProfile = () => {
  alert('Perfil guardado exitosamente');
};
</script>

<style scoped lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --secondary: #4f46e5;
  --bg-light: #f8fafc;
  --bg-dark: #1e293b;
  --text-light: #ffffff;
  --text-dark: #0f172a;
  --border-color: #e2e8f0;
  --radius-md: 8px;
  --radius-lg: 12px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --transition: all 0.3s ease;
}

.dark-mode {
  --bg-light: #1e293b;
  --text-dark: #f8fafc;
  --border-color: #334155;
}

.profile-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--bg-light);
  color: var(--text-dark);
  transition: var(--transition);
}

.header-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.profile-card {
  background: var(--bg-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 2rem;
  display: grid;
  gap: 2rem;
}

.avatar-section {
  text-align: center;
  .avatar-upload {
    position: relative;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    
    .avatar {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 3px solid var(--primary);
      transition: var(--transition);
    }
    
    .upload-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: var(--transition);
      
      .fa-camera {
        color: white;
        font-size: 1.5rem;
      }
    }
    
    &:hover .upload-overlay {
      opacity: 1;
    }
    
    input[type="file"] {
      display: none;
    }
  }
  
  .user-name {
    margin: 1rem 0 0.5rem;
    font-size: 1.5rem;
  }
  
  .user-role {
    color: #64748b;
    margin: 0;
  }
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.detail-item {
  padding: 1rem;
  background: rgba(var(--primary), 0.05);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.detail-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.edit-icon {
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  padding: 0.25rem;
  
  &:hover {
    color: var(--primary-dark);
  }
}

.detail-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-light);
  color: var(--text-dark);
  transition: var(--transition);
}

.preferences-grid {
  display: grid;
  gap: 1rem;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + .slider {
      background-color: var(--primary);
    }
    
    &:checked + .slider:before {
      transform: translateX(24px);
    }
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: var(--transition);
    border-radius: 24px;
    
    &:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: var(--transition);
      border-radius: 50%;
    }
  }
}

.accordion-section {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  
  .accordion-header {
    display: flex;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
    gap: 0.75rem;
    
    h3 {
      margin: 0;
      flex-grow: 1;
    }
  }
  
  .accordion-content {
    padding: 1rem;
    border-top: 1px solid var(--border-color);
  }
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.3s ease;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 500px;
}

.action-bar {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
  
  &.primary {
    background-color: var(--primary);
    color: white;
    
    &:hover {
      background-color: var(--primary-dark);
    }
  }
  
  &.secondary {
    background-color: #e2e8f0;
    color: var(--text-dark);
    
    &:hover {
      background-color: #cbd5e1;
    }
  }
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-light);
  color: var(--text-dark);
}

@media (max-width: 768px) {
  .profile-container {
    padding: 1rem;
  }
  
  .profile-card {
    padding: 1rem;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .action-bar {
    flex-direction: column;
  }
}
</style>
