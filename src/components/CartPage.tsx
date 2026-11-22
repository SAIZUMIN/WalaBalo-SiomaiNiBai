import React, { useState } from 'react';
import { BrandHeader } from './BrandHeader';
import { CartItem } from '../types';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onBack: () => void;
  onProceedToPayment: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onBack,
  onProceedToPayment,
}) => {
  const [useRewardPoints, setUseRewardPoints] = useState(false);

  const subtotal = cart.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );
  const discount = useRewardPoints && subtotal >= 10 ? 10 : 0;
  const totalAmount = Math.max(0, subtotal - discount);

  return (
    <div className="kiosk-screen light-screen">
      <BrandHeader
        variant="compact"
        onBack={onBack}
        backLabel="Back"
      />

      <main className="cart-content">
        <h1 className="cart-heading">Cart Summary</h1>

        <div className="cart-items-list">
          {cart.map(({ item, quantity }) => (
            <div key={item.id} className="cart-item-card">
              <div className="cart-item-thumb-wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  className={`cart-item-thumb ${
                    item.category === 'drinks'
                      ? 'cart-item-thumb--drink'
                      : 'cart-item-thumb--siomai'
                  }`}
                />
              </div>

              <div className="cart-item-center">
                <div className="cart-item-top-row">
                  <div className="cart-item-titles">
                    <h3 className="cart-item-name">{item.name}</h3>
                    {item.subtitle && (
                      <p className="cart-item-subtitle">{item.subtitle}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    className="cart-item-delete-btn"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="cart-delete-icon"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 7H20M9 7V5C9 4.4 9.4 4 10 4H14C14.6 4 15 4.4 15 5V7M6 7L7 19C7 19.6 7.4 20 8 20H16C16.6 20 17 19.6 17 19L18 7"
                        stroke="#B85D5E"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="cart-qty-controls">
                  <button
                    type="button"
                    className="cart-qty-btn"
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>
                  <span className="cart-qty-badge">{quantity}</span>
                  <button
                    type="button"
                    className="cart-qty-btn"
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-price">
                ₱ {(item.price * quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Use Reward Points Card */}
        <div className="reward-points-card">
          <div className="reward-top-row">
            <span className="reward-title">Use Reward Points</span>
            <button
              type="button"
              role="switch"
              aria-checked={useRewardPoints}
              className={`reward-switch ${
                useRewardPoints ? 'reward-switch--on' : ''
              }`}
              onClick={() => setUseRewardPoints((prev) => !prev)}
              aria-label="Use Reward Points"
            >
              <span className="reward-switch-knob" />
            </button>
          </div>
          <p className="reward-desc">Use 50 points to deduct ₱ 10.00</p>
          <p className="reward-avail">(Available Points: 100)</p>
        </div>

        {/* Total Amount Row */}
        <div className="cart-total-card">
          <span className="cart-total-label">Total Amount</span>
          <span className="cart-total-value">₱ {totalAmount.toFixed(2)}</span>
        </div>

        {/* Proceed To Payment Button */}
        <button
          type="button"
          className="proceed-payment-btn"
          onClick={onProceedToPayment}
        >
          <span>Proceed To Payment</span>
          <span aria-hidden="true">→</span>
        </button>
      </main>
    </div>
  );
};
