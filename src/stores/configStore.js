import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
  state: () => ({
    isDarkMode: false,
    notifications: false,
    audioVolume: 50, // Control de volumen de audio
    language: 'es', // Control de idioma
    inactivityTimer: 10, // Control de temporizador de inactividad en minutos
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('darkMode', this.isDarkMode ? 'true' : 'false');
      document.documentElement.classList.toggle('dark-mode', this.isDarkMode);
    },
    loadDarkMode() {
      const savedDarkMode = localStorage.getItem('darkMode');
      this.isDarkMode = savedDarkMode === 'true';
      document.documentElement.classList.toggle('dark-mode', this.isDarkMode);
    },
    saveSettings() {
      localStorage.setItem('notifications', this.notifications ? 'true' : 'false');
      localStorage.setItem('audioVolume', this.audioVolume.toString());
      localStorage.setItem('language', this.language);
      localStorage.setItem('inactivityTimer', this.inactivityTimer.toString());
    },
    loadSettings() {
      const savedNotifications = localStorage.getItem('notifications');
      this.notifications = savedNotifications === 'true';
      const savedAudioVolume = localStorage.getItem('audioVolume');
      this.audioVolume = savedAudioVolume ? parseInt(savedAudioVolume) : 50;
      const savedLanguage = localStorage.getItem('language');
      this.language = savedLanguage || 'es';
      const savedInactivityTimer = localStorage.getItem('inactivityTimer');
      this.inactivityTimer = savedInactivityTimer ? parseInt(savedInactivityTimer) : 10;
    },
  },
});