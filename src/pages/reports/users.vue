<template>
  <AdminLayout>
    <v-row>
      <v-col cols="12">
        <v-card class="elevation-0">
          <v-card-title>
            ユーザー分析
          </v-card-title>
          <v-card-text>
            <div class="h-96 d-flex align-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div class="text-center">
                <v-icon icon="mdi-chart-pie-outline" size="64" color="gray" />
                <p class="text-gray-500 mt-4">ユーザー分析グラフ</p>
                <p class="text-sm text-gray-400">Vue-Chartjs やその他のライブラリで実装</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="elevation-0">
          <v-card-title>ユーザー統計</v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="stat in userStats" :key="stat.label" cols="12" sm="6" lg="3">
                <div class="pa-4 bg-gray-50 rounded-lg text-center">
                  <p class="text-sm text-gray-600 mb-2">{{ stat.label }}</p>
                  <p class="text-2xl font-bold text-primary">{{ stat.value }}</p>
                  <p class="text-xs text-gray-500 mt-2">{{ stat.change }}</p>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12" lg="6">
        <v-card class="elevation-0">
          <v-card-title>新規ユーザー推移</v-card-title>
          <v-list>
            <v-list-item v-for="week in newUsersByWeek" :key="week.week">
              <v-list-item-title class="w-20">{{ week.week }}</v-list-item-title>
              <v-list-item-subtitle class="flex-grow-1">
                <v-progress-linear
                  :value="(week.count / 150) * 100"
                  height="8"
                  color="success"
                />
              </v-list-item-subtitle>
              <v-list-item-subtitle class="text-right">
                {{ week.count }}名
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6">
        <v-card class="elevation-0">
          <v-card-title>ユーザーアクティブ率</v-card-title>
          <v-list>
            <v-list-item v-for="status in activityStatus" :key="status.label">
              <v-list-item-title class="w-32">{{ status.label }}</v-list-item-title>
              <v-list-item-subtitle class="flex-grow-1">
                <v-progress-linear
                  :value="status.percentage"
                  height="8"
                  :color="status.color"
                />
              </v-list-item-subtitle>
              <v-list-item-subtitle class="text-right">
                {{ status.percentage }}%
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

const userStats = [
  { label: '総ユーザー数', value: '1,250', change: '↑ 前月比 12.5%' },
  { label: 'アクティブユーザー', value: '892', change: '↑ 前月比 8.3%' },
  { label: '新規ユーザー（今月）', value: '156', change: '↑ 前月比 5.2%' },
  { label: 'チャーン率', value: '2.3%', change: '↓ 前月比 0.8%' }
]

const newUsersByWeek = [
  { week: '第1週', count: 42 },
  { week: '第2週', count: 38 },
  { week: '第3週', count: 55 },
  { week: '第4週', count: 67 }
]

const activityStatus = [
  { label: '毎日アクティブ', percentage: 45, color: 'success' },
  { label: '週1〜3回', percentage: 28, color: 'info' },
  { label: '月1回以上', percentage: 18, color: 'warning' },
  { label: '非アクティブ', percentage: 9, color: 'error' }
]
</script>
