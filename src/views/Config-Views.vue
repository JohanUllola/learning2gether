<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-center">
    <div class="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Configuración</h2>

      <!-- Sección de Perfil -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Perfil</h3>
        <div class="flex items-center mb-3">
          <img src="/src/assets/perfil.png" alt="Perfil" class="w-16 h-16 rounded-full border-2 border-blue-500">
          <div class="ml-4">
            <p class="font-medium text-gray-800">Juan Pérez</p>
            <p class="text-gray-500 text-sm">juanperez@email.com</p>
          </div>
        </div>
        <label class="block text-gray-700">Actualizar Nombre:</label>
        <input v-model="userName" class="w-full p-2 border rounded-lg mt-1" type="text" placeholder="Nuevo nombre">
      </div>

      <!-- Sección de Preferencias -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Preferencias</h3>
        <div class="flex justify-between items-center mb-3">
          <span class="text-gray-700">Modo oscuro</span>
          <label class="switch">
            <input type="checkbox" v-model="darkMode">
            <span class="slider"></span>
          </label>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-700">Notificaciones</span>
          <label class="switch">
            <input type="checkbox" v-model="notifications">
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <!-- Botón Guardar -->
      <button @click="saveSettings" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
        Guardar Cambios
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "Juan Pérez",
      darkMode: false,
      notifications: true
    };
  },
  methods: {
    saveSettings() {
      alert("Configuración guardada con éxito");
    }
  }
};
</script>

<style scoped>
/* Estilo para los interruptores */
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
  transition: .4s;
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
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4CAF50;
}

input:checked + .slider:before {
  transform: translateX(20px);
}
</style>