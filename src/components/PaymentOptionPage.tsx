import React from 'react';
import { BrandHeader } from './BrandHeader';

interface PaymentOptionPageProps {
  onSelectPayAtCounter: () => void;
  onSelectEWallet: () => void;
  onBack: () => void;
}

export const PaymentOptionPage: React.FC<PaymentOptionPageProps> = ({
  onSelectPayAtCounter,
  onSelectEWallet,
  onBack,
}) => {
  return (
    <div className="kiosk-screen light-screen">
      <BrandHeader
        variant="compact"
        onBack={onBack}
        backLabel="Back"
      />

      <main className="payment-option-content">
        <h1 className="payment-option-heading">Payment Method</h1>
        <p className="payment-option-subtitle">How would you like to pay?</p>

        <div className="payment-option-cards">
          {/* Card 1: Pay at Counter */}
          <button
            type="button"
            className="payment-option-card"
            onClick={onSelectPayAtCounter}
          >
            <div className="payment-option-icon-wrap" aria-hidden="true">
              {/* Cashier at Counter SVG matching reference design */}
              <svg viewBox="0 0 64 64" fill="none" className="payment-option-svg">
                {/* Cashier head */}
                <circle cx="28" cy="14" r="6" fill="#7B0D0E" />
                {/* Cashier shoulders/torso */}
                <path
                  d="M18 30C18 24.5 22.5 22 28 22C33.5 22 38 24.5 38 30V32H18V30Z"
                  fill="#7B0D0E"
                />
                {/* Register / box on right side of counter */}
                <rect x="41" y="27" width="11" height="8" rx="1.5" fill="#E0A958" />
                <rect x="43" y="30" width="7" height="2" rx="0.8" fill="#7B0D0E" />
                {/* Counter top */}
                <rect x="8" y="34" width="48" height="20" rx="4" fill="#7B0D0E" />
                {/* White horizontal slot on counter */}
                <rect x="17" y="40" width="22" height="3.2" rx="1.6" fill="#FFFFFF" />
              </svg>
            </div>

            <div className="payment-option-text">
              <h2 className="payment-option-card-title">Pay at Counter</h2>
              <p className="payment-option-card-desc">
                Go to the counter and pay with cash
                <br />
                or other accepted methods.
              </p>
            </div>
          </button>

          {/* Card 2: E-Wallet Payment */}
          <button
            type="button"
            className="payment-option-card"
            onClick={onSelectEWallet}
          >
            <div className="payment-option-icon-wrap" aria-hidden="true">
              {/* Wallet SVG matching reference design */}
              <svg viewBox="0 0 64 64" fill="none" className="payment-option-svg">
                {/* Wallet main body */}
                <rect x="11" y="13" width="40" height="38" rx="4" fill="#7B0D0E" />
                {/* White clasp strap on right side */}
                <path
                  d="M36 27H51V37H36C34.3 37 33 35.7 33 34V30C33 28.3 34.3 27 36 27Z"
                  fill="#FFFFFF"
                />
                {/* Clasp button dot */}
                <circle cx="38" cy="32" r="2.2" fill="#7B0D0E" />
              </svg>
            </div>

            <div className="payment-option-text">
              <h2 className="payment-option-card-title">E-Wallet Payment</h2>
              <p className="payment-option-card-desc">
                GCash, Maya, or other supported e-
                <br />
                wallet apps.
              </p>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
};
