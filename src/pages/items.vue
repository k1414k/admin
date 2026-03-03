<template>
  <AdminLayout>
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-h5 font-bold">商品一覧</h1>
      </v-col>
    </v-row>

    <v-row v-if="errorMessage">
      <v-col cols="12">
        <v-alert type="error" variant="tonal">
          {{ errorMessage }}
        </v-alert>
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

          <template #[`item.createdAt`]="{ item }">
            {{ formatDate(item.createdAt) }}
          </template>
        </DataTable>
      </v-col>
    </v-row>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/layouts/AdminLayout.vue'
import DataTable from '@/components/common/DataTable.vue'
import type { Item } from '@/types/admin'
import api from '@/lib/api'

type ApiItem = {
  id: number
  title: string
  description: string | null
  price: number
  trading_status: string
  user_nickname?: string | null
  created_at: string
  updated_at: string
}

const headers = [
  { title: '商品名', key: 'title' },
  { title: '価格', key: 'price', width: 120 },
  { title: 'ステータス', key: 'status', width: 120 },
  { title: '出品者', key: 'seller', width: 140 },
  { title: '登録日', key: 'createdAt', width: 140 }
]

const items = ref<Item[]>([])
const isLoading = ref(false)
const errorMessage = ref('')

const mapTradingStatus = (status: string): Item['status'] => {
  switch (status) {
    case 'sold':
      return 'sold'
    case 'removed':
      return 'removed'
    case 'active':
    default:
      return 'active'
  }
}

const mapApiToItem = (apiItem: ApiItem): Item => ({
  id: apiItem.id,
  title: apiItem.title,
  description: apiItem.description ?? '',
  price: apiItem.price,
  category: '',
  status: mapTradingStatus(apiItem.trading_status),
  seller: apiItem.user_nickname ?? '-',
  createdAt: apiItem.created_at,
  updatedAt: apiItem.updated_at
})

const statusText = (status: Item['status']) => {
  switch (status) {
    case 'active':
      return 'アクティブ'
    case 'sold':
      return '売却済み'
    case 'removed':
      return '削除済み'
    default:
      return status
  }
}

const statusColor = (status: Item['status']) => {
  switch (status) {
    case 'active':
      return 'success'
    case 'sold':
      return 'warning'
    case 'removed':
      return 'error'
    default:
      return 'default'
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return '-'

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return '-'

  return date.toLocaleDateString('ja-JP')
}

const fetchItems = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await api.get<ApiItem[]>('/auction/v1/items')
    items.value = response.data.map(mapApiToItem)
  } catch (error) {
    console.error('Failed to fetch items:', error)
    errorMessage.value = '商品一覧の取得に失敗しました。'
    items.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchItems()
})
</script>