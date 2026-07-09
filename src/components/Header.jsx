import React from "react";
import { Settings, User, Presentation } from "lucide-react";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../LanguageSwitcher.jsx";

const segBtnStyle = (active) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '34px',
  height: '30px',
  background: active ? 'rgba(20,184,166,0.08)' : 'transparent',
  border: active ? '2px solid #14b8a6' : '2px solid transparent',
  borderRadius: '10px',
  boxShadow: active ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : 'none',
  transform: active ? 'translateY(1px)' : 'none',
  opacity: active ? 1 : 0.6,
  cursor: 'pointer',
  transition: 'all 150ms ease',
  flexShrink: 0,
});

const Header = ({ onOpenSettings, settingsLabel, classroomMode, onSetClassroomMode }) => {
  const { t } = useTranslation();
  return (
    <div className='settings-bar'>
      <LanguageSwitcher />

      <div
        role='group'
        aria-label={t('classroom.groupLabel')}
        style={{ display: 'flex', background: '#ccfbf1', borderRadius: '12px', padding: '3px', gap: '2px', flexShrink: 0 }}
      >
        <button
          onClick={() => onSetClassroomMode(false)}
          aria-label={t('classroom.individual')}
          aria-pressed={!classroomMode}
          style={segBtnStyle(!classroomMode)}
        >
          <User size={17} color='#0f766e' />
        </button>
        <button
          onClick={() => onSetClassroomMode(true)}
          aria-label={t('classroom.classroom')}
          aria-pressed={classroomMode}
          style={segBtnStyle(classroomMode)}
        >
          <Presentation size={17} color='#0f766e' />
        </button>
      </div>

      <div style={{ width: '1px', height: '24px', background: '#99d8cc', flexShrink: 0 }} />

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
        onMouseEnter={(e) => e.currentTarget.style.color = '#14b8a6'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
      >
        <Settings size={28} />
      </button>
    </div>
  );
};

export default Header;
