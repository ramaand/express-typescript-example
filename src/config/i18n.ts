import i18n from 'i18n';
import path from 'path';

i18n.configure({
  locales: ['en', 'id'],
  directory: path.join(__dirname, '../locales'),
  defaultLocale: 'en',
  queryParameter: 'lang'
});

export default i18n;
