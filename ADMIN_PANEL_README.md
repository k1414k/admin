# 管理者ダッシュボード（Admin Panel）

Nuxt 3 + Vuetify + TypeScript で構築された充実した管理者向けアドミンダッシュボードです。

## 🎯 機能概要

### ✨ コア機能
- **ダッシュボード**: 統計情報、グラフ、最近の活動を一覧表示
- **ユーザー管理**: ユーザー一覧、追加、編集、削除
- **商品管理**: 商品一覧（グリッド/リスト表示切り替え）、カテゴリ管理
- **注文管理**: 注文一覧、ステータス更新
- **認証システム**: ログイン画面、セッション管理

### 📱 UI/UX機能
- Vuetifyコンポーネントライブラリで洗練されたUI
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **ダークモード対応**: テーマ切り替え機能
- **ナビゲーション**: サイドバー、トップバー、パンくずリスト
- **データテーブル**: ソート、フィルター、ページネーション
- **フォーム**: バリデーション付きのモーダルフォーム

---

## 📁 プロジェクト構成

```
admin/
├── src/
│   ├── components/
│   │   ├── layouts/
│   │   │   └── AdminLayout.vue          # メインレイアウト
│   │   └── common/
│   │       ├── StatCard.vue             # 統計カード
│   │       ├── DataTable.vue            # データテーブル
│   │       └── FormCard.vue             # フォームカード
│   │
│   ├── pages/
│   │   ├── login.vue                    # ログインページ
│   │   ├── dashboard.vue                # ダッシュボード
│   │   └── admin/
│   │       ├── users.vue                # ユーザー管理
│   │       ├── items.vue                # 商品管理
│   │       └── orders.vue               # 注文管理
│   │
│   ├── stores/
│   │   ├── auth.ts                      # 認証状態管理（Pinia）
│   │   └── dashboard.ts                 # ダッシュボード状態管理
│   │
│   ├── types/
│   │   ├── admin.ts                     # 型定義（User, Item, Order等）
│   │   └── navigation.ts                # ナビゲーション型定義
│   │
│   ├── composables/
│   │   └── （必要に応じて拡張）
│   │
│   ├── utils/
│   │   └── （ユーティリティ関数）
│   │
│   └── styles/
│       └── globals.css                  # グローバルスタイル
│
├── app/
│   └── app.vue                          # メインアプリケーション
│
├── public/                              # 静的ファイル
├── nuxt.config.ts                       # Nuxt設定
├── package.json
└── tsconfig.json
```

---

## 🚀 クイックスタート

### インストール
```bash
cd admin
npm install
# または
pnpm install
```

### 開発サーバーの起動
```bash
npm run dev
```
http://localhost:3000 でアクセス可能です

### ビルド
```bash
npm run build
npm run preview
```

---

## 🔐 デモログイン情報

| 項目 | 値 |
|-----|-----|
| メール | `admin@example.com` |
| パスワード | `password123` |

---

## 📊 ページ説明

### ダッシュボード (`/dashboard`)
- 4つの統計カード（ユーザー数、商品数、注文数、売上）
- 成長率の表示
- 売上推移グラフ（プレースホルダー）
- 最近の活動一覧
- 最近の注文テーブル

### ユーザー管理 (`/admin/users`)
- ユーザー一覧テーブル
- 検索フィルター
- ユーザー追加ダイアログ
- ユーザー編集機能
- ユーザー削除機能
- ステータス表示（アクティブ/非アクティブ）

### 商品管理 (`/admin/items`)
- グリッド/リスト表示の切り替え
- 商品検索
- ステータスフィルター（アクティブ/売却済み/削除済み）
- 商品追加ダイアログ
- 商品編集機能
- 商品削除機能
- 画像プレースホルダー（実装可能）

### 注文管理 (`/admin/orders`)
- 注文一覧テーブル
- 注文ID/商品名での検索
- ステータスフィルター
- 注文詳細表示・編集
- ステータス更新機能

---

## 🎨 Vuetifyコンポーネント

使用可能なコンポーネント：
- `v-app`, `v-app-bar`, `v-navigation-drawer` - レイアウト
- `v-card`, `v-sheet` - コンテナ
- `v-btn`, `v-icon`, `v-chip` - インタラクティブ要素
- `v-text-field`, `v-textarea`, `v-select`, `v-checkbox` - フォーム
- `v-data-table` - データテーブル
- `v-dialog`, `v-menu`, `v-list` - ナビゲーション/ダイアログ
- `v-alert`, `v-snackbar` - 通知
- `v-progress-circular`, `v-skeleton-loader` - ローディング

---

## 📦  状態管理（Pinia）

### useAuthStore
```typescript
// ログイン
await authStore.login(email, password)

// ログアウト
await authStore.logout()

// セッション確認
await authStore.checkSession()

// ゲッター
authStore.currentUser      // 現在のユーザー
authStore.isLoggedIn       // ログイン状態
```

### useDashboardStore
```typescript
// 統計情報取得
await dashboardStore.fetchStats()

// ゲッター
dashboardStore.getStats    // 統計データ
```

---

## 🔧 カスタマイズ

### テーマカラーの変更
`nuxt.config.ts` の `vuetify.vuetifyOptions.theme.themes` を編集：

```typescript
light: {
  colors: {
    primary: '#2563eb',      // メインカラー
    secondary: '#64748b',
    success: '#10b981',
    // ...
  }
}
```

### ナビゲーションメニューの追加
`src/types/navigation.ts` を編集：

```typescript
{
  title: '新しいメニュー',
  icon: 'mdi-icon-name',
  children: [
    {
      title: 'サブメニュー',
      icon: 'mdi-sub-icon',
      to: '/new-page'
    }
  ]
}
```

### APIの統合
`src/stores/` のストア内で API呼び出しを実装：

```typescript
const response = await $fetch('/api/endpoint', {
  method: 'POST',
  body: data
})
```

---

## 📱 レスポンシブ対応

- **デスクトップ** (lg以上): サイドバー常時表示
- **タブレット** (md): サイドバー展開/折りたたみ
- **モバイル** (sm以下): ハンバーガーメニュー

---

## 🛠  今後の拡張候補

- [ ] グラフライブラリ統合（Chart.js, Vue-Chartjs）
- [ ] API連携（Rails API）
- [ ] 高度なフィルター・検索
- [ ] エクスポート機能（CSV, PDF）
- [ ] ロール別アクセス制御（RBAC）
- [ ] 監査ログ
- [ ] リアルタイム通知
- [ ] プロフィール設定ページ
- [ ] ユーザーアクティビティ分析

---

## 📝 ライセンス

このプロジェクトはプライベート使用を想定しています。

---

## 💡 Tips

### コンポーネント再利用
汎用的なコンポーネント（StatCard、DataTable）は複数のページで再利用可能です。

### モックデータ
各ページにモックデータが含まれており、APIを実装するまで動作確認できます。

### デバッグ
Vue Devtools (ブラウザ拡張) を使用して、Pinia ストアの状態を確認できます。

---

**作成日**: 2024年2月27日  
**Nuxt**: 4.3.1  
**Vue**: 3.5.28  
**Vuetify**: v3 (via vuetify-nuxt-module)
