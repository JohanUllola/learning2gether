import { defineStore } from "pinia";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import router from "../router/index.js";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false, // Corregido el nombre de la propiedad
    authUnsubscribe: null,
  }),

  actions: {
    setStudentName(name) {
      this.studentName = name; // Asegúrate de tener este estado
    },
    async initializeAuthListener() {
      // Inicializa el listener de autenticación una sola vez
      if (this.authUnsubscribe) return;

      this.authUnsubscribe = onAuthStateChanged(auth, (user) => {
        this.userData = user ? { email: user.email, uid: user.uid } : null;
      });
    },

    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        this.userData = { email: user.email, uid: user.uid };
      } catch (error) {
        console.error("Error de registro:", error.code, error.message);
        throw error; // Propagar el error para manejo en componentes
      } finally {
        this.loadingUser = false;
      }
    },

    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        this.userData = { email: user.email, uid: user.uid };
        
      } catch (error) {
        console.error("Error de inicio de sesión:", error.code, error.message);
        throw error;
      } finally {
        this.loadingUser = false;
      }
    },

    async logoutUser() {
      try {
        await signOut(auth);
        this.userData = null;
        router.push('/profile-selection')
      } catch (error) {
        console.error("Error al cerrar sesión:", error.code, error.message);
        throw error;
      }
    },

    async currentUser() {
      this.loadingSession = true;
      try {
        // Usar el usuario ya almacenado si está disponible
        if (this.userData) return this.userData;
        
        // Esperar resolución inicial de autenticación
        await new Promise((resolve, reject) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
          }, reject);
        });
        
        return this.userData;
      } finally {
        this.loadingSession = false;
      }
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.userData,
  },

  onDestroy() {
    if (this.authUnsubscribe) {
      this.authUnsubscribe();
    }
  }
});