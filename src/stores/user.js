import { defineStore } from "pinia";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import router from "../router/index.js";

const googleProvider = new GoogleAuthProvider();

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
    authUnsubscribe: null,
  }),

  actions: {
    async initializeAuthListener() {
      if (this.authUnsubscribe) return;

      this.authUnsubscribe = onAuthStateChanged(auth, (user) => {
        this.userData = user ? { 
          email: user.email, 
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL 
        } : null;
      });
    },

    // Nuevo método para login con Google
    async loginWithGoogle() {
      this.loadingUser = true;
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        
        this.userData = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        };
        
        router.push('/home');
      } catch (error) {
        console.error("Error de autenticación con Google:", error.code, error.message);
        throw error;
      } finally {
        this.loadingUser = false;
      }
    },

    // Métodos existentes manteniendo su funcionalidad
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        this.userData = { 
          email: user.email, 
          uid: user.uid,
          displayName: null,
          photoURL: null
        };
      } catch (error) {
        console.error("Error de registro:", error.code, error.message);
        throw error;
      } finally {
        this.loadingUser = false;
      }
    },

    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        this.userData = { 
          email: user.email, 
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        };
        router.push('/home');
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
        router.push('/profile-selection');
      } catch (error) {
        console.error("Error al cerrar sesión:", error.code, error.message);
        throw error;
      }
    },

    async currentUser() {
      this.loadingSession = true;
      try {
        if (this.userData) return this.userData;
        
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