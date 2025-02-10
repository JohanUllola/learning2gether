<template>
    <div class="flex h-screen bg-gray-100">
      <!-- Panel de Conversaciones -->
      <div class="w-1/3 bg-white shadow-lg p-4 overflow-y-auto">
        <h2 class="text-xl font-bold text-gray-700 mb-4">Mensajes</h2>
        
        <div v-for="(chat, index) in chats" :key="index" 
             class="flex items-center p-3 cursor-pointer hover:bg-gray-200 rounded-lg transition"
             @click="selectChat(index)">
          <img :src="chat.image" class="w-12 h-12 rounded-full mr-3 object-cover">
          <div class="flex-1">
            <h3 class="font-semibold text-gray-800">{{ chat.name }}</h3>
            <p class="text-gray-500 text-sm truncate">{{ chat.lastMessage }}</p>
          </div>
        </div>
      </div>
  
      <!-- Panel de Chat -->
      <div class="w-2/3 flex flex-col bg-white shadow-lg">
        <div v-if="selectedChat !== null" class="flex flex-col h-full">
          <!-- Header del chat -->
          <div class="bg-blue-500 text-white p-4 flex items-center">
            <img :src="chats[selectedChat].image" class="w-10 h-10 rounded-full mr-3 object-cover">
            <h2 class="text-lg font-semibold">{{ chats[selectedChat].name }}</h2>
          </div>
  
          <!-- Mensajes -->
          <div class="flex-1 p-4 overflow-y-auto">
            <div v-for="(msg, index) in chats[selectedChat].messages" :key="index"
                 class="mb-2 flex" :class="msg.sender === 'me' ? 'justify-end' : 'justify-start'">
              <p class="px-4 py-2 rounded-lg text-white" 
                 :class="msg.sender === 'me' ? 'bg-blue-500' : 'bg-gray-400'">
                {{ msg.text }}
              </p>
            </div>
          </div>
  
          <!-- Input de mensaje -->
          <div class="p-3 bg-gray-200 flex items-center">
            <input v-model="newMessage" @keyup.enter="sendMessage"
                   class="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none"
                   placeholder="Escribe un mensaje...">
            <button @click="sendMessage" class="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg">Enviar</button>
          </div>
        </div>
  
        <div v-else class="flex items-center justify-center flex-1 text-gray-500">
          <p>Selecciona un chat para comenzar</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedChat: null,
        newMessage: "",
        chats: [
          {
            name: "Ana López",
            image: "/src/assets/ana.png",
            lastMessage: "Nos vemos mañana!",
            messages: [
              { text: "Hola!", sender: "other" },
              { text: "¿Cómo estás?", sender: "other" },
              { text: "Todo bien, gracias!", sender: "me" }
            ]
          },
          {
            name: "Carlos Pérez",
            image: "/src/assets/carlos.png",
            lastMessage: "Dale, hablamos luego!",
            messages: [
              { text: "¿Viste el correo?", sender: "me" },
              { text: "Sí, lo reviso ahora", sender: "other" }
            ]
          }
        ]
      };
    },
    methods: {
      selectChat(index) {
        this.selectedChat = index;
      },
      sendMessage() {
        if (this.newMessage.trim() === "") return;
        this.chats[this.selectedChat].messages.push({ text: this.newMessage, sender: "me" });
        this.newMessage = "";
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  