import { useEffect, useState } from 'react';

const API_BASE = 'https://api.openweathermap.org/data/2.5/weather';

// 经纬度映射：用于 Open‑Meteo 回退
const CITY_COORDS = {
  Tokyo: { lat: 35.6895, lon: 139.6917 },
  Osaka: { lat: 34.6937, lon: 135.5023 },
  Kyoto: { lat: 35.0116, lon: 135.7681 },
};

function mapWeatherCodeToDescription(code, lang) {
  // 基于 WMO 代码的简要映射
  const descEn = {
    0: 'clear sky', 1: 'mainly clear', 2: 'partly cloudy', 3: 'overcast',
    45: 'fog', 48: 'fog', 51: 'drizzle', 53: 'drizzle', 55: 'drizzle',
    56: 'freezing drizzle', 57: 'freezing drizzle',
    61: 'rain', 63: 'rain', 65: 'heavy rain',
    66: 'freezing rain', 67: 'freezing rain',
    71: 'snow', 73: 'snow', 75: 'heavy snow', 77: 'snow grains',
    80: 'rain showers', 81: 'rain showers', 82: 'violent rain showers',
    85: 'snow showers', 86: 'heavy snow showers',
    95: 'thunderstorm', 96: 'thunderstorm with hail', 99: 'thunderstorm with hail',
  };
  const descJa = {
    0: '快晴', 1: '晴れ', 2: 'くもり', 3: '曇り', 45: '霧', 48: '霧',
    51: '霧雨', 53: '霧雨', 55: '霧雨', 56: '着氷性霧雨', 57: '着氷性霧雨',
    61: '雨', 63: '雨', 65: '大雨', 66: '氷雨', 67: '氷雨',
    71: '雪', 73: '雪', 75: '大雪', 77: '雪粒', 80: 'にわか雨', 81: 'にわか雨', 82: '激しいにわか雨',
    85: 'にわか雪', 86: '激しいにわか雪', 95: '雷雨', 96: 'ひょうを伴う雷雨', 99: 'ひょうを伴う雷雨',
  };
  const descZh = {
    0: '晴', 1: '晴间多云', 2: '多云', 3: '阴', 45: '雾', 48: '雾',
    51: '毛毛雨', 53: '毛毛雨', 55: '毛毛雨', 56: '冻毛毛雨', 57: '冻毛毛雨',
    61: '小雨', 63: '中雨', 65: '大雨', 66: '冻雨', 67: '冻雨',
    71: '小雪', 73: '中雪', 75: '大雪', 77: '雪粒', 80: '阵雨', 81: '阵雨', 82: '强阵雨',
    85: '阵雪', 86: '强阵雪', 95: '雷暴', 96: '冰雹雷暴', 99: '冰雹雷暴',
  };
  const table = lang === 'ja' ? descJa : lang === 'zh_cn' ? descZh : descEn;
  return table[code] || descEn[code] || 'weather';
}

function mapWeatherCodeToIcon(code) {
  if (code === 0) return '01d';
  if (code === 1 || code === 2) return '02d';
  if (code === 3) return '03d';
  if (code === 45 || code === 48) return '50d';
  if ([51, 53, 55, 80, 81, 82].includes(code)) return '09d';
  if ([61, 63, 65].includes(code)) return '10d';
  if ([66, 67].includes(code)) return '10d';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return '13d';
  if ([95, 96, 99].includes(code)) return '11d';
  return '01d';
}

export function useWeather(city, lang = 'en') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;
    const rawKey = import.meta.env.VITE_OPENWEATHER_API_KEY ?? '';
    const key = rawKey.replace(/^\uFEFF/, '').trim();
    const provider = String(import.meta.env.VITE_WEATHER_PROVIDER || 'openweather').toLowerCase();
    const q = city.includes(',') ? city : `${city},JP`;
    const url = `${API_BASE}?q=${encodeURIComponent(q)}&appid=${key}&units=metric&lang=${lang}`;
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const tryOpenMeteo = async () => {
      const baseName = city.split(',')[0];
      const coords = CITY_COORDS[baseName];
      if (!coords) throw new Error('Open-Meteo fallback unavailable');
      const omUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;
      const omRes = await fetch(omUrl, { signal: controller.signal });
      if (!omRes.ok) throw new Error('Open-Meteo fetch failed');
      const omJson = await omRes.json();
      const cw = omJson.current_weather;
      const desc = mapWeatherCodeToDescription(cw.weathercode, lang);
      const icon = mapWeatherCodeToIcon(cw.weathercode);
      const normalized = {
        main: { temp: cw.temperature },
        weather: [{ description: desc, icon, main: desc }],
      };
      setData(normalized);
    };

    (async () => {
      try {
        if (provider === 'openmeteo' || !key) {
          await tryOpenMeteo();
        } else {
          const res = await fetch(url, { signal: controller.signal });
          if (!res.ok) {
            let body = null;
            try { body = await res.json(); } catch {}
            const msg = String((body && body.message) || '');
            const invalidKey = res.status === 401 || msg.toLowerCase().includes('invalid api key');
            if (invalidKey) {
              await tryOpenMeteo();
            } else {
              throw new Error('Failed to fetch weather');
            }
          } else {
            const json = await res.json();
            setData(json);
          }
        }
      } catch (err) {
        if (err.name !== 'AbortError') setError(err);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [city, lang]);

  return { data, loading, error };
}