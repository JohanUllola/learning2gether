<template>
  <div class="message-view">
    <h2 class="header-title">Estudiantes Disponibles 📧</h2>
    <div class="students-list">
      <div v-for="student in students" :key="student.id" class="student-card">
        <div class="card-header">
          <i class="fas fa-user-graduate card-icon"></i>
          <h3 class="card-title">{{ student.name }}</h3>
        </div>
        <p class="student-status">
          <i :class="['fas', student.status === 'online' ? 'fa-circle text-online' : 'fa-circle text-offline']"></i>
          {{ student.status === 'online' ? 'En línea' : 'Desconectado' }}
        </p>
        <button class="send-message-button" @click="selectStudent(student)">
          <i class="fas fa-paper-plane"></i> Enviar Mensaje
        </button>
      </div>
    </div>

    <div v-if="selectedStudent" class="conversation-float" ref="conversationFloat">
      <div class="conversation-header" ref="dragHandle">
        <h2 class="conversation-title">Conversación con {{ selectedStudent.name }}</h2>
        <button class="close-button" @click="closeConversation">
          <i class="fas fa-times"></i>
        </button>
      </div>
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
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useUserStore } from '../stores/user';

const route = useRoute();
const students = ref([
  { id: 1, name: "Joan Manuel", status: "online" },
  { id: 2, name: "Jose Luis", status: "offline" },
  { id: 3, name: "Jenifer", status: "online" },
  { id: 4, name: "Laydi", status: "offline" },
  { id: 5, name: "Verzan", status: "online" },
  { id: 6, name: "Modesto", status: "offline" }
]);

const selectedStudent = ref(null);
const messages = ref([]);
const newMessage = ref('');
const messagesContainer = ref(null);
const conversationFloat = ref(null);
const dragHandle = ref(null);
const userStore = useUserStore();
const currentUserId = userStore.userData ? userStore.userData.uid : 'teacherId';

let unsubscribe = null;

const selectStudent = (student) => {
  selectedStudent.value = student;
  const conversationId = `${currentUserId}-${student.id}`;
  loadMessages(conversationId);
  nextTick(makeDraggable);
};

const loadMessages = (conversationId) => {
  if (unsubscribe) unsubscribe();
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
};

const closeConversation = () => {
  selectedStudent.value = null;
  messages.value = [];
  if (unsubscribe) unsubscribe();
};

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});

const sendMessage = async () => {
  if (newMessage.value.trim() === '' || !selectedStudent.value) return;
  const conversationId = `${currentUserId}-${selectedStudent.value.id}`;
  await addDoc(collection(db, 'messages'), {
    conversationId,
    sender: currentUserId,
    text: newMessage.value,
    timestamp: serverTimestamp()
  });
  newMessage.value = '';
  scrollToBottom();
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

const makeDraggable = () => {
  const element = conversationFloat.value;
  const handle = dragHandle.value;
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  handle.addEventListener('mousedown', (e) => {
    offsetX = e.clientX - element.getBoundingClientRect().left;
    offsetY = e.clientY - element.getBoundingClientRect().top;
    isDragging = true;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";

.message-view {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: #f9fafb;
  font-family: 'Fira Sans', sans-serif;

  .header-title {
    text-align: center;
    font-size: 2rem;
    color: #4f46e5;
    margin-bottom: 1.5rem;
  }

  .students-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .student-card {
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    padding: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0,0,0,0.15);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .card-icon {
        font-size: 2rem;
        color: #3b82f6;
      }

      .card-title {
        font-size: 1.25rem;
        color: #1e293b;
        margin: 0;
      }
    }

    .student-status {
      font-size: 1rem;
      color: #4b5563;

      .text-online {
        color: #34d399;
      }

      .text-offline {
        color: #d1d5db;
      }

      i {
        margin-right: 0.5rem;
      }
    }

    .send-message-button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1rem;
      background: #10b981;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      gap: 0.5rem;
      transition: background 0.3s ease;

      i {
        font-size: 1rem;
      }

      &:hover {
        background: darken(#10b981, 10%);
      }
    }
  }

  .conversation-float {
    position: fixed;
    bottom: 10%;
    right: 10%;
    width: 300px;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    border-radius: 15px;
    padding: 1rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    resize: both;
    overflow: auto;

    .conversation-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: move;

      .conversation-title {
        font-size: 1rem;
        color: #4f46e5;
      }

      .close-button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        color: #6b7280;

        &:hover {
          color: #4f46e5;
        }
      }
    }

    .messages-container {
      flex-grow: 1;
      overflow-y: auto;
      padding: 0.5rem;
      margin-top: 0.5rem;
    }

    .message {
      margin-bottom: 0.75rem;
      max-width: 70%;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      position: relative;
      font-size: 0.9rem;
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
      padding: 0.5rem 0;

      input {
        flex-grow: 1;
        padding: 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 0.9rem;
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
  }
}
</style>