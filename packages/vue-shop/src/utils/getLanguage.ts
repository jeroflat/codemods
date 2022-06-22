const language = (window.navigator.language);

const getLanguage = (): string => (
  language.split('-')[0] || 'en'
);

export default getLanguage;
