import React, { useState } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { DiningOptionPage } from './components/DiningOptionPage';
import { LoginPage } from './components/LoginPage';
import { ProfilePage } from './components/ProfilePage';
import { OrderHistoryPage } from './components/OrderHistoryPage';
import { MainMenuPage } from './components/MainMenuPage';
import { CartPage } from './components/CartPage';
import {
  CartItem,
  DiningOption,
  INITIAL_CART_ITEMS,
  MenuItem,
  ScreenName,
} from './types';
import './App.css';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('welcome');
  const [diningOption, setDiningOption] = useState<DiningOption>(null);
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART_ITEMS);

  const handleStartOrder = () => {
    setCurrentScreen('dining');
  };

  const handleSelectDining = (option: Exclude<DiningOption, null>) => {
    setDiningOption(option);
    setCurrentScreen('login');
  };

  const handleScanSignIn = () => {
    setCurrentScreen('profile');
  };

  const handleSkipSignIn = () => {
    setCurrentScreen('menu');
  };

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((entry) =>
          entry.item.id === itemId
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((entry) => entry.item.id !== itemId));
  };

  return (
    <div className="kiosk-viewport">
      <div className="kiosk-container">
        {currentScreen === 'welcome' && (
          <WelcomePage onStartOrder={handleStartOrder} />
        )}

        {currentScreen === 'dining' && (
          <DiningOptionPage
            selectedOption={diningOption}
            onSelectOption={handleSelectDining}
            onBack={() => setCurrentScreen('welcome')}
          />
        )}

        {currentScreen === 'login' && (
          <LoginPage
            onScanSignIn={handleScanSignIn}
            onSkipSignIn={handleSkipSignIn}
            onBack={() => setCurrentScreen('dining')}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfilePage
            onSignOut={() => setCurrentScreen('login')}
            onViewAllHistory={() => setCurrentScreen('order-history')}
            onOrderNow={() => setCurrentScreen('menu')}
          />
        )}

        {currentScreen === 'order-history' && (
          <OrderHistoryPage
            onBackToProfile={() => setCurrentScreen('profile')}
            onOrderNow={() => setCurrentScreen('menu')}
          />
        )}

        {currentScreen === 'menu' && (
          <MainMenuPage
            cart={cart}
            onAddToCart={handleAddToCart}
            onViewCart={() => setCurrentScreen('cart')}
          />
        )}

        {currentScreen === 'cart' && (
          <CartPage
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onBack={() => setCurrentScreen('menu')}
            onProceedToPayment={() => {
              setCurrentScreen('welcome');
              setDiningOption(null);
              setCart(INITIAL_CART_ITEMS);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
