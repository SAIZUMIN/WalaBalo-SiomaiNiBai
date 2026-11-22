export type ScreenName =
  | 'welcome'
  | 'dining'
  | 'login'
  | 'profile'
  | 'order-history'
  | 'menu'
  | 'cart';

export type DiningOption = 'DINE IN' | 'TAKE OUT' | null;

export type MenuCategory = 'siomai' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  category: MenuCategory;
  image: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface OrderHistoryItem {
  id: string;
  name: string;
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
    id: 'coke',
    name: 'Coke',
    price: 15,
    category: 'drinks',
    image: '/assets/coke.png',
  },
  {
    id: 'royal',
    name: 'Royal',
    price: 15,
    category: 'drinks',
    image: '/assets/royal.png',
  },
  {
    id: 'sprite',
    name: 'Sprite',
    price: 15,
    category: 'drinks',
    image: '/assets/sprite.png',
  },
  {
    id: 'pepsi',
    name: 'Pepsi',
    price: 15,
    category: 'drinks',
    image: '/assets/pepsi.png',
  },
];

export const INITIAL_CART_ITEMS: CartItem[] = [
  { item: MENU_ITEMS[0], quantity: 1 }, // Pork Siomai
  { item: MENU_ITEMS[2], quantity: 1 }, // Beef Siomai
  { item: MENU_ITEMS[1], quantity: 1 }, // Chicken Siomai
  { item: MENU_ITEMS[4], quantity: 1 }, // Coke
];

export const ORDER_HISTORY_ITEMS: OrderHistoryItem[] = [
  {
    id: 'pork',
    name: 'Pork Siomai',
    price: '- ₱35.00',
    image: '/assets/pork_siomai.png',
  },
  {
    id: 'beef',
    name: 'Beef Siomai',
    price: '- ₱35.00',
    image: '/assets/beef_siomai.png',
  },
  {
    id: 'spicy',
    name: 'Spicy Siomai',
    price: '- ₱35.00',
    image: '/assets/spicy_siomai.png',
  },
  {
    id: 'chicken',
    name: 'Chicken Siomai',
    price: '- ₱35.00',
    image: '/assets/chicken_siomai.png',
  },
];
