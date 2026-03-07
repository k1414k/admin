<template>
  <AdminLayout>
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-h5 font-bold">商品一覧</h1>
      </v-col>
    </v-row>
    <v-row v-if="errorMessage">
      <v-col cols="12">
        <v-alert type="error" variant="tonal">{{ errorMessage }}</v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <DataTable
          :headers="headers"
          :items="items"
          :loading="isLoading"
          :show-actions="false"
        >
          <template #[`item.price`]="{ item }">
            ¥{{ Number(item.price).toLocaleString() }}
          </template>
          <template #[`item.status`]="{ item }">
            <v-chip :color="statusColor(item.status)" label size="small">
              {{ statusText(item.status) }}
            </v-chip>
          </template>
          <template #[`item.image`]="{ item }">
            <div class="d-flex align-center">
              <v-avatar v-if="item.image" size="40">
                <v-img :src="item.image" alt="item image" cover />
              </v-avatar>
              <span v-else>-</span>
            </div>
          </template>
        </DataTable>
      </v-col>
    </v-row>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '~/components/layouts/AdminLayout.vue'
import DataTable from '~/components/common/DataTable.vue'
import type { Item } from '~/types/admin'
import { debugLog } from '@/lib/debugLog'
import { useAuthStore } from '@/stores/auth'

type ApiItem = {
  id: number
  title: string
  description: string
  price: number
  trading_status: string
  user_nickname?: string
  category_name?: string
  image?: string | null
  created_at: string
  updated_at: string
}

const authStore = useAuthStore()
const config = useRuntimeConfig()
const apiBase = config.public.apiBase as string

const headers = [
  { title: '商品名', key: 'title' },
  { title: '価格', key: 'price', width: 120 },
  { title: 'ステータス', key: 'status', width: 100 },
  { title: 'カテゴリ', key: 'category', width: 120 },
  { title: '画像', key: 'image', width: 100 },
  { title: '出品者', key: 'seller', width: 120 },
  { title: '登録日', key: 'createdAt', width: 120 }
]

const items = ref<Item[]>([])
const isLoading = ref(false)
const errorMessage = ref('')

const mapApiToItem = (api: ApiItem): Item => ({
  id: api.id,
  title: api.title,
  description: api.description || '',
  price: api.price,
  category: api.category_name || '-',
  status: api.trading_status === 'sold' ? 'sold' : 'active',
  seller: api.user_nickname || '-',
  image: api.image || undefined,
  createdAt: api.created_at,
  updatedAt: api.updated_at
})

const statusText = (s: string) =>
  ({ active: 'アクティブ', sold: '売却済み', removed: '削除済み' }[s] || s)
const statusColor = (s: string) =>
  ({ active: 'success', sold: 'warning', removed: 'error' }[s] || 'default')

const fetchItems = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    // #region agent log
    debugLog({
      hypothesisId: 'H3',
      location: 'admin/src/pages/items.vue:fetchItems',
      message: 'items_fetch_start',
      data: {
        origin: process.client ? window.location.origin : 'server',
        apiBase,
        url: `${apiBase}/admin/v1/items`
      }
    })
    // #endregion
    const data = await $fetch<ApiItem[]>(`${apiBase}/admin/v1/items`, {
      headers: {
        ...authStore.authHeaders,
        Accept: 'application/json'
      }
    })
    items.value = data.map(mapApiToItem)
  } catch (e) {
    console.error(e)
    // #region agent log
    debugLog({
      hypothesisId: 'H3_H4',
      location: 'admin/src/pages/items.vue:fetchItems:catch',
      message: 'items_fetch_failed',
      data: {
        origin: process.client ? window.location.origin : 'server',
        apiBase,
        errorMessage: (e as any)?.message || null,
        errorStatus: (e as any)?.status || null
      }
    })
    // #endregion
    errorMessage.value = '商品一覧の取得に失敗しました。'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchItems)
</script>
