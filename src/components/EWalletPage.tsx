import React from 'react';
import { BrandHeader } from './BrandHeader';
import { CartItem } from '../types';

interface EWalletPageProps {
  cart: CartItem[];
  discount: number;
  onBack: () => void;
  onChangePaymentMethod: () => void;
  onCompletePayment: () => void;
}

const EWALLET_QR_MATRIX: number[][] = [
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
];

export const EWalletPage: React.FC<EWalletPageProps> = ({
  cart,
  discount,
  onBack,
  onChangePaymentMethod,
  onCompletePayment,
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

      <main className="ewallet-content">
        <h1 className="payment-subpage-heading">Scan to Pay</h1>
        <p className="payment-subpage-subtitle">
          Pay with GCash, Maya, or another supported e-wallet.
        </p>

        {/* QR Code Box */}
        <div
          className="ewallet-qr-card"
          role="button"
          tabIndex={0}
          onClick={onCompletePayment}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onCompletePayment();
            }
          }}
          title="Tap QR code to complete payment"
        >
          <svg
            className="ewallet-qr-svg"
            viewBox="0 0 13 13"
            shapeRendering="crispEdges"
            aria-label="E-Wallet Payment QR Code"
          >
            {EWALLET_QR_MATRIX.map((row, rIdx) =>
              row.map((cell, cIdx) =>
                cell === 1 ? (
                  <rect
                    key={`${rIdx}-${cIdx}`}
                    x={cIdx}
                    y={rIdx}
                    width={1}
                    height={1}
                    fill="#000000"
                  />
                ) : null
              )
            )}
          </svg>
          <p className="ewallet-qr-caption">
            Open your e-wallet app and scan this code to proceed.
          </p>
        </div>

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
          onClick={onChangePaymentMethod}
        >
          Change Payment Method
        </button>
      </main>
    </div>
  );
};
