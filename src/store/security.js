import SecurityAPI from '../services/security';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    status: '',
    error: null,
    accessToken: Cookies.get('access_token') || '',
    user: {}
  },
  getters: {
    isAuthenticated: state => !!state.accessToken
  },
  mutations: {
    AUTHENTICATING(state) {
      state.status = 'loading';
    },
    AUTHENTICATING_SUCCESS(state, { accessToken, user }) {
      state.status = 'success';
      state.accessToken = accessToken;
      state.user = user;
    },
    AUTHENTICATING_ERROR(state, error) {
      state.status = 'error';
      state.error = error;
    },
    LOGOUT(state) {
      state.status = '';
      state.error = null;
      state.accessToken = '';
      state.user = {};
    }
  },
  actions: {
    login({ commit }, payload) {
      commit('AUTHENTICATING');

      return SecurityAPI.login(payload.username, payload.password)
        .then(res => {
          const accessToken = res.data.accessToken;
          const user = jwt.decode(accessToken);

          Cookies.set('access_token', accessToken);

          axios.defaults.headers.common['Authorization'] = accessToken;

          commit('AUTHENTICATING_SUCCESS', { accessToken, user });
        })
        .catch(err => {
          commit('AUTHENTICATING_ERROR', err);
          Cookies.remove('access_token');
        });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('LOGOUT');
        Cookies.remove('access_token');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    }
  }
};
