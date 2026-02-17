import React from "react";
import { Target, Play, Award } from "lucide-react";
import { useTranslation } from 'react-i18next';
import Header from "./Header.jsx";
import SettingsModal from "./SettingsModal.jsx";

const MainMenu = ({
  settings,
  setSettings,
  showSettings,
  onOpenSettings,
  onCloseSettings,
  onLevels,
  onPractice,
  onQuiz,
  score,
}) => {
  const { t } = useTranslation();

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='bg-white rounded-3xl shadow-2xl' style={{ overflow: 'hidden' }}>
          <Header onOpenSettings={onOpenSettings} settingsLabel={t('settings.title')} />

          <div style={{ padding: '0 2rem' }}>
            <h1 className='title-responsive text-purple-600' style={{ textAlign: 'center', margin: 0 }}>
              {t('app.title')}
            </h1>
            <p className='text-center text-gray-600 mb-8' style={{ marginTop: '0.25rem' }}>
              {t('app.subtitle')} 🎓
            </p>
          </div>

          {showSettings && (
            <SettingsModal
              settings={settings}
              setSettings={setSettings}
              onClose={onCloseSettings}
            />
          )}

          <div style={{ padding: '0 2rem 2rem' }} className='space-y-4'>
            <button
              onClick={onLevels}
              className='w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg'
            >
              <Target size={24} />
              {t('menu.levels')}
            </button>

            <button
              onClick={onPractice}
              className='w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg'
            >
              <Play size={24} />
              {t('menu.practice')}
            </button>

            <button
              onClick={onQuiz}
              className='w-full py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg'
            >
              <Award size={24} />
              {t('menu.quiz')}
            </button>
            {score.total > 0 && (
              <div className='mt-8 p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200'>
                <p className='text-center text-lg font-semibold text-gray-700'>
                  {t('score.stats', {
                    correct: score.correct,
                    total: score.total,
                    percent: Math.round((score.correct / score.total) * 100),
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
