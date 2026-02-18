import React from "react";
import { useTranslation } from 'react-i18next';

const LevelComplete = ({
  currentLevelId,
  levelCompleteData,
  onNextLevel,
  onLevelSelection,
  onMainMenu,
}) => {
  const { t } = useTranslation();

  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 p-8' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className='bg-white rounded-3xl shadow-2xl max-w-md w-full text-center' style={{ padding: 'clamp(1.5rem, 5vw, 2rem)' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 1.875rem)', fontWeight: 700, marginBottom: '1rem', color: '#059669' }}>
          {t('levelComplete.title')} 🎉
        </h2>
        <div className='mb-6'>
          <div style={{ fontSize: 'clamp(3rem, 10vw, 3.75rem)', marginBottom: '1rem' }}>🏆</div>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: '#374151', marginBottom: '0.75rem' }}>
            {t('levelComplete.completed', { level: currentLevelId?.split("-")[1] })}
          </p>
          <div style={{ background: '#fef3c7', border: '2px solid #fcd34d', borderRadius: '0.75rem', padding: 'clamp(0.75rem, 3vw, 1rem)', marginBottom: '1rem' }}>
            <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.125rem)', fontWeight: 700, color: '#92400e' }}>
              {t('levelComplete.unlockCode')} {levelCompleteData.unlockCode}
            </p>
            <p style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)', color: '#a16207' }}>{t('levelComplete.rememberCode')}</p>
          </div>
          {levelCompleteData.nextLevelUnlocked && (
            <p style={{ color: '#059669', fontWeight: 600, fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>
              {t('levelComplete.nextUnlocked', { level: levelCompleteData.nextLevelUnlocked.split("-")[1] })}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {levelCompleteData.nextLevelUnlocked && (
            <button
              onClick={onNextLevel}
              className='ios-btn ios-btn-green'
            >
              {t('buttons.nextLevel')}
            </button>
          )}
          <button
            onClick={onLevelSelection}
            className='ios-btn ios-btn-purple'
          >
            {t('buttons.levelSelection')}
          </button>
          <button
            onClick={onMainMenu}
            className='ios-btn ios-btn-gray'
          >
            {t('buttons.mainMenu')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelComplete;
