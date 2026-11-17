import React from 'react';
import { BrandHeader } from './BrandHeader';

interface WelcomePageProps {
  onStartOrder: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onStartOrder }) => {
  return (
    <div className="kiosk-screen welcome-screen">
      <div className="welcome-light-rays" aria-hidden="true">
        <div className="ray ray-1" />
        <div className="ray ray-2" />
      </div>

      <BrandHeader variant="dark" />

      <div className="welcome-hero-copy">
        <p className="hero-line">Hot Siomai.</p>
        <p className="hero-line">Cool Drinks.</p>
        <p className="hero-line hero-line--accent">Great Value.</p>
      </div>

      <div className="welcome-steamer-area">
        <img
          src="/assets/steamer_hero.png"
          alt="Freshly steamed siomai in a bamboo steamer"
          className="steamer-hero-img"
        />
        <button
          type="button"
          className="start-order-btn"
          onClick={onStartOrder}
        >
          <span>Start your order</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="start-order-arrow"
            aria-hidden="true"
          >
            <path
              d="M5 12H19M19 12L13 6M19 12L13 18"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
