<template>
  <div class="config-wrapper" :class="{'dark-mode': configStore.isDarkMode}">
    <div class="config-card">
      <h2 class="config-title">Configuración</h2>

      <!-- Tarjeta de Perfil -->
      <div class="profile-card card">
        <div class="profile-pic-wrapper">
          <label for="profilePic" class="profile-pic-label">
            <img :src="configStore.profilePic" alt="Perfil" class="profile-pic" />
            <input id="profilePic" type="file" @change="updateProfilePic" class="profile-pic-input" />
          </label>
        </div>
        <div class="profile-details">
          <div class="detail-row">
            <h3 class="detail-title">
              <span v-if="!editingName">{{ configStore.userName }}</span>
              <input
                v-else
                v-model="configStore.userName"
                @blur="editingName = false"
                class="detail-input"
              />
            </h3>
            <button @click="toggleEditing('name')" class="edit-btn" title="Editar nombre">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                  d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM4 12v4h4l10-10-4-4L4 12z"
                />
              </svg>
            </button>
          </div>
          <div class="detail-row">
            <p class="detail-text">
              <span v-if="!editingEmail">{{ configStore.userEmail }}</span>
              <input
                v-else
                v-model="configStore.userEmail"
                @blur="editingEmail = false"
                class="detail-input"
              />
            </p>
            <button @click="toggleEditing('email')" class="edit-btn" title="Editar email">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                  d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM4 12v4h4l10-10-4-4L4 12z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Tarjeta de Preferencias -->
      <div class="preferences-card card">
        <h3 class="preferences-title">Preferencias</h3>
        <div class="preference-row">
          <span>Modo Oscuro</span>
          <label class="switch">
            <input type="checkbox" :checked="configStore.isDarkMode" @change="toggleDarkMode" />
            <span class="slider"></span>
          </label>
        </div>
        <div class="preference-row">
          <span>Notificaciones</span>
          <label class="switch">
            <input type="checkbox" v-model="configStore.notifications" />
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <!-- Tarjeta de Información Adicional -->
      <div class="additional-card card">
        <h3 class="additional-title">Información Adicional</h3>
        <div class="detail-row">
          <p class="additional-text">
            <span v-if="!editingText">{{ additionalText }}</span>
            <input
              v-else
              v-model="additionalText"
              @blur="editingText = false"
              class="detail-input"
            />
          </p>
          <button @click="toggleEditing('text')" class="edit-btn" title="Editar texto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM4 12v4h4l10-10-4-4L4 12z"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Botón Guardar Cambios -->
      <button @click="saveSettings" class="save-btn">Guardar Cambios</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useConfigStore } from "../stores/configStore"; // Asegúrate de que el store esté en esta ruta

export default defineComponent({
  name: "ConfigurationView",
  setup() {
    const configStore = useConfigStore();
    const editingName = ref(false);
    const editingEmail = ref(false);
    const editingText = ref(false);
    const additionalText = ref("Este es un texto adicional editable");

    const toggleEditing = (field) => {
      if (field === "name") editingName.value = true;
      else if (field === "email") editingEmail.value = true;
      else if (field === "text") editingText.value = true;
    };

    const toggleDarkMode = () => {
      configStore.toggleDarkMode();
    };

    const updateProfilePic = (event) => {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        configStore.setProfilePic(url);
      }
    };

    const saveSettings = () => {
      configStore.saveSettings();
      alert("Configuración guardada con éxito");
    };

    return {
      configStore,
      editingName,
      editingEmail,
      editingText,
      additionalText,
      toggleEditing,
      toggleDarkMode,
      updateProfilePic,
      saveSettings,
    };
  },
});
</script>

<style lang="scss" scoped>
/* Variables de colores y estilos */
$bg-light: #f5f7fa;
$bg-dark: #2c3e50; // Fondo general en modo oscuro (igual que en Profile-Views)
$card-bg: #ffffff;
$card-dark-bg: #34495e; // Fondo de tarjeta en modo oscuro (igual que en Profile-Views)
$text-color: #333333;
$text-dark-color: #ecf0f1; // Texto en modo oscuro (igual que en Profile-Views)
$primary-color: #4caf50;
$shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
$radius: 10px;

/* Contenedor principal */
.config-wrapper {
  background-color: $bg-light;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.dark-mode {
    background-color: $bg-dark;
  }
}

/* Tarjeta principal */
.config-card {
  background-color: $card-bg;
  border-radius: $radius;
  box-shadow: $shadow;
  padding: 20px;
  width: 100%;
  max-width: 600px;
  transition: background-color 0.3s, color 0.3s;

  .config-title {
    text-align: center;
    font-size: 1.8em;
    color: $text-color;
    margin-bottom: 20px;
    transition: color 0.3s;
  }
}

/* Estilos generales para las tarjetas internas */
.card {
  background-color: lighten($card-bg, 5%);
  border-radius: $radius;
  box-shadow: $shadow;
  padding: 15px;
  margin-bottom: 20px;
  transition: background-color 0.3s, color 0.3s;
}

/* Modo oscuro para tarjetas y textos, alineado con Profile-Views */
.config-wrapper.dark-mode {
  .config-card {
    background-color: $card-dark-bg;
    .config-title {
      color: $text-dark-color;
    }
    .card {
      background-color: $card-dark-bg;
      .detail-title,
      .detail-text,
      .preferences-title,
      .additional-title,
      .additional-text {
        color: $text-dark-color;
      }
      .detail-input {
        color: $text-dark-color;
        border-bottom: 1px solid $text-dark-color;
      }
    }
  }
}

/* Tarjeta de perfil */
.profile-card {
  display: flex;
  align-items: center;

  .profile-pic-wrapper {
    position: relative;

    .profile-pic {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 3px solid $primary-color;
      object-fit: cover;
    }

    .profile-pic-input {
      display: none;
    }
  }

  .profile-details {
    margin-left: 20px;

    .detail-row {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      .detail-title {
        font-size: 1.2em;
        color: $text-color;
        transition: color 0.3s;
      }

      .detail-text {
        font-size: 0.95em;
        color: $text-color;
        transition: color 0.3s;
      }

      .detail-input {
        border: none;
        border-bottom: 1px solid $text-color;
        background: transparent;
        color: $text-color;
        font-size: inherit;
        transition: color 0.3s, border-bottom-color 0.3s;
        &:focus {
          outline: none;
          border-bottom-color: $primary-color;
        }
      }

      .edit-btn {
        background: none;
        border: none;
        margin-left: 10px;
        cursor: pointer;
        svg {
          width: 20px;
          height: 20px;
          fill: $primary-color;
          transition: fill 0.3s;
        }
        &:hover svg {
          fill: darken($primary-color, 10%);
        }
      }
    }
  }
}

/* Tarjeta de Preferencias */
.preferences-card {
  .preferences-title {
    font-size: 1.1em;
    color: $text-color;
    margin-bottom: 10px;
    transition: color 0.3s;
  }
  .preference-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    span {
      color: $text-color;
      transition: color 0.3s;
    }

    .switch {
      position: relative;
      width: 40px;
      height: 20px;
      input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .slider {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        border-radius: 20px;
        transition: 0.4s;
        &:before {
          content: "";
          position: absolute;
          height: 14px;
          width: 14px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          border-radius: 50%;
          transition: 0.4s;
        }
      }
      input:checked + .slider {
        background-color: $primary-color;
      }
      input:checked + .slider:before {
        transform: translateX(20px);
      }
    }
  }
}

/* Tarjeta de Información Adicional */
.additional-card {
  .additional-title {
    font-size: 1.1em;
    color: $text-color;
    margin-bottom: 10px;
    transition: color 0.3s;
  }
  .additional-text {
    font-size: 0.95em;
    color: $text-color;
    transition: color 0.3s;
  }
  .detail-row {
    display: flex;
    align-items: center;

    .detail-input {
      border: none;
      border-bottom: 1px solid $text-color;
      background: transparent;
      color: $text-color;
      font-size: inherit;
      transition: color 0.3s, border-bottom-color 0.3s;
      &:focus {
        outline: none;
        border-bottom-color: $primary-color;
      }
    }
    .edit-btn {
      background: none;
      border: none;
      margin-left: 10px;
      cursor: pointer;
      svg {
        width: 20px;
        height: 20px;
        fill: $primary-color;
        transition: fill 0.3s;
      }
      &:hover svg {
        fill: darken($primary-color, 10%);
      }
    }
  }
}

/* Botón de Guardar Cambios */
.save-btn {
  width: 100%;
  padding: 10px;
  background-color: $primary-color;
  border: none;
  border-radius: $radius;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
</style>