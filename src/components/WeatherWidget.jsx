import React from 'react';
import { useWeather } from '../hooks/useWeather';

export default function WeatherWidget({ city, lang }) {
  const { data, loading, error } = useWeather(city, lang);
  const provider = String(import.meta.env.VITE_WEATHER_PROVIDER || 'openweather');

  return (
    <div style={{
      border: '1px solid #e5e7eb', borderRadius: 10, padding: 12, marginTop: 8,
      background: '#f9fafb'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <strong style={{ color: '#111827' }}>{city}</strong>
        <span style={{ fontSize: 12, color: '#6b7280' }}>{provider === 'openmeteo' ? 'Open‑Meteo' : 'OpenWeather'}</span>
      </div>

      {loading && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
          <div style={{ width: 48, height: 48, background: '#e5e7eb', borderRadius: 8 }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 12, background: '#e5e7eb', borderRadius: 6, marginBottom: 8, width: '60%' }} />
            <div style={{ height: 12, background: '#e5e7eb', borderRadius: 6, width: '40%' }} />
          </div>
        </div>
      )}

      {error && (
        <p style={{ margin: '8px 0', color: '#b91c1c' }}>无法获取天气：{error.message}</p>
      )}

      {data && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
          {data.weather?.[0]?.icon && (
            <img
              alt={data.weather?.[0]?.main}
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              width={48}
              height={48}
            />
          )}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 24, fontWeight: 600, color: '#111827' }}>{Math.round(data.main.temp)}°C</span>
            <span style={{ fontSize: 14, color: '#374151', background: '#eef2ff', padding: '2px 8px', borderRadius: 999 }}>{data.weather?.[0]?.description}</span>
          </div>
        </div>
      )}
    </div>
  );
}