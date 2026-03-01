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
    title: '管理',
    icon: 'mdi-cog-outline',
    children: [
      {
        title: 'ユーザー',
        icon: 'mdi-account-multiple-outline',
        to: '/users'
      },
      {
        title: '商品',
        icon: 'mdi-package-variant-outline',
        to: '/items'
      },
      {
        title: '注文',
        icon: 'mdi-cart-outline',
        to: '/orders'
      }
    ]
  },
  {
    title: 'レポート',
    icon: 'mdi-chart-line-outline',
    children: [
      {
        title: '売上分析',
        icon: 'mdi-chart-bar-outline',
        to: '/reports/sales'
      },
      {
        title: 'ユーザー分析',
        icon: 'mdi-chart-pie-outline',
        to: '/reports/users'
      }
    ]
  },
  {
    title: '設定',
    icon: 'mdi-sliders-vertical',
    to: '/settings'
  }
];
