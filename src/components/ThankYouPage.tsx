import React from 'react';
import { BrandHeader } from './BrandHeader';

interface ThankYouPageProps {
  onBackToHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ onBackToHome }) => {
  return (
    <div className="kiosk-screen success-screen">
      <img
        src="/assets/success_bg.png"
        alt=""
        className="success-bg-img"
        aria-hidden="true"
      />

      <BrandHeader variant="dark" />

      <main className="thankyou-content">
        {/* Animated Checkmark with Pulse & Sparkle Rings */}
        <div
          className="animated-check-wrap animated-check-wrap--thankyou"
          aria-hidden="true"
        >
          <span className="check-pulse-ring check-pulse-ring--1" />
          <span className="check-pulse-ring check-pulse-ring--2" />
          <div className="check-outer-circle">
            <div className="check-inner-circle">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="check-svg-icon"
              >
                <path
                  d="M6 12.5L10.2 16.5L18 8.5"
                  stroke="#7B0D0E"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="check-draw-path"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Animated Thank You Copy */}
        <div className="thankyou-text-block">
          <h1 className="thankyou-heading">
            Thank you for
            <br />
            your order!
          </h1>
          <p className="thankyou-subtitle">Enjoy the best siomai in town.</p>
        </div>

        <button
          type="button"
          className="thankyou-home-btn"
          onClick={onBackToHome}
        >
          Back to Home
        </button>
      </main>
    </div>
  );
};
