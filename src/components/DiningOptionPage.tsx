import React from 'react';
import { BrandHeader } from './BrandHeader';
import { DiningOption } from '../types';

interface DiningOptionPageProps {
  selectedOption: DiningOption | null;
  onSelectOption: (option: DiningOption) => void;
  onBack: () => void;
}

export const DiningOptionPage: React.FC<DiningOptionPageProps> = ({
  selectedOption,
  onSelectOption,
  onBack,
}) => {
  return (
    <div className="kiosk-screen light-screen">
      <BrandHeader variant="light" onBack={onBack} />

      <main className="dining-content">
        <h1 className="screen-heading">
          Where are
          <br />
          you eating, bai?
        </h1>

        <div className="dining-cards">
          <button
            type="button"
            className={`dining-card ${
              selectedOption === 'DINE IN' ? 'dining-card--selected' : ''
            }`}
            onClick={() => onSelectOption('DINE IN')}
          >
            <div className="dining-icon-box" aria-hidden="true">
              <svg viewBox="0 0 36 36" fill="none" className="dining-svg-icon">
                <rect x="7" y="10" width="3" height="2" rx="0.5" fill="#F7F5EE" />
                <rect x="7" y="13" width="3" height="5" rx="0.8" fill="#F7F5EE" />
                <circle cx="18" cy="14.5" r="4" fill="#F7F5EE" />
                <rect x="26" y="10" width="3" height="2" rx="0.5" fill="#F7F5EE" />
                <rect x="26" y="13" width="3" height="5" rx="0.8" fill="#F7F5EE" />
                <rect x="6" y="24" width="24" height="2.4" rx="1.2" fill="#F7F5EE" />
              </svg>
            </div>
            <span className="dining-card-label">DINE IN</span>
          </button>

          <button
            type="button"
            className={`dining-card ${
              selectedOption === 'TAKE OUT' ? 'dining-card--selected' : ''
            }`}
            onClick={() => onSelectOption('TAKE OUT')}
          >
            <div className="dining-icon-box" aria-hidden="true">
              <svg viewBox="0 0 36 36" fill="none" className="dining-svg-icon">
                <rect x="14.5" y="9" width="7" height="2.2" rx="0.8" fill="#F7F5EE" />
                <rect x="14" y="12.5" width="8" height="8" rx="1" fill="#F7F5EE" />
                <rect x="6" y="24" width="24" height="2.4" rx="1.2" fill="#F7F5EE" />
              </svg>
            </div>
            <span className="dining-card-label">TAKE OUT</span>
          </button>
        </div>
      </main>
    </div>
  );
};
