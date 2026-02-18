import React, { useState } from "react";
import { X, Link as LinkIcon } from "lucide-react";
import { useTranslation } from 'react-i18next';

const operationSymbols = {
  "+": "+",
  "-": "-",
  "*": "×",
  "/": "÷",
};

const APP_URL = 'https://matheu.netlify.app';

const SettingsModal = ({ settings, setSettings, onClose }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'MathEU', url: APP_URL });
      } catch (e) {
        if (e.name !== 'AbortError') console.error('Share failed:', e);
      }
    } else {
      try {
        await navigator.clipboard.writeText(APP_URL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error('Copy failed:', e);
      }
    }
  };

  return (
    <div
      className='modal-backdrop'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0d9488' }}>🇪🇺 MathEU</span>
          <button
            onClick={handleShare}
            title={copied ? t('settings.copied') || 'Copied!' : t('settings.share') || 'Share'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              color: copied ? '#10b981' : '#14b8a6',
              transition: 'color 150ms',
            }}
          >
            {copied ? '✓' : <LinkIcon size={18} />}
          </button>
        </div>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-emerald-600'>{t('settings.title')}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: '#6b7280',
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div className='space-y-6'>
          <div>
            <label className='flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition'>
              <span className='text-sm font-semibold text-gray-700'>
                {t('settings.showEquation')}
              </span>
              <input
                type='checkbox'
                checked={settings.showEquation}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    showEquation: e.target.checked,
                  })
                }
                className='w-5 h-5 text-purple-600 rounded'
              />
            </label>
            <p className='text-xs text-gray-500 mt-1 ml-3'>
              {t('settings.showEquationHint')}
            </p>
          </div>

          <div>
            <label className='flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition'>
              <span className='text-sm font-semibold text-gray-700'>
                {t('settings.mentalMathMode')}
              </span>
              <input
                type='checkbox'
                checked={settings.kopfrechnenMode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    kopfrechnenMode: e.target.checked,
                  })
                }
                className='w-5 h-5 text-purple-600 rounded'
              />
            </label>
            <p className='text-xs text-gray-500 mt-1 ml-3'>
              {t('settings.mentalMathModeHint')}
            </p>
          </div>

          <div>
            <label className='block text-sm font-semibold mb-2 text-gray-700'>
              {t('settings.operation')}
            </label>
            <div className='grid grid-cols-4 gap-2'>
              {["+", "-", "*", "/"].map((op) => (
                <button
                  key={op}
                  onClick={() =>
                    setSettings({ ...settings, operation: op })
                  }
                  className={`py-3 px-4 rounded-lg text-2xl font-bold transition ${
                    settings.operation === op
                      ? "bg-teal-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {operationSymbols[op]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className='block text-sm font-semibold mb-2 text-gray-700'>
              {t('settings.difficulty')}
            </label>
            <div className='grid grid-cols-3 gap-2'>
              {["easy", "medium", "hard"].map((diff) => (
                <button
                  key={diff}
                  onClick={() =>
                    setSettings({ ...settings, difficulty: diff })
                  }
                  className={`py-2 px-4 rounded-lg font-semibold transition ${
                    settings.difficulty === diff
                      ? "bg-teal-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t(`difficulties.${diff}`)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className='block text-sm font-semibold mb-2 text-gray-700'>
              {t('settings.speechRate')}: {settings.speechRate.toFixed(1)}x
            </label>
            <input
              type='range'
              min='0.5'
              max='1.5'
              step='0.1'
              value={settings.speechRate}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  speechRate: parseFloat(e.target.value),
                })
              }
              className='w-full'
            />
            <div className='flex justify-between text-xs text-gray-500 mt-1'>
              <span>{t('settings.slow')}</span>
              <span>{t('settings.normal')}</span>
              <span>{t('settings.fast')}</span>
            </div>
          </div>

          <div>
            <label className='flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition'>
              <span className='text-sm font-semibold text-gray-700'>
                {t('settings.autoPlayNext')}
              </span>
              <input
                type='checkbox'
                checked={settings.autoPlayNext}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    autoPlayNext: e.target.checked,
                  })
                }
                className='w-5 h-5 text-purple-600 rounded'
              />
            </label>
            <p className='text-xs text-gray-500 mt-1 ml-3'>
              {t('settings.autoPlayNextHint')}
            </p>
          </div>

          <div>
            <label className='block text-sm font-semibold mb-2 text-gray-700'>
              {t('settings.feedbackStyle')}
            </label>
            <div className='grid grid-cols-2 gap-2'>
              {[
                { key: "encouraging", label: t('feedbackStyles.encouraging') },
                { key: "simple", label: t('feedbackStyles.simple') },
                { key: "playful", label: t('feedbackStyles.playful') },
                { key: "teacher", label: t('feedbackStyles.teacher') },
              ].map((style) => (
                <button
                  key={style.key}
                  onClick={() =>
                    setSettings({ ...settings, feedbackStyle: style.key })
                  }
                  className={`py-2 px-4 rounded-lg font-semibold transition ${
                    settings.feedbackStyle === style.key
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
