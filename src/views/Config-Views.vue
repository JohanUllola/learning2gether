<template>
  <div class="config-wrapper" :class="{ 'dark-mode': configStore.isDarkMode }">
    <div class="config-card">
      <h2 class="config-title">Configuración</h2>

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

        <div class="preference-row">
          <span>Volumen de Audio</span>
          <input type="range" v-model="configStore.audioVolume" min="0" max="100" />
        </div>

        <div class="preference-row">
          <span>Idioma</span>
          <select v-model="configStore.language" class="language-select">
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
          </select>
        </div>

        <div class="preference-row">
          <span>Temporizador de Inactividad (min)</span>
          <input type="number" v-model="configStore.inactivityTimer" min="1" max="60" />
        </div>
      </div>

      <!-- Botón Guardar Cambios -->
      <button @click="saveSettings" class="save-btn">Guardar Cambios</button>
    </div>
  </div>
</template>

<script setup>
import { useConfigStore } from '../stores/configStore';

const configStore = useConfigStore();

const toggleDarkMode = () => {
  configStore.toggleDarkMode();
};

const saveSettings = () => {
  configStore.saveSettings();
  alert('Configuración guardada con éxito');
};
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.config-wrapper {
  background-color: $bg-light;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, color 0.3s;

  &.dark-mode {
    background-color: $bg-dark;
    color: white;
  }
}

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
  }
}

/* Estilos de la tarjeta */
.card {
  background-color: lighten($card-bg, 5%);
  border-radius: $radius;
  box-shadow: $shadow;
  padding: 15px;
  margin-bottom: 20px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
}

/* Modo Oscuro */
.dark-mode {
  .card {
    background-color: #1c2a39 !important; // Azul oscuro
    color: white !important;
    border: 1px solid #30475e;
  }

  .preferences-title,
  .preference-row span {
    color: white !important;
  }

  .switch input:checked + .slider {
    background-color: rgb(16, 148, 108) !important;
  }

  /* Corrigiendo inputs en modo oscuro */
  input,
  select {
    background-color: #2a3d55 !important;
    border: 1px solid #547aa5 !important;
    color: white !important;
  }

  input::placeholder {
    color: #b0c4de !important;
  }

  input:focus,
  select:focus {
    outline: none;
    border-color: #61a5c2 !important;
  }

  /* Rango */
  input[type="range"] {
    background: transparent !important;
    accent-color: white !important;
  }

  input[type="range"]::-webkit-slider-thumb {
    background: #61a5c2 !important;
  }
}

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
        transition: background-color 0.4s;

        &:before {
          content: "";
          position: absolute;
          height: 14px;
          width: 14px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          border-radius: 50%;
          transition: transform 0.4s;
        }
      }

      input:checked + .slider {
        background-color: $text-color;
      }

      input:checked + .slider:before {
        transform: translateX(20px);
      }
    }

    .language-select,
    input[type="number"],
    input[type="range"] {
      width: 100%;
      padding: 5px;
      border-radius: $radius;
      border: 1px solid $text-color;
      background: transparent;
      color: $text-color;
      transition: color 0.3s, border-color 0.3s;

      &:focus {
        outline: none;
        border-color: $primary-color;
      }
    }
  }
}

.save-btn {
  width: 100%;
  padding: 10px;
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
