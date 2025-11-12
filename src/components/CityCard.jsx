import React from 'react';
import WeatherWidget from './WeatherWidget';

export default function CityCard({ name, displayName, lang }) {
  return (
    <div style={{
      border: '1px solid #e5e7eb', borderRadius: 12, padding: 16,
      width: 280, background: 'white'
    }}>
      <h3 style={{ margin: 0 }}>{displayName}</h3>
      <p style={{ color: '#666', marginTop: 4 }}>Japan · {name}</p>
      <WeatherWidget city={name} lang={lang} />
    </div>
  );
}