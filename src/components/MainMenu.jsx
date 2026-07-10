import React, { useState, useEffect, useRef } from "react";
import { Target, Play, Award, Presentation, User } from "lucide-react";
import { useTranslation } from 'react-i18next';
import Header from "./Header.jsx";
import SettingsModal from "./SettingsModal.jsx";

// QR-Code via kostenlosem, datenschutzfreundlichem API (kein Tracking)
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://matheu.eu')}`;

function FooterIconBtn({ onClick, href, title, children, green }) {
  const style = {
    background: 'none', border: 'none', cursor: 'pointer',
    fontSize: '1.25rem', padding: '0.35rem 0.5rem',
    borderRadius: '0.5rem', color: green ? '#10b981' : '#9ca3af',
    textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
    gap: '0.3rem', transition: 'color 0.15s',
    fontFamily: 'inherit',
  };
  if (href) return <a href={href} title={title} style={style} target="_blank" rel="noopener noreferrer">{children}</a>;
  return <button onClick={onClick} title={title} style={style}>{children}</button>;
}

function QRModal({ onClose }) {
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
          📲 MathEU teilen
        </p>
        <img src={QR_URL} alt="QR Code matheu.eu" width="200" height="200"
          onError={e => { e.target.style.display = 'none'; }}
          style={{ borderRadius: '0.75rem', border: '1px solid #e5e7eb' }} />
        <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.75rem' }}>
          matheu.eu
        </p>
        <button onClick={onClose} style={{
          marginTop: '1rem', padding: '0.5rem 1.5rem',
          background: '#10b981', color: 'white', border: 'none',
          borderRadius: '2rem', cursor: 'pointer', fontWeight: 600,
        }}>Schließen</button>
      </div>
    </div>
  );
}

function HomescreenModal({ onClose }) {
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isAndroid = /android/i.test(navigator.userAgent);
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
          📌 Zum Homescreen hinzufügen
        </p>
        {isIOS && <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>
          1. Tippe unten auf das <strong>Teilen-Symbol</strong> ⬆️<br/>
          2. Wähle <strong>„Zum Home-Bildschirm"</strong><br/>
          3. Tippe oben rechts auf <strong>„Hinzufügen"</strong>
        </p>}
        {isAndroid && <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>
          1. Tippe oben rechts auf das <strong>Menü ⋮</strong><br/>
          2. Wähle <strong>„Zum Startbildschirm hinzufügen"</strong>
        </p>}
        {!isIOS && !isAndroid && <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>
          Öffne matheu.eu im Browser deines Smartphones und wähle
          im Browser-Menü <strong>„Zum Homescreen hinzufügen"</strong>.
        </p>}
        <button onClick={onClose} style={{
          marginTop: '1.25rem', width: '100%', padding: '0.6rem',
          background: '#10b981', color: 'white', border: 'none',
          borderRadius: '2rem', cursor: 'pointer', fontWeight: 600,
        }}>Verstanden!</button>
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
          title: 'MathEU – Kopfrechnen Trainer',
          text: 'Kostenloser Kopfrechnen-Trainer in 8 Sprachen!',
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 p-8">
      <div className="max-w-2xl mx-auto">
        <div
          className="bg-white rounded-3xl shadow-2xl"
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

          <div style={{ padding: "0 2rem 2rem" }} className="space-y-4">
            <button
              onClick={onLevels}
              className="w-full py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg active:scale-98"
            >
              <Target size={24} />
              {t("menu.levels")}
            </button>

            <button
              onClick={onPractice}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg active:scale-98"
            >
              <Play size={24} />
              {t("menu.practice")}
            </button>

            <button
              onClick={onQuiz}
              className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg active:scale-98"
            >
              <Award size={24} />
              {t("menu.quiz")}
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
            <FooterIconBtn href="https://wdeu.de" title="Projekte – wdeu.de" green>
              💡
            </FooterIconBtn>

            {/* 📌 Zum Homescreen */}
            <FooterIconBtn onClick={() => setShowHomescreen(true)} title="Zum Homescreen hinzufügen">
              📌
            </FooterIconBtn>
            
             {/* 🔗 Link kopieren */}
            <FooterIconBtn onClick={handleCopyLink} title={copied ? 'Kopiert!' : 'Link kopieren'}>
              {copied ? '✅' : '🔗'}
            </FooterIconBtn>

            {/* Share – natives iOS/Android Icon (SVG) */}
            <button
              onClick={handleShare}
              title="MathEU teilen"
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
            <FooterIconBtn onClick={() => setShowQR(true)} title="Als QR-Code teilen">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
                <path d="M14 14h1v1h-1zM17 14h1v1h-1zM14 17h1v1h-1zM17 17h3v3h-3z"/>
              </svg>
            </FooterIconBtn>

            {/* ⚖️ Impressum */}
            <FooterIconBtn href="/impressum.html" title="Impressum">
              ⚖️
            </FooterIconBtn>

            {/* 🔒 Datenschutz */}
            <FooterIconBtn href="/datenschutz.html" title="Datenschutz">
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
