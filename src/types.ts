export type ScreenName =
  | 'welcome'
  | 'dining'
  | 'login'
  | 'profile'
  | 'order-history'
  | 'menu'
  | 'cart'
  | 'payment-option'
  | 'ewallet'
  | 'pay-counter'
  | 'success-counter'
  | 'success-ewallet'
  | 'thank-you';

export type DiningOption = 'DINE IN' | 'TAKE OUT';

export type MenuCategory = 'all' | 'siomai' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  category: 'siomai' | 'drinks';
  image: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface OrderHistoryItem {
  id: string;
  menuItemId: string;
  name: string;
  subtitle: string;
  price: string;
  image: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'pork',
    name: 'Pork Siomai',
    subtitle: '4 pcs.',
    price: 35,
    category: 'siomai',
    image: '/assets/pork_siomai.png',
  },
  {
    id: 'chicken',
    name: 'Chicken Siomai',
    subtitle: '4 pcs.',
    price: 35,
    category: 'siomai',
    image: '/assets/chicken_siomai.png',
  },
  {
    id: 'beef',
    name: 'Beef Siomai',
    subtitle: '4 pcs.',
    price: 35,
    category: 'siomai',
    image: '/assets/beef_siomai.png',
  },
  {
    id: 'spicy',
    name: 'Spicy Siomai',
    subtitle: '4 pcs.',
    price: 35,
    category: 'siomai',
    image: '/assets/spicy_siomai.png',
  },
  {
    id: 'pork-8',
    name: 'Pork Platter',
    subtitle: '8 pcs.',
    price: 65,
    category: 'siomai',
    image: '/assets/pork_siomai.png',
  },
  {
    id: 'beef-8',
    name: 'Beef Platter',
    subtitle: '8 pcs.',
    price: 65,
    category: 'siomai',
    image: '/assets/beef_siomai.png',
  },
  {
    id: 'spicy-8',
    name: 'Spicy Platter',
    subtitle: '8 pcs.',
    price: 65,
    category: 'siomai',
    image: '/assets/spicy_siomai.png',
  },
  {
    id: 'chicken-8',
    name: 'Chicken Platter',
    subtitle: '8 pcs.',
    price: 65,
    category: 'siomai',
    image: '/assets/chicken_siomai.png',
  },
  {
    id: 'family-box',
    name: 'Barkada Box',
    subtitle: '16 pcs.',
    price: 125,
    category: 'siomai',
    image: '/assets/pork_siomai.png',
  },
  {
    id: 'coke',
    name: 'Coke',
    subtitle: '237ml',
    price: 15,
    category: 'drinks',
    image: '/assets/coke.png',
  },
  {
    id: 'royal',
    name: 'Royal',
    subtitle: '237ml',
    price: 15,
    category: 'drinks',
    image: '/assets/royal.png',
  },
  {
    id: 'sprite',
    name: 'Sprite',
    subtitle: '237ml',
    price: 15,
    category: 'drinks',
    image: '/assets/sprite.png',
  },
  {
    id: 'pepsi',
    name: 'Pepsi',
    subtitle: '237ml',
    price: 15,
    category: 'drinks',
    image: '/assets/pepsi.png',
  },
  {
    id: 'coke-large',
    name: 'Coke Sakto Duo',
    subtitle: '2 Bottles',
    price: 28,
    category: 'drinks',
    image: '/assets/coke.png',
  },
  {
    id: 'sprite-large',
    name: 'Sprite Duo',
    subtitle: '2 Bottles',
    price: 28,
    category: 'drinks',
    image: '/assets/sprite.png',
  },
];

export const INITIAL_CART_ITEMS: CartItem[] = [
  { item: MENU_ITEMS[0], quantity: 1 }, // Pork Siomai
  { item: MENU_ITEMS[2], quantity: 1 }, // Beef Siomai
  { item: MENU_ITEMS[1], quantity: 1 }, // Chicken Siomai
  { item: MENU_ITEMS[9], quantity: 1 }, // Coke
];

export const ORDER_HISTORY_ITEMS: OrderHistoryItem[] = [
  {
    id: 'hist-pork',
    menuItemId: 'pork',
    name: 'Pork Siomai',
    subtitle: '4 pcs.',
    price: '- ₱35.00',
    image: '/assets/pork_siomai.png',
  },
  {
    id: 'hist-beef',
    menuItemId: 'beef',
    name: 'Beef Siomai',
    subtitle: '4 pcs.',
    price: '- ₱35.00',
    image: '/assets/beef_siomai.png',
  },
  {
    id: 'hist-spicy',
    menuItemId: 'spicy',
    name: 'Spicy Siomai',
    subtitle: '4 pcs.',
    price: '- ₱35.00',
    image: '/assets/spicy_siomai.png',
  },
  {
    id: 'hist-chicken',
    menuItemId: 'chicken',
    name: 'Chicken Siomai',
    subtitle: '4 pcs.',
    price: '- ₱35.00',
    image: '/assets/chicken_siomai.png',
  },
];
