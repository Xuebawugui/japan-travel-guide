import React, { createContext, useContext, useMemo, useState } from 'react';

const messages = {
  en: {
    title: 'Japan Travel Guide',
    subtitle: 'Explore culture, cuisine, and top sights',
    overview: 'Discover Japan’s iconic cities with highlights, travel tips, and live weather to plan your day.',
    cities: { Tokyo: 'Tokyo', Osaka: 'Osaka', Kyoto: 'Kyoto' },
    cityDescriptions: {
      Tokyo: 'Modern metropolis with historic shrines, vibrant districts, and Michelin-star dining.',
      Osaka: 'Foodie capital famous for street eats, castles, and lively nightlife.',
      Kyoto: 'Ancient temples, traditional tea culture, and scenic bamboo forests.',
    },
    weather: { temp: 'Temperature', desc: 'Description' },
    chooseLang: 'Language',
  },
  ja: {
    title: '日本旅行ガイド',
    subtitle: '文化・美食・名所をめぐる旅',
    overview: 'ライブ天気と旅のハイライトを参考に、都市ごとの魅力とヒントをチェックしましょう。',
    cities: { Tokyo: '東京', Osaka: '大阪', Kyoto: '京都' },
    cityDescriptions: {
      Tokyo: '近代的な街並みと歴史的な神社、活気あるエリア、美食が共存する都市。',
      Osaka: 'ストリートフードと城、賑やかなナイトライフが名物の食の都。',
      Kyoto: '古都の寺社、茶文化、竹林など伝統美が息づくエリア。',
    },
    weather: { temp: '気温', desc: '説明' },
    chooseLang: '言語',
  },
  zh_cn: {
    title: '日本旅行推荐',
    subtitle: '文化、美食与经典景点',
    overview: '为你精选东京、大阪、京都的城市亮点与旅行提示，并提供实时天气，方便安排行程。',
    cities: { Tokyo: '东京', Osaka: '大阪', Kyoto: '京都' },
    cityDescriptions: {
      Tokyo: '现代都市与古老神社交织，街区丰富，美食云集。',
      Osaka: '“吃在大阪”，城堡与夜生活同样精彩。',
      Kyoto: '古都寺社、茶道文化与竹林风景，传统气息浓郁。',
    },
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