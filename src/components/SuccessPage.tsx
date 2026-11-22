import React from 'react';

interface SuccessPageProps {
  mode: 'counter' | 'ewallet';
  queueNumber: string;
  totalAmount: number;
  pointsEarned: number;
  onDone: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({
  mode,
  queueNumber,
  totalAmount,
  pointsEarned,
  onDone,
}) => {
  const isCounter = mode === 'counter';

  return (
    <div className="kiosk-screen success-screen">
      <img
        src="/assets/success_bg.png"
        alt=""
        className="success-bg-img"
        aria-hidden="true"
      />

      <main className="success-content">
        <h1 className="success-top-title">Order Placed!</h1>

        {/* Animated Checkmark Emblem */}
        <div className="animated-check-wrap" aria-hidden="true">
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

        {/* Status Message Block */}
        {isCounter ? (
          <div className="success-status-block">
            <p className="success-counter-note">
              Remember #{queueNumber}.
              <br />
              Please pay at the counter.
            </p>
          </div>
        ) : (
          <div className="success-status-block">
            <h2 className="success-ewallet-title">Payment Successful!</h2>
            <p className="success-ewallet-note">Please wait for your order.</p>
          </div>
        )}

        {/* Order Ticket / Queue Number Card */}
        <section
          className={`success-ticket-card ${
            isCounter
              ? 'success-ticket-card--counter'
              : 'success-ticket-card--ewallet'
          }`}
          aria-label="Order Ticket"
        >
          <p className="success-ticket-header">Order Ticket / Queue Number</p>
          <p className="success-ticket-number">#{queueNumber}</p>
          <p className="success-ticket-status">
            {isCounter ? 'Pending Payment' : 'Paid Online'}
          </p>

          <div className="success-ticket-divider" />

          <div className="success-ticket-amount-row">
            <span>{isCounter ? 'Amount Due' : 'Total Amount'}</span>
            <span className="success-ticket-price">
              ₱ {totalAmount.toFixed(2)}
            </span>
          </div>

          <p className="success-ticket-points">
            +{pointsEarned} {isCounter ? 'points Earned!' : 'Points Earned!'}
          </p>
        </section>

        <button
          type="button"
          className="success-done-btn"
          onClick={onDone}
        >
          Done
        </button>
      </main>
    </div>
  );
};
