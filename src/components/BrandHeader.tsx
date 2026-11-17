import React from 'react';

interface BrandHeaderProps {
  variant: 'dark' | 'light' | 'compact';
  onBack?: () => void;
  backLabel?: string;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  variant,
  onBack,
  backLabel,
}) => {
  const isDark = variant === 'dark';
  const isCompact = variant === 'compact';

  return (
    <header
      className={`brand-header ${
        isDark
          ? 'brand-header--dark'
          : isCompact
          ? 'brand-header--compact'
          : 'brand-header--light'
      }`}
    >
      {onBack && (
        <button
          type="button"
          className={`back-button ${backLabel ? 'back-button--with-label' : ''}`}
          onClick={onBack}
          aria-label={backLabel || 'Go back'}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="back-arrow-icon"
            aria-hidden="true"
          >
            <path
              d="M19 12H5M5 12L11 6M5 12L11 18"
              stroke="#7B1113"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {backLabel && <span className="back-button-label">{backLabel}</span>}
        </button>
      )}

      <div className="brand-lockup">
        <img
          src="/assets/Frame 45.png"
          alt="Siomai basket logo"
          className="brand-logo-img"
        />
        <div className="brand-text">
          <span className="brand-title">SIOMAI</span>
          <span className="brand-subtitle">Delicious &amp; Affordable</span>
        </div>
      </div>
    </header>
  );
};
