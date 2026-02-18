import React from "react";
import { useTranslation } from 'react-i18next';

const QuizResults = ({ score, onBackToMenu }) => {
  const { t } = useTranslation();
  const percentage = Math.round((score.correct / score.total) * 100);

  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 p-8' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className='bg-white rounded-3xl shadow-2xl max-w-md w-full text-center' style={{ padding: 'clamp(1.5rem, 5vw, 2rem)' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 1.875rem)', fontWeight: 700, marginBottom: '1rem', color: '#059669' }}>
          {t('results.title')} 🎉
        </h2>
        <div className='mb-6'>
          <div style={{ fontSize: 'clamp(3rem, 12vw, 3.75rem)', fontWeight: 700, color: '#14b8a6', marginBottom: '0.5rem' }}>
            {percentage}%
          </div>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: '#374151' }}>
            {t('results.score', { correct: score.correct, total: score.total })}
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'linear-gradient(to right, #fef3c7, #fde68a)', borderRadius: '0.75rem' }}>
          <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.125rem)', fontWeight: 600 }}>
            {percentage >= 90
              ? `🌟 ${t('results.perfect')}`
              : percentage >= 70
              ? `⭐ ${t('results.great')}`
              : percentage >= 50
              ? `👍 ${t('results.good')}`
              : `💪 ${t('results.keepPracticing')}`}
          </p>
        </div>

        <button
          onClick={onBackToMenu}
          className='ios-btn ios-btn-purple'
        >
          {t('buttons.backToMenu')}
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
