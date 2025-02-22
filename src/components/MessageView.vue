<template>
    <div class="message-view">
      <h2 class="conversation-title">Conversación con {{ studentName }}</h2>
      <div class="messages-container" ref="messagesContainer">
        <div
          v-for="message in messages"
          :key="message.id"
          class="message"
          :class="{ sent: message.sender === currentUserId, received: message.sender !== currentUserId }"
        >
          <p class="message-text">{{ message.text }}</p>
          <span class="message-time">{{ formatTime(message.timestamp) }}</span>
        </div>
      </div>
      <div class="message-input-container">
        <input
          type="text"
          v-model="newMessage"
          placeholder="Escribe un mensaje..."
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">Enviar</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { db } from '../firebaseConfig';
  import { collection, query, orderBy, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
  import { useUserStore } from '../stores/user';
  
  const route = useRoute();
  // Se obtiene el conversationId de la ruta, o se define uno por defecto
  const conversationId = route.params.conversationId || 'default';
  const messages = ref([]);
  const newMessage = ref('');
  const messagesContainer = ref(null);
  const userStore = useUserStore();
  const currentUserId = userStore.userData ? userStore.userData.uid : 'teacherId';
  // Puedes definir el nombre del estudiante (o recuperarlo de otro modo)
  const studentName = ref('Estudiante');
  
  let unsubscribe = null;
  
  onMounted(() => {
    const messagesCollection = collection(db, 'messages');
    const q = query(
      messagesCollection,
      where('conversationId', '==', conversationId),
      orderBy('timestamp', 'asc')
    );
    unsubscribe = onSnapshot(q, (snapshot) => {
      messages.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      scrollToBottom();
    });
  });
  
  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });
  
  const sendMessage = async () => {
    if (newMessage.value.trim() === '') return;
    await addDoc(collection(db, 'messages'), {
      conversationId,
      sender: currentUserId,
      text: newMessage.value,
      timestamp: serverTimestamp()
    });
    newMessage.value = '';
  };
  
  const scrollToBottom = () => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  };
  
  const formatTime = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      return timestamp.toDate().toLocaleTimeString();
    }
    return '';
  };
  </script>
  
  <style scoped lang="scss">
  .message-view {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 1rem;
    background: #f9fafb;
    font-family: 'Fira Sans', sans-serif;
  }
  
  .conversation-title {
    text-align: center;
    font-size: 1.8rem;
    color: #4f46e5;
    margin-bottom: 1rem;
  }
  
  .messages-container {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #fff;
    margin-bottom: 1rem;
  }
  
  .message {
    margin-bottom: 0.75rem;
    max-width: 70%;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    position: relative;
    font-size: 1rem;
    line-height: 1.4;
    
    &.sent {
      background: #e0e7ff;
      align-self: flex-end;
    }
    
    &.received {
      background: #f3f4f6;
      align-self: flex-start;
    }
  }
  
  .message-text {
    margin: 0;
  }
  
  .message-time {
    display: block;
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.25rem;
    text-align: right;
  }
  
  .message-input-container {
    display: flex;
    gap: 0.5rem;
    
    input {
      flex-grow: 1;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
    }
    
    button {
      padding: 0.75rem 1rem;
      background: #4f46e5;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s ease;
      
      &:hover {
        background: darken(#4f46e5, 10%);
      }
    }
  }
  </style>
  