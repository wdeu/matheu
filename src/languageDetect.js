// Pure language-resolution logic, kept separate from i18n.js so it can be
// unit-tested without pulling in i18next/React.
//
// Priority: URL param ?lng= > manually saved choice > device language > 'en'.
export function resolveLanguage({ search, saved, deviceLanguages, supportedLngs }) {
  const fromUrl = matchSupported(new URLSearchParams(search).get('lng'), supportedLngs);
  if (fromUrl) return { lng: fromUrl, persist: true };

  if (saved && supportedLngs.includes(saved)) return { lng: saved, persist: false };

  for (const lang of deviceLanguages || []) {
    const base = lang.split('-')[0].toLowerCase();
    if (supportedLngs.includes(base)) return { lng: base, persist: false };
  }

  return { lng: 'en', persist: false };
}

function matchSupported(raw, supportedLngs) {
  if (!raw) return null;
  const base = raw.toLowerCase();
  return supportedLngs.includes(base) ? base : null;
}
