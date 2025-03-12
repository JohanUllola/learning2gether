<template>
  <div class="report-container">
    <h2 class="header-title">Reporte de Usuarios Registrados</h2>
    <div class="filter-section">
      <div class="search-bar">
        <input v-model="searchQuery" placeholder="Buscar usuario..." />
        <button class="search-button" aria-label="Ejecutar búsqueda">
          <svg class="search-icon" viewBox="0 0 24 24">
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </button>
      </div>
    </div>
    <transition-group name="fade-up" tag="div" class="cards-container">
      <div 
        v-for="user in filteredUsers" 
        :key="user.id" 
        class="card user-card"
      >
        <div class="card-header">
          <span class="card-icon material-icons">account_circle</span>
          <h3 class="card-title">{{ user.name }}</h3>
        </div>
        <p class="card-message"><strong>ID:</strong> {{ user.id }}</p>
        <p class="card-message"><strong>Email:</strong> {{ user.email }}</p>
        <p class="card-message"><strong>Registro:</strong> {{ user.registeredAt }}</p>
        <div class="status-container">
          <button 
            @click="toggleStatus(user.id)"
            class="status-toggle"
            :class="user.active ? 'active' : 'inactive'"
          >
            {{ user.active ? 'Activo' : 'Inactivo' }}
          </button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');

// Datos ficticios con estado activo/inactivo
const users = ref([
  { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', registeredAt: '2025-01-15', active: true },
  { id: 2, name: 'María García', email: 'maria.garcia@example.com', registeredAt: '2025-02-20', active: true },
  { id: 3, name: 'Carlos López', email: 'carlos.lopez@example.com', registeredAt: '2025-03-05', active: false },
  { id: 4, name: 'Ana Martínez', email: 'ana.martinez@example.com', registeredAt: '2025-03-10', active: true },
  { id: 5, name: 'Pedro Rodríguez', email: 'pedro.rodriguez@example.com', registeredAt: '2025-03-12', active: true },
  { id: 6, name: 'Laura González', email: 'laura.gonzalez@example.com', registeredAt: '2025-03-14', active: false },
]);

// Función para cambiar el estado
const toggleStatus = (userId) => {
  const user = users.value.find(u => u.id === userId);
  if (user) {
    user.active = !user.active;
  }
};

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  return users.value.filter(user => 
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped lang="scss">

.status-container {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.status-toggle {
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(0,0,0,0.15);
  }

  &.active {
    background: linear-gradient(45deg, #10b981, #34d399);
    color: white;
    
    &::before {
      background: linear-gradient(45deg, rgba(16, 185, 129, 0.3), rgba(52, 211, 153, 0.3));
    }
  }

  &.inactive {
    background: linear-gradient(45deg, #ef4444, #f87171);
    color: white;
    
    &::before {
      background: linear-gradient(45deg, rgba(239, 68, 68, 0.3), rgba(248, 113, 113, 0.3));
    }
  }
}
.report-container {
  padding: 2rem;
  background: #f8fafc;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  max-width: 1200px;
  margin: 2rem auto;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.header-title {
  text-align: center;
  margin: 0 0 2rem 0;
  font-size: 2.2rem;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(99, 102, 241, 0.1);
}

.filter-section {
  margin-bottom: 1.5rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 2.5rem;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid #e2e8f0;

  &:focus-within {
    border-color: #818cf8;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
    
    .search-icon {
      fill: #4f46e5;
    }
  }

  input {
    flex: 1;
    border: none;
    background: none;
    padding: 0.75rem;
    font-size: 1rem;
    color: #1e293b;
    
    &::placeholder {
      color: #94a3b8;
    }
    
    &:focus {
      outline: none;
    }
  }

  .search-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-icon {
    width: 24px;
    height: 24px;
    fill: #94a3b8;
    transition: fill 0.3s ease;
  }
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #ffffff;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-left: 4px solid #f59e0b;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: #3b82f6;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.15);
    
    &::before {
      opacity: 1;
    }
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    padding-bottom: 1rem;
    margin-bottom: 0.5rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 2px;
      background: #f59e0b;
      background: linear-gradient(90deg, #f59e0b, #f97316);
    }

    .card-icon {
      font-size: 2rem;
      background: linear-gradient(45deg, #3b82f6, #8b5cf6);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }

    .card-title {
      margin: 0;
      background: linear-gradient(45deg, #1e293b, #334155);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
  }

  .card-message {
    font-size: 0.95rem;
    color: #4b5563;
    margin: 0.5rem 0;
    
    strong {
      color: #3b82f6;
      font-weight: 600;
    }
  }
}

.user-status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  background-clip: padding-box;
  -webkit-background-clip: padding-box;

  &.active {
    background: #10b981;
    background: linear-gradient(45deg, #10b981, #34d399);
    color: white;
  }

  &.inactive {
    background: #ef4444;
    background: linear-gradient(45deg, #ef4444, #f87171);
    color: white;
  }
}

/* Animaciones */
.fade-up-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  -webkit-transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-up-leave-active {
  transition: all 0.3s cubic-bezier(0.32, 0, 0.67, 0);
  -webkit-transition: all 0.3s cubic-bezier(0.32, 0, 0.67, 0);
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
  -webkit-transform: translateY(20px);
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
  -webkit-transform: translateY(20px);
}

/* Prefijos para transformaciones */
.card {
  -webkit-transition: transform 0.3s ease, box-shadow 0.3s ease;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Mejor compatibilidad para Safari */
@media not all and (min-resolution:.001dpcm) {
  @supports (-webkit-appearance:none) {
    .card-title, .header-title {
      background-attachment: scroll;
    }
  }
}
</style>