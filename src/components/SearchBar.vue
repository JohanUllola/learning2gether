<template>
  <div :class="['search-container', { 'dark-mode': configStore.isDarkMode }]">
    <div class="search-bar">
      <input
        type="text"
        placeholder="Buscar"
        aria-label="Buscar juegos"
        @keyup.enter="performSearch"
      />
      <button
        class="search-button"
        aria-label="Ejecutar búsqueda"
        @click="performSearch"
      >
        <svg class="search-icon" viewBox="0 0 24 24">
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useConfigStore } from '../stores/configStore';
import { useUserStore } from '../stores/user';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const configStore = useConfigStore();
onAuthStateChanged(auth, (user) => {
  console.log(user);
});

const userStore = useUserStore();

const performSearch = () => {
  // Add search logic here
};
</script>

<style lang="scss" scoped>
.search-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  &.dark-mode {
    background-color: #2c3e50;
    color: #ecf0f1;
  }
}

.search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 2.5rem;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease, border 0.3s ease;
  border: 1px solid #e0e0e0;

  &:focus-within {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: #2196f3;
  }

  &.dark-mode {
    background-color: #34495e;
    border-color: #95a5a6;
  }

  input {
    flex: 1;
    border: none;
    background: none;
    padding: 0.75rem;
    font-size: 1rem;
    color: #333333;
    transition: color 0.3s ease;

    &::placeholder {
      color: #9e9e9e;
    }

    &:focus {
      outline: none;
    }

    &.dark-mode {
      color: #ecf0f1;

      &::placeholder {
        color: #95a5a6;
      }
    }
  }
}

.search-button {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &.dark-mode {
    background-color: transparent;

    &:hover {
      background-color: #3b3b3b;
    }
  }
}

.search-icon {
  width: 24px;
  height: 24px;
  fill: #757575;

  &.dark-mode {
    fill: #ecf0f1;
  }
}
</style>