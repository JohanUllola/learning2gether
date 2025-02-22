import { defineStore } from 'pinia';

export const useConfigStore = defineStore('configStore', {
  state: () => ({
    userName: "Juan Pérez",
    userEmail: "juanperez@email.com",
    profilePic: "/src/assets/perfil.png",
    isDarkMode: localStorage.getItem("darkMode") === "true",
    notifications: localStorage.getItem("notifications") === "true",
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem("darkMode", this.isDarkMode);
      document.documentElement.classList.toggle("dark", this.isDarkMode);
    },
    setProfilePic(url) {
      this.profilePic = url;
      // Puedes guardar en localStorage si lo requieres
    },
    saveSettings() {
      localStorage.setItem("notifications", this.notifications);
      // Si deseas, también guarda userName, userEmail y profilePic
    }
  }
});
