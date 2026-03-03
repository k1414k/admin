<template>
  <AdminLayout>
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="6">
        <h1 class="text-h5 font-bold">カテゴリ一覧</h1>
      </v-col>

      <v-col cols="12" md="6" class="text-md-right">
        <v-btn color="primary" @click="openCreateDialog">
          カテゴリ追加
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="errorMessage" class="mb-4">
      <v-col cols="12">
        <v-alert type="error" variant="tonal">
          {{ errorMessage }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-if="successMessage" class="mb-4">
      <v-col cols="12">
        <v-alert type="success" variant="tonal">
          {{ successMessage }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="categories"
          :loading="isLoading"
          item-value="id"
        >
          <template #item.createdAt="{ item }">
            {{ formatDate(item.createdAt) }}
          </template>

          <template #item.actions="{ item }">
            <div class="d-flex ga-2">
              <v-btn
                size="small"
                variant="outlined"
                color="primary"
                @click="openEditDialog(item)"
              >
                修正
              </v-btn>

              <v-btn
                size="small"
                variant="outlined"
                color="error"
                @click="openDeleteDialog(item)"
              >
                削除
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- 追加モーダル -->
    <v-dialog v-model="createDialog" max-width="500">
      <v-card>
        <v-card-title>カテゴリ追加</v-card-title>

        <v-card-text>
          <v-text-field
            v-model="createForm.name"
            label="カテゴリ名"
            variant="outlined"
            :disabled="isSubmitting"
          />
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="closeCreateDialog" :disabled="isSubmitting">
            キャンセル
          </v-btn>
          <v-btn color="primary" @click="createCategory" :loading="isSubmitting">
            追加
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 編集モーダル -->
    <v-dialog v-model="editDialog" max-width="500">
      <v-card>
        <v-card-title>カテゴリ修正</v-card-title>

        <v-card-text>
          <v-text-field
            v-model="editForm.name"
            label="新しいカテゴリ名"
            variant="outlined"
            :disabled="isSubmitting"
          />
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="closeEditDialog" :disabled="isSubmitting">
            キャンセル
          </v-btn>
          <v-btn color="primary" @click="updateCategory" :loading="isSubmitting">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 削除確認モーダル -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title>カテゴリ削除</v-card-title>

        <v-card-text>
          「{{ selectedCategory?.name }}」を削除しますか？
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="closeDeleteDialog" :disabled="isSubmitting">
            キャンセル
          </v-btn>
          <v-btn color="error" @click="deleteCategory" :loading="isSubmitting">
            削除する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/layouts/AdminLayout.vue'
import api from '@/lib/api'

type Category = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

type ApiCategory = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

const headers = [
  { title: 'ID', key: 'id', width: 80 },
  { title: 'カテゴリ名', key: 'name' },
  { title: '登録日', key: 'createdAt', width: 160 },
  { title: '操作', key: 'actions', sortable: false, width: 180 }
]

const categories = ref<Category[]>([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const createDialog = ref(false)
const editDialog = ref(false)
const deleteDialog = ref(false)

const selectedCategory = ref<Category | null>(null)

const createForm = ref({
  name: ''
})

const editForm = ref({
  id: null as number | null,
  name: ''
})

const mapApiCategory = (category: ApiCategory): Category => ({
  id: category.id,
  name: category.name,
  createdAt: category.created_at,
  updatedAt: category.updated_at
})

const formatDate = (dateString: string) => {
  if (!dateString) return '-'

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return '-'

  return date.toLocaleDateString('ja-JP')
}

const clearMessages = () => {
  errorMessage.value = ''
  successMessage.value = ''
}

const fetchCategories = async () => {
  isLoading.value = true
  clearMessages()

  try {
    const response = await api.get<ApiCategory[]>('/admin/v1/categories')
    categories.value = response.data.map(mapApiCategory)
  } catch (error: any) {
    console.error('Failed to fetch categories:', error)
    errorMessage.value = 'カテゴリ一覧の取得に失敗しました。'
    categories.value = []
  } finally {
    isLoading.value = false
  }
}

const openCreateDialog = () => {
  clearMessages()
  createForm.value.name = ''
  createDialog.value = true
}

const closeCreateDialog = () => {
  createDialog.value = false
}

const openEditDialog = (category: Category) => {
  clearMessages()
  selectedCategory.value = category
  editForm.value.id = category.id
  editForm.value.name = category.name
  editDialog.value = true
}

const closeEditDialog = () => {
  editDialog.value = false
  editForm.value.id = null
  editForm.value.name = ''
}

const openDeleteDialog = (category: Category) => {
  clearMessages()
  selectedCategory.value = category
  deleteDialog.value = true
}

const closeDeleteDialog = () => {
  deleteDialog.value = false
}

const createCategory = async () => {
  if (!createForm.value.name.trim()) {
    errorMessage.value = 'カテゴリ名を入力してください。'
    return
  }

  isSubmitting.value = true
  clearMessages()

  try {
    await api.post('/admin/v1/categories', {
      category: {
        name: createForm.value.name.trim()
      }
    })

    successMessage.value = 'カテゴリを追加しました。'
    closeCreateDialog()
    await fetchCategories()
  } catch (error: any) {
    console.error('Failed to create category:', error)
    errorMessage.value =
      error?.response?.data?.errors?.[0] ?? 'カテゴリ追加に失敗しました。'
  } finally {
    isSubmitting.value = false
  }
}

const updateCategory = async () => {
  if (!editForm.value.id) return

  if (!editForm.value.name.trim()) {
    errorMessage.value = 'カテゴリ名を入力してください。'
    return
  }

  isSubmitting.value = true
  clearMessages()

  try {
    await api.patch(`/admin/v1/categories/${editForm.value.id}`, {
      category: {
        name: editForm.value.name.trim()
      }
    })

    successMessage.value = 'カテゴリを修正しました。'
    closeEditDialog()
    await fetchCategories()
  } catch (error: any) {
    console.error('Failed to update category:', error)
    errorMessage.value =
      error?.response?.data?.errors?.[0] ?? 'カテゴリ修正に失敗しました。'
  } finally {
    isSubmitting.value = false
  }
}

const deleteCategory = async () => {
  if (!selectedCategory.value) return

  isSubmitting.value = true
  clearMessages()

  try {
    await api.delete(`/admin/v1/categories/${selectedCategory.value.id}`)
    successMessage.value = 'カテゴリを削除しました。'
    closeDeleteDialog()
    await fetchCategories()
  } catch (error: any) {
    console.error('Failed to delete category:', error)
    errorMessage.value =
      error?.response?.data?.errors?.[0] ?? 'カテゴリ削除に失敗しました。'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchCategories()
})
</script>