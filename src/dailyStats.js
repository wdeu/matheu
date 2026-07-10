// Today's practice stats, split by solo vs. classroom mode.
// Persisted in localStorage, resets automatically at midnight (no history kept).
const STORAGE_KEY = 'matheu-daily-stats';

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function emptyStats() {
  return { date: todayKey(), solo: { correct: 0, total: 0 }, classroom: { correct: 0, total: 0 } };
}

export function loadDailyStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.date === todayKey()) return parsed;
    }
  } catch {
    // corrupted entry - fall through to a fresh day
  }
  return emptyStats();
}

export function recordDailyAnswer(prev, bucket, isCorrect) {
  const current = prev.date === todayKey() ? prev : emptyStats();
  const updated = {
    ...current,
    [bucket]: {
      correct: current[bucket].correct + (isCorrect ? 1 : 0),
      total: current[bucket].total + 1,
    },
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
