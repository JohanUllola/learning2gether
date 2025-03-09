<!-- components/ErrorPopup.vue -->
<template>
    <transition name="slide-fade">
      <div 
        v-if="isVisible" 
        class="error-popup"
        role="alert" 
        aria-live="assertive"
      >
        <div class="error-content">
          <span class="error-icon">⚠️</span>
          <p>{{ message }}</p>
          <button @click="close" class="close-btn">&times;</button>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    message: String,
    isVisible: Boolean
  });
  
  const emit = defineEmits(['close']);
  
  const close = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .error-popup {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    background: #fee2e2;
    color: #dc2626;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #dc2626;
    display: flex;
    align-items: center;
  }
  
  .error-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .error-icon {
    font-size: 1.5rem;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.5rem;
    cursor: pointer;
    margin-left: auto;
    padding: 0 0.5rem;
    transition: opacity 0.2s ease;
  }
  
  .close-btn:hover {
    opacity: 0.8;
  }
  
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }
  
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
  </style>