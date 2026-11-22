import React, { useState } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { DiningOptionPage } from './components/DiningOptionPage';
import { LoginPage } from './components/LoginPage';
import { ProfilePage } from './components/ProfilePage';
import { OrderHistoryPage } from './components/OrderHistoryPage';
import { MainMenuPage } from './components/MainMenuPage';
import { CartPage } from './components/CartPage';
import { PaymentOptionPage } from './components/PaymentOptionPage';
import { EWalletPage } from './components/EWalletPage';
import { PayAtCounterPage } from './components/PayAtCounterPage';
import {
  CartItem,
  DiningOption,
  INITIAL_CART_ITEMS,
  MENU_ITEMS,
  MenuItem,
  ScreenName,
} from './types';
import './App.css';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('welcome');
  const [diningOption, setDiningOption] = useState<DiningOption>('DINE IN');
  const [isSignedIn, setIsSignedIn] = useState<boolean>(true);
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(100);
  const [useRewardPoints, setUseRewardPoints] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  const handleStartOrder = () => {
    setCurrentScreen('dining');
  };

  const handleSelectDining = (option: DiningOption) => {
    setDiningOption(option);
    setCurrentScreen('login');
  };

  const handleToggleDining = () => {
    setDiningOption((prev) => {
      const next = prev === 'DINE IN' ? 'TAKE OUT' : 'DINE IN';
      triggerToast(`Switched order mode to ${next}`);
      return next;
    });
  };

  const handleScanSignIn = () => {
    setIsSignedIn(true);
    triggerToast('Signed in as Emma (100 Points)');
    setCurrentScreen('profile');
  };

  const handleSkipSignIn = () => {
    setIsSignedIn(false);
    setUseRewardPoints(false);
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
    triggerToast(`Added ${item.name} to cart`);
  };

  const handleReorderById = (menuItemId: string, itemName: string) => {
    const found = MENU_ITEMS.find((m) => m.id === menuItemId);
    if (found) {
      handleAddToCart(found);
      triggerToast(`Added ${itemName} to cart!`);
    }
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

  const handleRestoreItem = (entry: CartItem) => {
    setCart((prev) => [...prev, entry]);
    triggerToast(`Restored ${entry.item.name}`);
  };

  const handleResetOrder = () => {
    setCurrentScreen('welcome');
    setDiningOption('DINE IN');
    setCart(INITIAL_CART_ITEMS);
    setUseRewardPoints(false);
    setLoyaltyPoints(100);
  };

  const subtotal = cart.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );
  const discount =
    useRewardPoints && loyaltyPoints >= 50 && subtotal >= 10 ? 10 : 0;

  return (
    <div className="kiosk-viewport">
      <div className="kiosk-container">
        {toastMessage && (
          <div className="kiosk-toast" role="status" aria-live="polite">
            {toastMessage}
          </div>
        )}

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
            diningOption={diningOption}
            onScanSignIn={handleScanSignIn}
            onSkipSignIn={handleSkipSignIn}
            onBack={() => setCurrentScreen('dining')}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfilePage
            points={loyaltyPoints}
            onSignOut={() => {
              setIsSignedIn(false);
              setCurrentScreen('login');
            }}
            onViewAllHistory={() => setCurrentScreen('order-history')}
            onReorderItem={handleReorderById}
            onOrderNow={() => setCurrentScreen('menu')}
          />
        )}

        {currentScreen === 'order-history' && (
          <OrderHistoryPage
            onBackToProfile={() => setCurrentScreen('profile')}
            onReorderItem={handleReorderById}
            onOrderNow={() => setCurrentScreen('menu')}
          />
        )}

        {currentScreen === 'menu' && (
          <MainMenuPage
            cart={cart}
            diningOption={diningOption}
            isSignedIn={isSignedIn}
            loyaltyPoints={loyaltyPoints}
            onToggleDiningOption={handleToggleDining}
            onAccountClick={() =>
              setCurrentScreen(isSignedIn ? 'profile' : 'login')
            }
            onBack={() =>
              setCurrentScreen(isSignedIn ? 'profile' : 'login')
            }
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onViewCart={() => setCurrentScreen('cart')}
          />
        )}

        {currentScreen === 'cart' && (
          <CartPage
            cart={cart}
            diningOption={diningOption}
            isSignedIn={isSignedIn}
            loyaltyPoints={loyaltyPoints}
            useRewardPoints={useRewardPoints}
            onToggleRewardPoints={() => setUseRewardPoints((prev) => !prev)}
            onToggleDiningOption={handleToggleDining}
            onSignInRequest={() => setCurrentScreen('login')}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onRestoreItem={handleRestoreItem}
            onBack={() => setCurrentScreen('menu')}
            onProceedToPayment={() => setCurrentScreen('payment-option')}
          />
        )}

        {currentScreen === 'payment-option' && (
          <PaymentOptionPage
            onSelectPayAtCounter={() => setCurrentScreen('pay-counter')}
            onSelectEWallet={() => setCurrentScreen('ewallet')}
            onBack={() => setCurrentScreen('cart')}
          />
        )}

        {currentScreen === 'ewallet' && (
          <EWalletPage
            cart={cart}
            discount={discount}
            onBack={() => setCurrentScreen('payment-option')}
            onChangePaymentMethod={() => setCurrentScreen('payment-option')}
            onCompletePayment={handleResetOrder}
          />
        )}

        {currentScreen === 'pay-counter' && (
          <PayAtCounterPage
            cart={cart}
            discount={discount}
            onBack={() => setCurrentScreen('payment-option')}
            onProceedToCounter={handleResetOrder}
          />
        )}
      </div>
    </div>
  );
};

export default App;
