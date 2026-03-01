<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    :items-per-page="itemsPerPage"
    class="elevation-0"
    @update:page="$emit('update:page', $event)"
  >
    <!-- カスタムスロット -->
    <slot />

    <!-- アクション列 -->
    <template v-if="showActions" #[`item.actions`]="{ item }">
      <v-btn-group density="compact" variant="outlined" size="small">
        <v-btn
          icon="mdi-pencil"
          color="primary"
          @click="$emit('edit', item)"
        />
        <v-btn
          icon="mdi-delete"
          color="error"
          @click="$emit('delete', item)"
        />
      </v-btn-group>
    </template>

    <!-- ローディング -->
    <template #loading>
      <v-skeleton-loader
        type="table-row-divider@5"
        class="w-full"
      />
    </template>

    <!-- データなし -->
    <template #no-data>
      <div class="py-8 text-center">
        <v-icon icon="mdi-database-outline" size="48" color="gray" />
        <p class="text-gray-500 mt-4">データがありません</p>
      </div>
    </template>
  </v-data-table>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import type { DataTableHeader } from 'vuetify'

interface Props<T> {
  headers: DataTableHeader[]
  items: T[]
  loading?: boolean
  itemsPerPage?: number
  showActions?: boolean
}

withDefaults(defineProps<Props<T>>(), {
  loading: false,
  itemsPerPage: 10,
  showActions: true
})

defineEmits<{
  'update:page': [page: number]
  'edit': [item: any]
  'delete': [item: any]
}>()
</script>

<style scoped>
:deep(.v-data-table) {
  background-color: transparent;
}

:deep(.v-data-table__th) {
  background-color: #f5f5f5 !important;
  font-weight: 600;
}
</style>
