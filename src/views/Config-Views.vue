<template>
  <div class="config-wrapper" :class="{'dark-mode': configStore.isDarkMode}">
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
          <span>Nivel de Dificultad</span>
          <select v-model="configStore.difficultyLevel" class="difficulty-select">
            <option value="easy">Fácil</option>
            <option value="medium">Medio</option>
            <option value="hard">Difícil</option>
          </select>
        </div>
        <div class="preference-row">
          <span>Categorías Favoritas</span>
          <div class="categories-select">
            <label>
              <input type="checkbox" v-model="configStore.favoriteCategories" value="math" />
              Matemáticas
            </label>
            <label>
              <input type="checkbox" v-model="configStore.favoriteCategories" value="language" />
              Lenguaje
            </label>
            <label>
              <input type="checkbox" v-model="configStore.favoriteCategories" value="science" />
              Ciencias
            </label>
          </div>
        </div>
        <div class="preference-row">
          <span>Tiempo de Juego Diario</span>
          <input type="number" v-model="configStore.dailyPlayTime" class="playtime-input" min="0" />
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
    const editingText = ref(false);
    const additionalText = ref("Este es un texto adicional editable");

    const toggleEditing = (field) => {
      if (field === "text") editingText.value = true;
    };

    const toggleDarkMode = () => {
      configStore.toggleDarkMode();
    };

    const saveSettings = () => {
      configStore.saveSettings();
      alert("Configuración guardada con éxito");
    };

    return {
      configStore,
      editingText,
      additionalText,
      toggleEditing,
      toggleDarkMode,
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
$transition: 0.3s ease-in-out;

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Contenedor principal */
.config-wrapper {
  background-color: $bg-light;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn $transition;

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
  transition: background-color $transition, color $transition;
  animation: slideIn $transition;

  .config-title {
    text-align: center;
    font-size: 1.8em;
    color: $text-color;
    margin-bottom: 20px;
    transition: color $transition;
  }
}

/* Estilos generales para las tarjetas internas */
.card {
  background-color: lighten($card-bg, 5%);
  border-radius: $radius;
  box-shadow: $shadow;
  padding: 15px;
  margin-bottom: 20px;
  transition: background-color $transition, color $transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
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
      .preferences-title,
      .additional-title,
      .additional-text {
        color: $text-dark-color;
      }
      .detail-input {
        color: $text-dark-color;
        border-bottom: 1px solid $text-dark-color;
      }
      span, label {
        color: $text-dark-color;
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
    transition: color $transition;
  }
  .preference-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    span {
      color: $text-color;
      transition: color $transition;
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
  .difficulty-select {
    width: 100%;
    padding: 5px;
    border-radius: $radius;
    border: 1px solid $text-color;
    background: transparent;
    color: $text-color;
    transition: color $transition, border-color $transition;
    &:focus {
      outline: none;
      border-color: $primary-color;
    }
    &.dark-mode {
      border-color: $text-dark-color;
      color: $text-dark-color;
    }
  }
  .categories-select {
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 5px;
      color: $text-color;
      transition: color $transition;
      input {
        margin-right: 5px;
      }
    }
  }
  .playtime-input {
    width: 100%;
    padding: 5px;
    border-radius: $radius;
    border: 1px solid $text-color;
    background: transparent;
    color: $text-color;
    transition: color $transition, border-color $transition;
    &:focus {
      outline: none;
      border-color: $primary-color;
    }
    &.dark-mode {
      border-color: $text-dark-color;
      color: $text-dark-color;
    }
  }
}

/* Tarjeta de Información Adicional */
.additional-card {
  .additional-title {
    font-size: 1.1em;
    color: $text-color;
    margin-bottom: 10px;
    transition: color $transition;
  }
  .additional-text {
    font-size: 0.95em;
    color: $text-color;
    transition: color $transition;
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
      transition: color $transition, border-bottom-color $transition;
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
        transition: fill $transition;
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
  transition: background-color $transition;
  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
</style>