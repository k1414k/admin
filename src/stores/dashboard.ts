import { defineStore } from 'pinia'
import type { DashboardStats } from '@types/admin'

interface DashboardState {
  stats: DashboardStats | null
  isLoading: boolean
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    stats: null,
    isLoading: false
  }),

  getters: {
    getStats: (state) => state.stats
  },

  actions: {
    async fetchStats() {
      this.isLoading = true
      try {
        // API呼び出し例
        // const response = await $fetch('/api/admin/stats')
        
        // デモ用：モック統計
        this.stats = {
          totalUsers: 1250,
          totalItems: 5843,
          totalOrders: 892,
          totalRevenue: 125000,
          growthRate: {
            users: 12.5,
            items: 8.3,
            orders: 15.2,
            revenue: 18.7
          }
        }
      } finally {
        this.isLoading = false
      }
    }
  }
})
