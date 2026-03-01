<template>
  <AdminLayout>
    <v-row>
      <v-col cols="12">
        <v-card class="elevation-0">
          <v-card-title>
            売上分析レポート
          </v-card-title>
          <v-card-text>
            <div class="h-96 d-flex align-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div class="text-center">
                <v-icon icon="mdi-chart-line-outline" size="64" color="gray" />
                <p class="text-gray-500 mt-4">このセクションは拡張可能です</p>
                <p class="text-sm text-gray-400">Chart.js等のライブラリを統合してグラフを表示</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-card class="elevation-0">
          <v-card-title>月別売上</v-card-title>
          <v-list>
            <v-list-item v-for="item in monthlySales" :key="item.month">
              <v-list-item-title class="w-20">{{ item.month }}</v-list-item-title>
              <v-list-item-subtitle class="flex-grow-1">
                <v-progress-linear
                  :value="(item.sales / 500000) * 100"
                  height="8"
                  color="primary"
                />
              </v-list-item-subtitle>
              <v-list-item-subtitle class="text-right">
                ¥{{ item.sales.toLocaleString() }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="elevation-0">
          <v-card-title>カテゴリ別売上</v-card-title>
          <v-list>
            <v-list-item v-for="item in categorySales" :key="item.category">
              <v-list-item-title class="w-20">{{ item.category }}</v-list-item-title>
              <v-list-item-subtitle class="flex-grow-1">
                <v-progress-linear
                  :value="(item.amount / 250000) * 100"
                  height="8"
                  :color="item.color"
                />
              </v-list-item-subtitle>
              <v-list-item-subtitle class="text-right">
                {{ item.percentage }}%
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@components/layouts/AdminLayout.vue'

const monthlySales = [
  { month: '1月', sales: 125000 },
  { month: '2月', sales: 189000 },
  { month: '3月', sales: 245000 },
  { month: '4月', sales: 198000 },
  { month: '5月', sales: 312000 },
  { month: '6月', sales: 387000 }
]

const categorySales = [
  { category: '家具', amount: 245000, percentage: 28, color: 'primary' },
  { category: 'インテリア', amount: 198000, percentage: 22, color: 'success' },
  { category: 'ファッション', amount: 167000, percentage: 19, color: 'warning' },
  { category: 'その他', amount: 312000, percentage: 31, color: 'info' }
]
</script>
