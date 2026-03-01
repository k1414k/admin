import { defineStore } from 'pinia'
import type { AdminUser } from '@types/admin'

interface AuthState {
  user: AdminUser | null
  isAuthenticated: boolean
  isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isLoading: false
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated
  },

  actions: {
    async login(email: string, password: string) {
      this.isLoading = true
      try {
        // API呼び出し例（実装時に置き換え）
        // const response = await $fetch('/api/admin/login', {
        //   method: 'POST',
        //   body: { email, password }
        // })
        
        // デモ用：モックユーザー
        this.user = {
          id: 1,
          email,
          name: 'Admin User',
          role: 'admin',
          isActive: true,
          lastLogin: new Date().toISOString()
        }
        this.isAuthenticated = true

        // localStorage に保存（セッション保持用）
        if (process.client) {
          localStorage.setItem('auth_user', JSON.stringify(this.user))
        }
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      this.user = null
      this.isAuthenticated = false

      // localStorage からクリア
      if (process.client) {
        localStorage.removeItem('auth_user')
      }
    },

    async checkSession() {
      // セッション確認処理
      // const response = await $fetch('/api/admin/me')
      // if (response) {
      //   this.user = response
      //   this.isAuthenticated = true
      // }
    }
  }
})
