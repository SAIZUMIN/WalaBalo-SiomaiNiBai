import React from 'react';
import { BrandHeader } from './BrandHeader';

interface LoginPageProps {
  onScanSignIn: () => void;
  onSkipSignIn: () => void;
  onBack: () => void;
}

// Exact 13x13 module matrix matching the reference QR graphic
const QR_MATRIX: number[][] = [
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

export const LoginPage: React.FC<LoginPageProps> = ({
  onScanSignIn,
  onSkipSignIn,
  onBack,
}) => {
  return (
    <div className="kiosk-screen light-screen">
      <BrandHeader variant="light" onBack={onBack} />

      <main className="login-content">
        <h1 className="screen-heading login-heading">Sign In</h1>
        <p className="login-subtitle">Scan to log in to your loyalty account</p>

        <div
          className="qr-card"
          role="button"
          tabIndex={0}
          onClick={onScanSignIn}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onScanSignIn();
            }
          }}
          title="Click to simulate scanning your loyalty QR code"
        >
          <svg
            className="qr-code-svg"
            viewBox="0 0 13 13"
            shapeRendering="crispEdges"
            aria-label="Loyalty Login QR Code"
          >
            {QR_MATRIX.map((row, rIdx) =>
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

          <p className="qr-card-title">Scan this code</p>
          <p className="qr-card-desc">
            Use your phone&apos;s camera to scan the QR
            <br />
            code and log in instantly
          </p>
        </div>

        <button
          type="button"
          className="skip-signin-btn"
          onClick={onSkipSignIn}
        >
          <span className="skip-arrow" aria-hidden="true">→</span>
          <span>Skip sign in</span>
        </button>
      </main>
    </div>
  );
};
