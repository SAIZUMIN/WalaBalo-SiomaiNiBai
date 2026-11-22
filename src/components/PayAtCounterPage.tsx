import React from 'react';
import { BrandHeader } from './BrandHeader';
import { CartItem } from '../types';

interface PayAtCounterPageProps {
  cart: CartItem[];
  discount: number;
  onBack: () => void;
  onProceedToCounter: () => void;
}

export const PayAtCounterPage: React.FC<PayAtCounterPageProps> = ({
  cart,
  discount,
  onBack,
  onProceedToCounter,
}) => {
  const subtotal = cart.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );
  const totalAmount = Math.max(0, subtotal - discount);

  return (
    <div className="kiosk-screen light-screen">
      <BrandHeader
        variant="compact"
        onBack={onBack}
        backLabel="Back"
      />

      <main className="counter-content">
        <h1 className="payment-subpage-heading">Pay to Counter</h1>
        <p className="payment-subpage-subtitle">
          Please proceed to the counter to complete your payment.
        </p>

        {/* How to Pay Box */}
        <section className="how-to-pay-card" aria-label="How to Pay">
          <h2 className="how-to-pay-title">How to Pay</h2>

          <ol className="how-to-pay-steps">
            <li className="how-to-pay-step">
              <span className="step-number-circle" aria-hidden="true">1</span>
              <span className="step-text">Go to the payment counter.</span>
            </li>
            <li className="how-to-pay-step">
              <span className="step-number-circle" aria-hidden="true">2</span>
              <span className="step-text">Show your order to the cashier.</span>
            </li>
            <li className="how-to-pay-step">
              <span className="step-number-circle" aria-hidden="true">3</span>
              <span className="step-text">Pay and collect your receipt.</span>
            </li>
          </ol>
        </section>

        {/* Order Summary Box */}
        <section className="payment-summary-card" aria-label="Order Summary">
          <h2 className="payment-summary-title">Order Summary</h2>

          <div className="payment-summary-list">
            {cart.map(({ item, quantity }) => (
              <div key={item.id} className="payment-summary-row">
                <span className="payment-summary-item">
                  {quantity}x {item.name}
                </span>
                <span className="payment-summary-price">
                  ₱ {(item.price * quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="payment-summary-divider" />

          <div className="payment-summary-total-row">
            <span className="payment-summary-total-label">Total Amount</span>
            <span className="payment-summary-total-value">
              ₱ {totalAmount.toFixed(2)}
            </span>
          </div>
        </section>

        <button
          type="button"
          className="payment-bottom-btn"
          onClick={onProceedToCounter}
        >
          Proceed to Counter
        </button>
      </main>
    </div>
  );
};
