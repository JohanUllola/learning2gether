<template>
    <div class="bg-gray-100 min-h-screen p-8">
      <h1 class="text-center text-3xl font-bold text-gray-700 mb-6">Mis Amigos</h1>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        <div v-for="(friend, index) in friends" :key="index" class="bg-white p-4 rounded-2xl shadow-lg text-center w-64">
          <img :src="friend.image" :alt="friend.name" class="w-24 h-24 rounded-full mx-auto border-4 object-cover"
               :class="friend.online ? 'border-green-500' : 'border-gray-400'">
          <h2 class="text-xl font-semibold mt-4">{{ friend.name }}</h2>
          <p class="text-sm mt-1" :class="friend.online ? 'text-green-500' : 'text-gray-500'">
            {{ friend.online ? "🟢 En línea" : "⚪ Desconectado" }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        friends: [
          { name: "Ana López", image: "/src/assets/ana.png", online: true },
          { name: "Carlos Pérez", image: "/src/assets/carlos.png", online: false },
          { name: "María Sánchez", image: "/src/assets/maria.png", online: true },
          { name: "José Ramírez", image: "/src/assets/jose.png", online: false }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  </style>
  