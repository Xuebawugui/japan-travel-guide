import React from 'react';
import { useWeather } from '../hooks/useWeather';

export default function WeatherWidget({ city, lang }) {
  const { data, loading, error } = useWeather(city, lang);

  return (
    <div style={{
      border: '1px solid #ddd', borderRadius: 8, padding: 12, marginTop: 8,
      background: '#fafafa'
    }}>
      <strong>{city}</strong>
      {loading && <p style={{ margin: '8px 0' }}>Loading...</p>}
      {error && <p style={{ margin: '8px 0', color: 'crimson' }}>Error: {error.message}</p>}
      {data && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 18 }}>{Math.round(data.main.temp)}°C</span>
          <span>{data.weather?.[0]?.description}</span>
          {data.weather?.[0]?.icon && (
            <img
              alt={data.weather?.[0]?.main}
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              width={48}
              height={48}
            />
          )}
        </div>
      )}
    </div>
  );
}