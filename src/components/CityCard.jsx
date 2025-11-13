import React from 'react';
import WeatherWidget from './WeatherWidget';

export default function CityCard({ name, displayName, lang }) {
  return (
    <div style={{
      border: '1px solid #e5e7eb', borderRadius: 12, padding: 16,
      width: '100%', background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0, fontSize: 18 }}>{displayName}</h3>
        <span style={{ fontSize: 20 }}>🇯🇵</span>
      </div>
      <p style={{ color: '#6b7280', marginTop: 4 }}>Japan · {name}</p>
      <p style={{ color: '#374151', marginTop: 6 }}>
        {(() => {
          const dict = {
            en: {
              Tokyo: 'Modern metropolis with historic shrines, vibrant districts, and Michelin-star dining.',
              Osaka: 'Foodie capital famous for street eats, castles, and lively nightlife.',
              Kyoto: 'Ancient temples, traditional tea culture, and scenic bamboo forests.',
            },
            ja: {
              Tokyo: '近代的な街並みと歴史的な神社、活気あるエリア、美食が共存する都市。',
              Osaka: 'ストリートフードと城、賑やかなナイトライフが名物の食の都。',
              Kyoto: '古都の寺社、茶文化、竹林など伝統美が息づくエリア。',
            },
            zh_cn: {
              Tokyo: '现代都市与古老神社交织，街区丰富，美食云集。',
              Osaka: '“吃在大阪”，城堡与夜生活同样精彩。',
              Kyoto: '古都寺社、茶道文化与竹林风景，传统气息浓郁。',
            },
          };
          const langKey = lang in dict ? lang : 'en';
          return dict[langKey][name] || '';
        })()}
      </p>
      <WeatherWidget city={name} lang={lang} />
    </div>
  );
}