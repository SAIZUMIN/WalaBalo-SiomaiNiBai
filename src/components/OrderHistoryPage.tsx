import React from 'react';
import { BrandHeader } from './BrandHeader';
import { ORDER_HISTORY_ITEMS } from '../types';

interface OrderHistoryPageProps {
  onBackToProfile: () => void;
  onOrderNow: () => void;
}

export const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({
  onBackToProfile,
  onOrderNow,
}) => {
  return (
    <div className="kiosk-screen light-screen">
      <BrandHeader
        variant="compact"
        onBack={onBackToProfile}
        backLabel="Back to Profile"
      />

      <main className="order-history-content">
        <div className="order-history-heading-group">
          <h1 className="order-history-page-title">Order History</h1>
          <div className="order-history-underline" aria-hidden="true" />
        </div>

        <div className="history-list history-list--expanded">
          {ORDER_HISTORY_ITEMS.map((item) => (
            <div key={item.id} className="history-item history-item--expanded">
              <img
                src={item.image}
                alt={item.name}
                className="history-item-thumb history-item-thumb--large"
              />
              <span className="history-item-name">{item.name}</span>
              <span className="history-item-price">{item.price}</span>
            </div>
          ))}
        </div>

        <p className="history-end-caption">End of order history</p>

        <button
          type="button"
          className="order-now-btn"
          onClick={onOrderNow}
        >
          Order Now
        </button>
      </main>
    </div>
  );
};
