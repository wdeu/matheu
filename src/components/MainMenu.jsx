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
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 p-8">
      <div className="max-w-2xl mx-auto">
        <div
          className="bg-white rounded-3xl shadow-2xl"
          style={{ overflow: "hidden" }}
        >
          <Header
            onOpenSettings={onOpenSettings}
            settingsLabel={t("settings.title")}
          />

          <div style={{ padding: "0 2rem" }}>
            <h1
              className="title-responsive text-emerald-600"
              style={{ textAlign: "center", margin: 0 }}
            >
              {t("app.title")}
            </h1>
            <p
              className="text-center text-gray-600 mb-8"
              style={{ marginTop: "0.25rem" }}
            >
              {t("app.subtitle")} 🎓
            </p>
          </div>

          {showSettings && (
            <SettingsModal
              settings={settings}
              setSettings={setSettings}
              onClose={onCloseSettings}
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
            {score.total > 0 && (
              <div className="mt-8 p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                <p className="text-center text-lg font-semibold text-gray-700">
                  {t("score.stats", {
                    correct: score.correct,
                    total: score.total,
                    percent: Math.round((score.correct / score.total) * 100),
                  })}
                </p>
              </div>
            )}
          </div>

          <footer
            style={{
              marginTop: "2rem",
              paddingTop: "1rem",
              borderTop: "1px solid #e5e7eb",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#6b7280",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <a
              href="https://wdeu.de"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#10b981", textDecoration: "none" }}
            >
              💡 Projekte
            </a>

            <a
              href="/impressum.html"
              style={{ color: "#6b7280", textDecoration: "none" }}
            >
              Impressum
            </a>
            <a
              href="/datenschutz.html"
              style={{ color: "#6b7280", textDecoration: "none" }}
            >
              Datenschutz
            </a>
            <a
              href="https://galerie.wdeu.de"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#f59e0b", textDecoration: "none" }}
            >
              📚 Booq
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
