// ナビゲーションメニュー項目
export interface NavItem {
  title: string;
  icon: string;
  to?: string;
  children?: NavItem[];
  badge?: number | string;
}

export const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    title: 'ダッシュボード',
    icon: 'mdi-home-outline',
    to: '/dashboard'
  },
  {
    title: '商品',
    icon: 'mdi-package-variant-outline',
    to: '/items'
  },
  {
    title: '設定',
    icon: 'mdi-sliders-vertical',
    to: '/settings'
  },
  {
    title: 'カテゴリ管理',
    icon: 'mdi-list-box-outline',
    to: '/categories'
  },
  {
    title: '注文管理',
    icon: 'mdi-order-bool-ascending-variant',
    to: '/orders'
  },
  {
    title: 'ユーザー管理',
    icon: 'mdi-users-outline',
    to: '/users'
  }
];
