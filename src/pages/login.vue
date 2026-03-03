<template>
  <v-app>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-8">
            <!-- ロゴセクション -->
            <v-card-title class="text-center py-8 bg-primary text-white">
              <v-icon icon="mdi-store-outline" size="48" class="mb-4" />
              <div class="text-h5 font-bold">Admin Panel</div>
              <div class="text-subtitle2 mt-2">管理画面へのログイン</div>
            </v-card-title>

            <!-- フォーム -->
            <v-card-text class="pa-8 mt-4">
              <v-form @submit.prevent="handleLogin">
                <v-text-field
                  v-model="form.email"
                  label="メールアドレス"
                  type="email"
                  placeholder="admin@example.com"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  class="mb-4"
                  required
                  :error="!!errors.email"
                  :error-messages="errors.email"
                />

                <v-text-field
                  v-model="form.password"
                  label="パスワード"
                  type="password"
                  placeholder="••••••••"
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  class="mb-4"
                  required
                  :error="!!errors.password"
                  :error-messages="errors.password"
                  @keyup.enter="handleLogin"
                />

                <v-checkbox
                  v-model="form.rememberMe"
                  label="このデバイスで自動ログイン"
                  class="mb-6"
                />

                <v-btn
                  type="submit"
                  color="primary"
                  size="large"
                  block
                  :loading="isLoading"
                  class="mb-4"
                >
                  ログイン
                </v-btn>
              </v-form>

              <!-- エラーメッセージ -->
              <v-alert
                v-if="errors.general"
                type="error"
                variant="tonal"
                class="mb-4"
              >
                {{ errors.general }}
              </v-alert>

              <!-- デモ用情報 -->
              <v-card class="bg-blue-50 border" flat>
                <v-card-text class="text-caption">
                  <p class="font-semibold mb-2">デモログイン情報:</p>
                  <p><strong>メール:</strong> 現在未公開</p>
                  <p><strong>パス:</strong> 現在未公開</p>
                </v-card-text>
              </v-card>
            </v-card-text>

            <!-- フッター -->
            <v-card-actions class="pa-8 text-center justify-center">
              <p class="text-caption text-gray-600">
                © 2026 Admin Management System
              </p>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

const errors = ref({
  email: '',
  password: '',
  general: ''
})

const isLoading = ref(false)

const handleLogin = async () => {
  // バリデーション
  errors.value = { email: '', password: '', general: '' }

  if (!form.value.email) {
    errors.value.email = 'メールアドレスを入力してください'
    return
  }

  if (!form.value.password) {
    errors.value.password = 'パスワードを入力してください'
    return
  }

  if (form.value.email.length < 5 || !form.value.email.includes('@')) {
    errors.value.email = '正しいメールアドレスを入力してください'
    return
  }

  isLoading.value = true
  try {
    // デモ用: 簡単な認証
    if (form.value.email === 'admin@example.com' && form.value.password === 'password123') {
      await authStore.login(form.value.email, form.value.password)
      router.push('/dashboard')
    } else {
      errors.value.general = 'メールアドレスまたはパスワードが正しくありません'
    }
  } finally {
    isLoading.value = false
  }
}
</script>
