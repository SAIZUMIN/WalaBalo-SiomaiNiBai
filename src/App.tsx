import React, { useState } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { DiningOptionPage } from './components/DiningOptionPage';
import { LoginPage } from './components/LoginPage';
import { ProfilePage } from './components/ProfilePage';
import { OrderHistoryPage } from './components/OrderHistoryPage';
import { DiningOption, ScreenName } from './types';
import './App.css';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('welcome');
  const [diningOption, setDiningOption] = useState<DiningOption>(null);

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
    setCurrentScreen('welcome');
    setDiningOption(null);
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
            onOrderNow={() => setCurrentScreen('welcome')}
          />
        )}

        {currentScreen === 'order-history' && (
          <OrderHistoryPage
            onBackToProfile={() => setCurrentScreen('profile')}
            onOrderNow={() => setCurrentScreen('welcome')}
          />
        )}
      </div>
    </div>
  );
};

export default App;
