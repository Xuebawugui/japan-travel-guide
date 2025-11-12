import { useEffect, useState } from 'react';

const API_BASE = 'https://api.openweathermap.org/data/2.5/weather';

export function useWeather(city, lang = 'en') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;
    const rawKey = import.meta.env.VITE_OPENWEATHER_API_KEY ?? '';
    const key = rawKey.replace(/^\uFEFF/, '').trim(); // 去除 BOM/空格
    if (!key) {
      setError(new Error('Missing VITE_OPENWEATHER_API_KEY'));
      return;
    }
    // 如果未包含国家码，默认补充为日本 JP（不影响 401，仅更规范）
    const q = city.includes(',') ? city : `${city},JP`;
    const url = `${API_BASE}?q=${encodeURIComponent(q)}&appid=${key}&units=metric&lang=${lang}`;
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch weather');
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [city, lang]);

  return { data, loading, error };
}