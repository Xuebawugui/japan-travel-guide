import React, { createContext, useContext, useMemo, useState } from 'react';

const messages = {
  en: {
    title: 'Japan Travel Guide',
    subtitle: 'React + Vite · i18n · OpenWeather',
    start: 'Get Started',
    steps: [
      'Write VITE_OPENWEATHER_API_KEY in .env',
      'Create CityCard and WeatherWidget in src/components',
      'Configure multilingual text in src/i18n',
    ],
    cities: { Tokyo: 'Tokyo', Osaka: 'Osaka', Kyoto: 'Kyoto' },
    weather: { temp: 'Temperature', desc: 'Description' },
    chooseLang: 'Language',
  },
  ja: {
    title: '日本旅行ガイド',
    subtitle: 'React + Vite · 多言語 · OpenWeather',
    start: 'はじめに',
    steps: [
      '.env に VITE_OPENWEATHER_API_KEY を設定',
      'src/components に CityCard と WeatherWidget を作成',
      'src/i18n で多言語テキストを設定',
    ],
    cities: { Tokyo: '東京', Osaka: '大阪', Kyoto: '京都' },
    weather: { temp: '気温', desc: '説明' },
    chooseLang: '言語',
  },
  zh_cn: {
    title: '日本旅行推荐',
    subtitle: 'React + Vite · 多语言 · OpenWeather',
    start: '开始使用',
    steps: [
      '在 .env 写入 VITE_OPENWEATHER_API_KEY',
      '在 src/components 创建 CityCard 与 WeatherWidget',
      '在 src/i18n 配置中/日/英文案与语言切换',
    ],
    cities: { Tokyo: '东京', Osaka: '大阪', Kyoto: '京都' },
    weather: { temp: '温度', desc: '描述' },
    chooseLang: '语言',
  },
};

const LanguageContext = createContext({ lang: 'en', setLang: () => {}, t: (k) => k });

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t = useMemo(() => {
    const dict = messages[lang] || messages.en;
    return (keyPath) => {
      return keyPath.split('.').reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : keyPath), dict);
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  return useContext(LanguageContext);
}