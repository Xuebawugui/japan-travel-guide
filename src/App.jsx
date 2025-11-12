import React from 'react';
import CityCard from './components/CityCard';
import { I18nProvider, useI18n } from './i18n';

function AppInner() {
  const { t, lang, setLang } = useI18n();
  const cities = [
    { key: 'Tokyo', name: t('cities.Tokyo') },
    { key: 'Osaka', name: t('cities.Osaka') },
    { key: 'Kyoto', name: t('cities.Kyoto') },
  ];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 16 }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0 }}>{t('title')} · Japan Travel Guide</h1>
          <p style={{ marginTop: 6 }}>{t('subtitle')}</p>
        </div>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span>{t('chooseLang')}</span>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="ja">日本語</option>
            <option value="zh_cn">中文</option>
          </select>
        </label>
      </header>

      <main>
        <section>
          <h2 style={{ marginTop: 24 }}>{t('start')}</h2>
          <ol>
            {t('steps').map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>Cities</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {cities.map((c) => (
              <CityCard key={c.key} name={c.key} displayName={c.name} lang={lang} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppInner />
    </I18nProvider>
  );
}