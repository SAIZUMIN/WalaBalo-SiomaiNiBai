import React, { useState } from 'react';
import {
  CartItem,
  DiningOption,
  MENU_ITEMS,
  MenuItem,
} from '../types';

interface MainMenuPageProps {
  cart: CartItem[];
  diningOption: DiningOption;
  isSignedIn: boolean;
  loyaltyPoints: number;
  onToggleDiningOption: () => void;
  onAccountClick: () => void;
  onBack: () => void;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onViewCart: () => void;
}

export const MainMenuPage: React.FC<MainMenuPageProps> = ({
  cart,
  diningOption,
  onToggleDiningOption,
  onBack,
  onAddToCart,
  onViewCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<'siomai' | 'drinks'>('siomai');
  const [searchQuery, setSearchQuery] = useState('');

  const isSearching = searchQuery.trim().length > 0;

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
    if (isSearching) {
      return matchesSearch;
    }
    return item.category === activeCategory;
  });

  const getItemQuantity = (itemId: string): number => {
    const found = cart.find((entry) => entry.item.id === itemId);
    return found ? found.quantity : 0;
  };

  const totalItems = cart.reduce((sum, entry) => sum + entry.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );

  return (
    <div className="kiosk-screen light-screen">
      <main className="menu-content">
        {/* Clean, minimal top navigation bar */}
        <div className="menu-status-bar">
          <button
            type="button"
            className="menu-back-chip"
            onClick={onBack}
            aria-label="Go back"
          >
            <span aria-hidden="true">←</span>
            <span>Back</span>
          </button>

          <button
            type="button"
            className="menu-context-pill"
            onClick={onToggleDiningOption}
            title="Tap to switch between Dine In and Take Out"
          >
            <span>{diningOption}</span>
            <span className="context-pill-swap" aria-hidden="true">⇄</span>
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="menu-search-bar">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="menu-search-icon"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="6.5"
              stroke="#4A4845"
              strokeWidth="2"
            />
            <path
              d="M16 16L20.5 20.5"
              stroke="#4A4845"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            className="menu-search-input"
            placeholder="Search Items"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search Items"
          />
          {isSearching && (
            <button
              type="button"
              className="menu-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="menu-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'siomai'}
            className={`menu-tab ${
              activeCategory === 'siomai' && !isSearching ? 'menu-tab--active' : ''
            }`}
            onClick={() => {
              setActiveCategory('siomai');
              setSearchQuery('');
            }}
          >
            Siomai
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'drinks'}
            className={`menu-tab ${
              activeCategory === 'drinks' && !isSearching ? 'menu-tab--active' : ''
            }`}
            onClick={() => {
              setActiveCategory('drinks');
              setSearchQuery('');
            }}
          >
            Drinks
          </button>
        </div>

        {/* Scrollable 3-Column Product Grid */}
        <div className="menu-grid-scroll">
          {filteredItems.length === 0 ? (
            <div className="menu-empty-search">
              <p className="menu-empty-title">No items found</p>
              <button
                type="button"
                className="menu-empty-reset"
                onClick={() => setSearchQuery('')}
              >
                Reset search
              </button>
            </div>
          ) : (
            <div className="menu-grid">
              {filteredItems.map((item) => {
                const qty = getItemQuantity(item.id);
                return (
                  <div
                    key={item.id}
                    className={`menu-card ${qty > 0 ? 'menu-card--in-cart' : ''}`}
                  >
                    <div className="menu-card-img-box">
                      {qty > 0 && (
                        <span className="menu-card-qty-dot">{qty}</span>
                      )}
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`menu-card-img ${
                          item.category === 'drinks'
                            ? 'menu-card-img--drink'
                            : 'menu-card-img--siomai'
                        }`}
                      />
                    </div>

                    <div className="menu-card-info">
                      <h3 className="menu-card-title">{item.name}</h3>
                      <p className="menu-card-subtitle">{item.subtitle}</p>
                    </div>

                    <div className="menu-card-footer">
                      <span className="menu-card-price">
                        ₱{item.price.toFixed(2)}
                      </span>
                      <button
                        type="button"
                        className="menu-add-btn"
                        onClick={() => onAddToCart(item)}
                        aria-label={`Add ${item.name} to cart`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="menu-add-icon"
                          aria-hidden="true"
                        >
                          <path
                            d="M12 5V19M5 12H19"
                            stroke="#FFFFFF"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Cart Summary Bar */}
        <div
          className="menu-cart-bar"
          onClick={() => {
            if (totalItems > 0) onViewCart();
          }}
          role="region"
          aria-label="Cart summary"
        >
          <div className="menu-cart-left">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="menu-cart-icon"
              aria-hidden="true"
            >
              <path
                d="M3 4H5L6.6 14.5C6.7 15.3 7.4 16 8.3 16H17.8C18.6 16 19.3 15.4 19.5 14.6L21 7H6"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="19.5" r="1.6" fill="#FFFFFF" />
              <circle cx="17" cy="19.5" r="1.6" fill="#FFFFFF" />
            </svg>
            <span className="menu-cart-count">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="menu-cart-right">
            <span className="menu-cart-total">₱ {totalPrice.toFixed(2)}</span>
            <button
              type="button"
              className="view-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                onViewCart();
              }}
            >
              <span>View Cart</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
