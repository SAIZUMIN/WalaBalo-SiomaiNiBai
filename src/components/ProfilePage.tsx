import React from 'react';
import { BrandHeader } from './BrandHeader';
import { ORDER_HISTORY_ITEMS } from '../types';

interface ProfilePageProps {
  points: number;
  onSignOut: () => void;
  onViewAllHistory: () => void;
  onReorderItem: (menuItemId: string, itemName: string) => void;
  onOrderNow: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  points,
  onSignOut,
  onViewAllHistory,
  onReorderItem,
  onOrderNow,
}) => {
  return (
    <div className="kiosk-screen light-screen">
      <BrandHeader
        variant="compact"
        onBack={onSignOut}
        backLabel="Sign out"
      />

      <main className="profile-content">
        <h1 className="profile-greeting">Welcome, Emma!</h1>

        <section className="points-card" aria-label="Points Balance">
          <p className="points-card-label">Points Balance</p>
          <div className="points-value-row">
            <svg
              viewBox="0 0 24 24"
              fill="#FFE600"
              className="points-star-icon"
              aria-hidden="true"
            >
              <path d="M12 2.4c.44 0 .85.25 1.05.65l2.18 4.42 4.88.71c.96.14 1.35 1.32.65 2l-3.53 3.44.83 4.86c.16.96-.84 1.69-1.7 1.24L12 17.42l-4.36 2.3c-.86.45-1.86-.28-1.7-1.24l.83-4.86-3.53-3.44c-.7-.68-.31-1.86.65-2l4.88-.71 2.18-4.42c.2-.4.61-.65 1.05-.65z" />
            </svg>
            <span className="points-value-text">{points} Points</span>
          </div>
          <p className="points-card-sub">Order to earn more</p>
        </section>

        <section className="history-section">
          <div className="history-header-row">
            <h2 className="history-section-title">Order History</h2>
            <button
              type="button"
              className="view-all-btn"
              onClick={onViewAllHistory}
            >
              View all
            </button>
          </div>

          <div className="history-list history-list--compact">
            {ORDER_HISTORY_ITEMS.map((item) => (
              <div
                key={item.id}
                className="history-item history-item--compact"
                onClick={() => onReorderItem(item.menuItemId, item.name)}
                role="button"
                tabIndex={0}
                title={`Tap to add ${item.name} to cart`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="history-item-thumb"
                />
                <span className="history-item-name">{item.name}</span>
                <span className="history-item-price">{item.price}</span>
              </div>
            ))}
          </div>
        </section>

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
