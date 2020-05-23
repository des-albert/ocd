import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        horizAppBar: '#82a3a1',
        e1000Form: '#d5aca9',
        select: '#ffeac7',
        selected: '#b15573',
        button: '#9693bd'
      }
    }
  }
});
