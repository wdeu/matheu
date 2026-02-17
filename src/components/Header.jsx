import React from "react";
import { Settings } from "lucide-react";
import LanguageSwitcher from "../LanguageSwitcher.jsx";

const Header = ({ onOpenSettings, settingsLabel }) => {
  return (
    <div className='settings-bar'>
      <LanguageSwitcher />
      <button
        onClick={onOpenSettings}
        aria-label={settingsLabel}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          color: '#6b7280',
          transition: 'color 150ms',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#8b5cf6'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
      >
        <Settings size={28} />
      </button>
    </div>
  );
};

export default Header;
