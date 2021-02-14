import axios from 'axios';

import AuthModuleState from '@/interfaces/states/auth-module';
import RootState from '@/interfaces/states/root';
import store from '@/store';

export default function initAxios() {
  axios.defaults.baseURL = process.env.VUE_APP_API_URL;
  axios.defaults.withCredentials = true;

  axios.interceptors.request.use(
    (config) => {
      const state = (store.state as RootState).auth as AuthModuleState;
      const accessToken = state.access_token;
      const isAuthenticated = !!accessToken && !!state.current_user;

      config.headers.common['Authorization'] = isAuthenticated
        ? `Bearer ${accessToken}`
        : null;

      return config;
    },
    (error) => Promise.reject(error)
  );
}
