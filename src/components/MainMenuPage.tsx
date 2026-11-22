import React, { useState } from 'react';
import { CartItem, MENU_ITEMS, MenuCategory, MenuItem } from '../types';

interface MainMenuPageProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onViewCart: () => void;
}

export const MainMenuPage: React.FC<MainMenuPageProps> = ({
  cart,
  onAddToCart,
  onViewCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('siomai');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalItems = cart.reduce((sum, entry) => sum + entry.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );

  return (
    <div className="kiosk-screen light-screen">
      <main className="menu-content">
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
        </div>

        {/* Category Tabs */}
        <div className="menu-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'siomai'}
            className={`menu-tab ${
              activeCategory === 'siomai' ? 'menu-tab--active' : ''
            }`}
            onClick={() => setActiveCategory('siomai')}
          >
            Siomai
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'drinks'}
            className={`menu-tab ${
              activeCategory === 'drinks' ? 'menu-tab--active' : ''
            }`}
            onClick={() => setActiveCategory('drinks')}
          >
            Drinks
          </button>
        </div>

        {/* 2x2 Product Grid */}
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="menu-card">
              <div className="menu-card-img-box">
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
                <p className="menu-card-subtitle">
                  {item.subtitle ? item.subtitle : '\u00A0'}
                </p>
              </div>

              <div className="menu-card-footer">
                <span className="menu-card-price">
                  ₱ {item.price.toFixed(2)}
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
          ))}
        </div>

        {/* Bottom Cart Summary Bar */}
        <div className="menu-cart-bar">
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
              onClick={onViewCart}
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
