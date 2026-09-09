import React from 'react';
import { getAssetPath } from '../utils/assetHelper';

export default function Header({ slide }) {
  if (slide.type === 'title') {
    return (
      <header className="slide-header" style={{ height: '90px' }}>
        <svg className="header-wave-svg" viewBox="0 0 1366 90" fill="none" preserveAspectRatio="none">
          <path
            d="M 0 0 L 1366 0 L 1366 40 C 1150 75 920 15 650 35 C 380 55 180 80 0 45 Z"
            fill="#64D9EF"
            opacity="0.85"
          />
          <path
            d="M 0 0 L 1366 0 L 1366 25 C 1100 55 880 20 580 40 C 280 60 120 70 0 35 Z"
            fill="#1BB5D8"
            opacity="0.9"
          />
        </svg>
        <div className="header-content" style={{ justifyContent: 'flex-end' }}>
          <img
            src={getAssetPath('infnet_logo.png')}
            alt="Instituto Infnet"
            className="header-logo"
          />
        </div>
      </header>
    );
  }

  return (
    <header className="slide-header">
      <svg className="header-wave-svg" viewBox="0 0 1366 100" fill="none" preserveAspectRatio="none">
        <path
          d="M 0 0 L 1366 0 L 1366 45 C 1180 85 950 20 680 40 C 400 60 200 90 0 50 Z"
          fill="#64D9EF"
          opacity="0.85"
        />
        <path
          d="M 0 0 L 1366 0 L 1366 30 C 1120 65 900 25 600 45 C 300 65 140 75 0 40 Z"
          fill="#1BB5D8"
          opacity="0.9"
        />
      </svg>
      <div className="header-content">
        <div className="header-title-group">
          <div className="header-badge-row">
            {slide.category && (
              <span className="header-category-badge">{slide.category}</span>
            )}
            {slide.tag && (
              <span className="badge badge-cyan">{slide.tag}</span>
            )}
          </div>
          <h1 className="header-slide-title">{slide.title}</h1>
          {slide.subtitle && (
            <p className="header-slide-subtitle">{slide.subtitle}</p>
          )}
        </div>
        <img
          src={getAssetPath('infnet_logo.png')}
          alt="Instituto Infnet"
          className="header-logo"
        />
      </div>
    </header>
  );
}
