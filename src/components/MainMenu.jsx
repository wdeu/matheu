import React, { useState, useEffect, useRef } from "react";
import { Target, Play, Award, Presentation, User } from "lucide-react";
import { useTranslation, Trans } from 'react-i18next';
import Header from "./Header.jsx";
import SettingsModal from "./SettingsModal.jsx";

// QR-Code für https://matheu.eu, einmalig lokal erzeugt (kein Netzwerkaufruf)
const QR_URL = '/qr-matheu.svg';

// Rechenart-Kacheln im Stil des App-Icons: Farbe, dunklere Verlaufs-/Schattentöne, Drehung
const OPERATION_TILES = [
  { op: '+', symbol: '+', word: 'plus',    c: '#10b981', cd: '#059669', cs: '#047857', r: '-4deg' },
  { op: '-', symbol: '−', word: 'minus',   c: '#14b8a6', cd: '#0d9488', cs: '#0f766e', r: '3deg' },
  { op: '*', symbol: '×', word: 'times',   c: '#06b6d4', cd: '#0891b2', cs: '#0e7490', r: '-2deg' },
  { op: '/', symbol: '÷', word: 'divided', c: '#f59e0b', cd: '#d97706', cs: '#b45309', r: '4deg' },
];
const DIFFICULTIES = ['easy', 'medium', 'hard'];

function QuickPick({ settings, setSettings }) {
  const { t } = useTranslation();
  return (
    <div className="quick-pick">
      <p className="qp-label" id="qp-operation">{t('settings.operation')}</p>
      <div className="op-grid" role="group" aria-labelledby="qp-operation">
        {OPERATION_TILES.map(({ op, symbol, word, c, cd, cs, r }) => {
          const active = settings.operation === op;
          return (
            <button
              key={op}
              type="button"
              className="op-tile"
              aria-pressed={active}
              aria-label={t(`operations.${word}`)}
              title={t(`operations.${word}`)}
              style={{ '--c': c, '--cd': cd, '--cs': cs, '--r': r }}
              onClick={() => setSettings((prev) => ({ ...prev, operation: op }))}
            >
              <span aria-hidden="true">{symbol}</span>
              {active && <span className="tile-check" style={{ color: cs }} aria-hidden="true">✓</span>}
            </button>
          );
        })}
      </div>

      <p className="qp-label" id="qp-difficulty" style={{ marginTop: '0.9rem' }}>{t('settings.difficulty')}</p>
      <div className="diff-grid" role="group" aria-labelledby="qp-difficulty">
        {DIFFICULTIES.map((diff, i) => {
          const active = settings.difficulty === diff;
          return (
            <button
              key={diff}
              type="button"
              className="diff-tile"
              aria-pressed={active}
              onClick={() => setSettings((prev) => ({ ...prev, difficulty: diff }))}
            >
              <span className="diff-blocks" aria-hidden="true">
                {[0, 1, 2].map((b) => <span key={b} className={b <= i ? '' : 'off'} />)}
              </span>
              {t(`difficulties.${diff}`)}
              {active && <span className="tile-check" aria-hidden="true">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FooterIconBtn({ onClick, href, title, children, green }) {
  const style = {
    background: 'none', border: 'none', cursor: 'pointer',
    fontSize: '1.25rem', padding: '0.35rem 0.5rem',
    borderRadius: '0.5rem', color: green ? '#10b981' : '#9ca3af',
    textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
    gap: '0.3rem', transition: 'color 0.15s',
    fontFamily: 'inherit',
  };
  if (href) return <a href={href} title={title} aria-label={title} style={style} target="_blank" rel="noopener noreferrer">{children}</a>;
  return <button onClick={onClick} title={title} aria-label={title} style={style}>{children}</button>;
}

function QRModal({ onClose }) {
  const { t } = useTranslation();
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'white', borderRadius: '1.5rem', padding: '2rem',
        textAlign: 'center', maxWidth: '280px', width: '90%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <p style={{ fontWeight: 700, marginBottom: '1rem', color: '#111827', fontSize: '1rem' }}>
          📲 {t('share.title')}
        </p>
        <img src={QR_URL} alt="QR code matheu.eu" width="200" height="200"
          onError={e => { e.target.style.display = 'none'; }}
          style={{ borderRadius: '0.75rem', border: '1px solid #e5e7eb' }} />
        <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.75rem' }}>
          matheu.eu
        </p>
        <button onClick={onClose} style={{
          marginTop: '1rem', padding: '0.5rem 1.5rem',
          background: '#10b981', color: 'white', border: 'none',
          borderRadius: '2rem', cursor: 'pointer', fontWeight: 600,
        }}>{t('settings.close')}</button>
      </div>
    </div>
  );
}

function HomescreenModal({ onClose }) {
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isAndroid = /android/i.test(navigator.userAgent);
  const { t } = useTranslation();
  const b = { b: <strong /> };
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'white', borderRadius: '1.5rem', padding: '2rem',
        maxWidth: '300px', width: '90%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <p style={{ fontWeight: 700, marginBottom: '1rem', color: '#111827', fontSize: '1rem', textAlign: 'center' }}>
          📌 {t('homescreen.title')}
        </p>
        {isIOS && <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>
          1. <Trans i18nKey="homescreen.ios1" components={b} /><br/>
          2. <Trans i18nKey="homescreen.ios2" components={b} /><br/>
          3. <Trans i18nKey="homescreen.ios3" components={b} />
        </p>}
        {isAndroid && <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>
          1. <Trans i18nKey="homescreen.android1" components={b} /><br/>
          2. <Trans i18nKey="homescreen.android2" components={b} />
        </p>}
        {!isIOS && !isAndroid && <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>
          <Trans i18nKey="homescreen.desktop" components={b} />
        </p>}
        <button onClick={onClose} style={{
          marginTop: '1.25rem', width: '100%', padding: '0.6rem',
          background: '#10b981', color: 'white', border: 'none',
          borderRadius: '2rem', cursor: 'pointer', fontWeight: 600,
        }}>{t('homescreen.gotIt')}</button>
      </div>
    </div>
  );
}

const MainMenu = ({

  settings,
  setSettings,
  showSettings,
  onOpenSettings,
  onCloseSettings,
  classroomMode,
  onSetClassroomMode,
  onLevels,
  onPractice,
  onQuiz,
  score,
  dailyStats,
}) => {
  const { t } = useTranslation();
  const [showQR, setShowQR] = useState(false);
  const [showHomescreen, setShowHomescreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [modePulse, setModePulse] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setModePulse(true);
    const timer = setTimeout(() => setModePulse(false), 700);
    return () => clearTimeout(timer);
  }, [classroomMode]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `MathEU – ${t('app.title')}`,
          text: t('share.text'),
          url: 'https://matheu.eu',
        });
      } catch {/* abgebrochen */}
    } else {
      await navigator.clipboard.writeText('https://matheu.eu');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText('https://matheu.eu');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen app-bg p-8">
      <div className="max-w-2xl mx-auto">
        <div
          className="app-card rounded-3xl shadow-2xl"
          style={{ overflow: "hidden" }}
        >
          <Header
            onOpenSettings={onOpenSettings}
            settingsLabel={t("settings.title")}
            classroomMode={classroomMode}
            onSetClassroomMode={onSetClassroomMode}
          />

          <div className={modePulse ? 'mode-flash' : ''} style={{ padding: "0 2rem" }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              {classroomMode && <Presentation size={28} color="#14b8a6" aria-hidden="true" />}
              <h1
                className="title-responsive text-emerald-600"
                style={{ textAlign: "center", margin: 0 }}
              >
                {t("app.title")}
              </h1>
              {classroomMode && <Presentation size={28} color="#14b8a6" aria-hidden="true" />}
            </div>
            {classroomMode ? (
              <p className="text-center" style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: '#99f6e4', color: '#0f766e', fontSize: '13px',
                  fontWeight: 500, padding: '6px 14px', borderRadius: '999px',
                }}>
                  <Presentation size={14} aria-hidden="true" />
                  {t("classroom.bannerActive")}
                </span>
              </p>
            ) : (
              <p
                className="text-center text-gray-600 mb-8"
                style={{ marginTop: "0.25rem" }}
              >
                {t("app.subtitle")} 🎓
              </p>
            )}
          </div>

          {showSettings && (
            <SettingsModal
              settings={settings}
              setSettings={setSettings}
              onClose={onCloseSettings}
              classroomMode={classroomMode}
            />
          )}

          <div style={{ padding: "0 clamp(1rem, 5vw, 2rem) 2rem" }} className="space-y-4">
            {/* Schnellwahl: gilt für Freies Üben und Quiz (Level haben eigene Aufgaben) */}
            <QuickPick settings={settings} setSettings={setSettings} />

            <button
              onClick={onPractice}
              className="menu-btn w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2"
            >
              <Play size={24} />
              {t("menu.practice")}
            </button>

            <button
              onClick={onQuiz}
              className="menu-btn w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2"
            >
              <Award size={24} />
              {t("menu.quiz")}
            </button>

            <button
              onClick={onLevels}
              className="menu-btn w-full py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2"
              style={{ marginTop: '1.5rem' }}
            >
              <Target size={24} />
              {t("menu.levels")}
            </button>
            {dailyStats && (dailyStats.solo.total > 0 || dailyStats.classroom.total > 0) && (
              <div className="mt-8 p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {dailyStats.solo.total > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <User size={22} color="#0f766e" aria-hidden="true" />
                    </div>
                    <p className="text-lg font-semibold text-gray-700" style={{ margin: 0 }}>
                      {t("score.dailyStats", {
                        correct: dailyStats.solo.correct,
                        total: dailyStats.solo.total,
                        percent: Math.round((dailyStats.solo.correct / dailyStats.solo.total) * 100),
                      })}
                    </p>
                  </div>
                )}
                {dailyStats.classroom.total > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Presentation size={22} color="#0f766e" aria-hidden="true" />
                    </div>
                    <p className="text-lg font-semibold text-gray-700" style={{ margin: 0 }}>
                      {t("score.dailyStats", {
                        correct: dailyStats.classroom.correct,
                        total: dailyStats.classroom.total,
                        percent: Math.round((dailyStats.classroom.correct / dailyStats.classroom.total) * 100),
                      })}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Footer Icon Bar ── */}
          <footer style={{
            borderTop: '1px solid #e5e7eb',
            padding: '0.6rem 0.5rem',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
            {/* 💡 Projekte */}
            <FooterIconBtn href="https://wdeu.de" title={`${t('footer.projects')} – wdeu.de`} green>
              💡
            </FooterIconBtn>

            {/* 📌 Zum Homescreen */}
            <FooterIconBtn onClick={() => setShowHomescreen(true)} title={t('homescreen.title')}>
              📌
            </FooterIconBtn>
            
             {/* 🔗 Link kopieren */}
            <FooterIconBtn onClick={handleCopyLink} title={copied ? t('share.copied') : t('share.copyLink')}>
              {copied ? '✅' : '🔗'}
            </FooterIconBtn>

            {/* Share – natives iOS/Android Icon (SVG) */}
            <button
              onClick={handleShare}
              title={t('share.title')}
              aria-label={t('share.title')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0.55rem', borderRadius: '0.6rem',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: '#374151', transition: 'background 0.15s',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </button>

            {/* QR Code */}
            <FooterIconBtn onClick={() => setShowQR(true)} title={t('share.qr')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
                <path d="M14 14h1v1h-1zM17 14h1v1h-1zM14 17h1v1h-1zM17 17h3v3h-3z"/>
              </svg>
            </FooterIconBtn>

            {/* ⚖️ Impressum */}
            <FooterIconBtn href="/impressum.html" title={t('footer.imprint')}>
              ⚖️
            </FooterIconBtn>

            {/* 🔒 Datenschutz */}
            <FooterIconBtn href="/datenschutz.html" title={t('footer.privacy')}>
              🔒
            </FooterIconBtn>
          </footer>

          {/* Modals */}
          {showQR && <QRModal onClose={() => setShowQR(false)} />}
          {showHomescreen && <HomescreenModal onClose={() => setShowHomescreen(false)} />}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
