<template>
  <div :class="['notification-cards', { 'dark-mode': configStore.isDarkMode }]">
    <h2 class="header-title">
      <span class="title-icon material-icons">notifications</span>
      Notificaciones
      <span class="badge">{{ unreadCount }}</span>
    </h2>

    <div class="scroll-container">
      <div v-if="loading" class="skeleton-container">
        <div v-for="i in 8" :key="i" class="skeleton-card"></div>
      </div>

      <template v-else>
        <div v-if="filteredNotifications.length === 0" class="empty-state">
          <span class="material-icons">notifications_off</span>
          <p>No hay nuevas notificaciones</p>
        </div>

        <div class="cards-container">
          <transition-group name="notification-list" tag="div">
            <div
              v-for="notification in filteredNotifications"
              :key="notification.id"
              :class="['card', { unread: !notification.read }]"
              :style="{ borderLeftColor: typeColors[notification.type] }"
            >
              <div class="card-header">
                <span 
                  class="card-icon material-icons"
                  :style="{ color: typeColors[notification.type] }"
                >
                  {{ notification.icon || typeIcons[notification.type] }}
                </span>
                <div class="header-content">
                  <h3 class="card-title">{{ notification.title }}</h3>
                  <span class="notification-category">
                    {{ typeLabels[notification.type] }}
                  </span>
                </div>
                <button 
                  class="delete-btn"
                  @click="deleteNotification(notification.id)"
                  aria-label="Eliminar notificación"
                >
                  <span class="material-icons">close</span>
                </button>
              </div>
              
              <p class="card-message">{{ notification.message }}</p>
              
              <div class="card-footer">
                <span class="notification-time">
                  {{ timeAgo(notification.timestamp) }}
                </span>
                <button
                  v-if="!notification.read"
                  class="mark-read-btn"
                  @click="toggleRead(notification)"
                  aria-label="Marcar como leída"
                >
                  Marcar como leída
                </button>
              </div>
            </div>
          </transition-group>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useConfigStore } from '../stores/configStore';

const configStore = useConfigStore();

const loading = ref(true);
const notifications = ref([]);

// Tipos de notificaciones
const typeIcons = {
  message: 'chat',
  achievement: 'military_tech',
  reminder: 'event_available',
  alert: 'warning',
  update: 'system_update',
  social: 'group'
};

const typeColors = {
  message: '#3b82f6',
  achievement: '#f59e0b',
  reminder: '#10b981',
  alert: '#ef4444',
  update: '#8b5cf6',
  social: '#ec4899'
};

const typeLabels = {
  message: 'Mensaje',
  achievement: 'Logro',
  reminder: 'Recordatorio',
  alert: 'Alerta',
  update: 'Actualización',
  social: 'Social'
};

// Datos ficticios ampliados
onMounted(() => {
  setTimeout(() => {
    notifications.value = [
      {
        id: 1,
        title: 'Nuevo Mensaje',
        message: 'Tienes un nuevo mensaje en el foro de Matemáticas',
        timestamp: new Date(Date.now() - 300000),
        type: 'message',
        read: false
      },
      {
        id: 2,
        title: 'Logro Desbloqueado',
        message: '¡Has completado 50 ejercicios de física!',
        timestamp: new Date(Date.now() - 3600000),
        type: 'achievement',
        read: true
      },
      {
        id: 3,
        title: 'Recordatorio Importante',
        message: 'Revisa las nuevas tareas publicadas',
        timestamp: new Date(Date.now() - 86400000),
        type: 'reminder',
        read: false
        
      },
      {
        id: 4,
        title: 'Alerta del Sistema',
        message: 'Mantenimiento programado para mañana',
        timestamp: new Date(Date.now() - 172800000),
        type: 'alert',
        read: false
      },
      {
        id: 5,
        title: 'Nuevo Mensaje',
        message: 'Modesto Te envio un Mensaje',
        timestamp: new Date(Date.now() - 2592000000),
        type: 'message',
        read: true
      },
      {
        id: 6,
        title: 'Nueva Conexión',
        message: 'María García ha visto tu perfil',
        timestamp: new Date(Date.now() - 1800000),
        type: 'social',
        read: false
      },
      {
        id: 7,
        title: 'Progreso Semanal',
        message: 'Has completado el 75% de tus objetivos',
        timestamp: new Date(Date.now() - 604800000),
        type: 'reminder',
        read: false
      },
      {
        id: 8,
        title: 'Mensaje Grupal',
        message: 'Nuevo mensaje en el grupo de estudio',
        timestamp: new Date(Date.now() - 7200000),
        type: 'message',
        read: true
      },
      {
        id: 9,
        title: 'Nueva Calificación',
        message: 'Has obtenido 9.5 en el examen de Química',
        timestamp: new Date(Date.now() - 1800000),
        type: 'achievement',
        read: false
      },
      {
        id: 10,
        title: 'Recordatorio de Pago',
        message: 'La cuota del curso vence el próximo viernes',
        timestamp: new Date(Date.now() - 432000000),
        type: 'reminder',
        read: false
      }
    ];
    loading.value = false;
  }, 1500);
});

// Lógica de tiempo relativo mejorada
const timeAgo = (date) => {
  const units = [
    { max: 60000, value: 1000, unit: 'second' },
    { max: 2760000, value: 60000, unit: 'minute' },
    { max: 72000000, value: 3600000, unit: 'hour' },
    { max: 518400000, value: 86400000, unit: 'day' },
    { max: 2419200000, value: 604800000, unit: 'week' },
    { max: 28512000000, value: 2592000000, unit: 'month' },
    { max: Infinity, value: 31536000000, unit: 'year' }
  ];

  try {
    const parsedDate = date instanceof Date ? date : new Date(date);
    if (isNaN(parsedDate)) return '';
    
    const now = new Date();
    const elapsed = parsedDate - now;
    const absElapsed = Math.abs(elapsed);

    for (const { max, value, unit } of units) {
      if (absElapsed < max) {
        return new Intl.RelativeTimeFormat('es', { numeric: 'auto' })
          .format(Math.round(elapsed / value), unit);
      }
    }
    return parsedDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return '';
  }
};

// Computed y métodos
const unreadCount = computed(() => notifications.value.filter(n => !n.read).length);
const filteredNotifications = computed(() => [...notifications.value].sort((a, b) => b.timestamp - a.timestamp));

const toggleRead = (notification) => {
  notification.read = !notification.read;
};

const deleteNotification = (id) => {
  notifications.value = notifications.value.filter(n => n.id !== id);
};
</script>

<style lang="scss" scoped>
:root {
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --text-color: #1e293b;
  --border-color: #e2e8f0;

  &.dark-mode {
    --bg-color: #1e293b;
    --card-bg: #334155;
    --text-color: #f8fafc;
    --border-color: #475569;
  }
}

.notification-cards {
  padding: 2rem;
  background: var(--bg-color);
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .scroll-container {
    /* Oculta scroll en navegadores WebKit (Chrome, Safari) */
    &::-webkit-scrollbar {
      display: none;
    }
    
    /* Oculta scroll en Firefox */
    scrollbar-width: none;
    
    /* Oculta scroll en IE/Edge */
    -ms-overflow-style: none;

    /* Mantiene funcionalidad de scroll */
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    
    padding-right: 0; // Elimina el padding adicional
  }

  .header-title {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.75rem;
    color: var(--text-color);
    margin-bottom: 1.5rem;

    .title-icon {
      color: #3b82f6;
      font-size: 2.25rem;
    }

    .badge {
      background: #ef4444;
      color: white;
      font-size: 0.9rem;
      padding: 0.3rem 0.8rem;
      border-radius: 1rem;
    }
  }

  .scroll-container {
    flex-grow: 1;
    overflow-y: auto;
    padding-right: 0.5rem;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      
      &:hover {
        background: rgba(0, 0, 0, 0.3);
      }
    }

    .dark-mode & {
      &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.card {
  background: var(--card-bg);
  border-radius: 1rem;
  padding: 1.5rem;
  border-left: 4px solid;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 1rem 0;
  position: relative;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);

    .card-icon {
      font-size: 1.8rem;
      margin-top: 0.3rem;
    }

    .header-content {
      flex-grow: 1;
    }

    .notification-category {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-color);
      opacity: 0.7;
    }

    .delete-btn {
      color: var(--text-color);
      opacity: 0.5;
      transition: all 0.2s ease;

      &:hover {
        opacity: 1;
        color: #ef4444;
      }
    }
  }

  .card-message {
    color: var(--text-color);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);

    .notification-time {
      font-size: 0.85rem;
      color: var(--text-color);
      opacity: 0.8;
    }

    .mark-read-btn {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover {
        background: rgba(59, 130, 246, 0.2);
      }
    }
  }
}

.notification-list-enter-active,
.notification-list-leave-active {
  transition: all 0.4s ease;
}
.notification-list-enter-from,
.notification-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.skeleton-container {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 1rem 0;
}

.skeleton-card {
  background: var(--card-bg);
  border-radius: 1rem;
  padding: 1.5rem;
  height: 150px;
  animation: skeleton-loading 1.5s infinite linear;
}

@keyframes skeleton-loading {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.empty-state {
  text-align: center;
  padding: 4rem;
  color: var(--text-color);
  opacity: 0.5;

  .material-icons {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
}
</style>