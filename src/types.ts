export type ScreenName = 'welcome' | 'dining' | 'login' | 'profile' | 'order-history';

export type DiningOption = 'DINE IN' | 'TAKE OUT' | null;

export interface OrderHistoryItem {
  id: string;
  name: string;
  price: string;
  image: string;
}

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
