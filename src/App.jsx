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
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', background: 'linear-gradient(180deg, #f9fafb, #f3f4f6)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28 }}>{t('title')} · Japan Travel Guide</h1>
            <p style={{ marginTop: 6, color: '#6b7280' }}>{t('subtitle')}</p>
          </div>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '6px 10px' }}>
            <span style={{ color: '#374151' }}>{t('chooseLang')}</span>
            <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ border: 'none', outline: 'none', background: 'transparent' }}>
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="zh_cn">中文</option>
            </select>
          </label>
        </header>

        <main>
          <section>
            <h2 style={{ marginTop: 24, fontSize: 20 }}>Overview</h2>
            <p style={{ color: '#374151' }}>{t('overview')}</p>
          </section>

          <section style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: 20, marginBottom: 12 }}>Cities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {cities.map((c) => (
                <CityCard key={c.key} name={c.key} displayName={c.name} lang={lang} />
              ))}
            </div>
          </section>
        </main>
      </div>
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