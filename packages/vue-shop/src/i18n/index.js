import Vue from 'vue';
import VueI18n from 'vue-i18n';

import { LANG } from 'constants';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: LANG,
});

export default i18n;
