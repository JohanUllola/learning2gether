<template>
  <div class="notification-cards">
    <h2 class="header-title">Notificaciones</h2>
    <div class="cards-container">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="card"
      >
        <div class="card-header">
          <span class="card-icon material-icons">
            {{ notification.icon || 'notifications' }}
          </span>
          <h3 class="card-title">{{ notification.title }}</h3>
        </div>
        <p class="card-message">{{ notification.message }}</p>
        <div class="card-footer">
          <span class="notification-time">
            {{ formatTime(notification.timestamp) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const notifications = ref([
  {
    id: 1,
    title: 'Nuevo Mensaje',
    message: 'Has recibido un mensaje de tu profesor.',
    timestamp: new Date(),
    icon: 'mail_outline'
  },
  {
    id: 2,
    title: 'Logro Desbloqueado',
    message: '¡Felicidades! Has desbloqueado el logro "Primer Paso".',
    timestamp: new Date(),
    icon: 'emoji_events'
  },
  {
    id: 3,
    title: 'Recordatorio',
    message: 'No olvides revisar tus tareas pendientes.',
    timestamp: new Date(),
    icon: 'event_note'
  },
  // Agrega más notificaciones según necesites
]);

const formatTime = (timestamp) => {
  return timestamp instanceof Date
    ? timestamp.toLocaleString()
    : '';
};
</script>

<style scoped lang="scss">
.notification-cards {
  padding: 2rem;
  background: #f1f5f9;
  min-height: 100vh;
  font-family: 'Fira Sans', sans-serif;

  .header-title {
    text-align: center;
    font-size: 2rem;
    color: #4f46e5;
    margin-bottom: 1.5rem;
  }

  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .card {
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .card-icon {
        font-size: 2rem;
        color: #f59e0b;
      }

      .card-title {
        font-size: 1.25rem;
        color: #1e293b;
        margin: 0;
      }
    }

    .card-message {
      font-size: 1rem;
      color: #4b5563;
      margin: 0;
    }

    .card-footer {
      display: flex;
      justify-content: flex-end;
      
      .notification-time {
        font-size: 0.9rem;
        color: #718096;
      }
    }
  }
}
</style>
