import { defineStore } from 'pinia';
import { getAuth, confirmPasswordReset, applyActionCode } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  actions: {
    async handlePasswordReset(oobCode, newPassword) {
      try {
        const auth = getAuth();
        await confirmPasswordReset(auth, oobCode, newPassword);
        return { success: true };
      } catch (error) {
        return this.handleAuthError(error);
      }
    },

    async verifyEmail(oobCode) {
      try {
        const auth = getAuth();
        await applyActionCode(auth, oobCode);
        return { success: true };
      } catch (error) {
        return this.handleAuthError(error);
      }
    },

    handleAuthError(error) {
      const errorMap = {
        'auth/expired-action-code': 'El enlace ha expirado',
        'auth/invalid-action-code': 'Enlace inválido o ya utilizado',
        'auth/user-disabled': 'Cuenta deshabilitada',
        'auth/user-not-found': 'Usuario no encontrado',
      };
      return {
        success: false,
        message: errorMap[error.code] || 'Error en la autenticación'
      };
    }
  }
});