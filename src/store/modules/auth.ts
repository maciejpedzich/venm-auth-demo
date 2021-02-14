import { ActionContext } from 'vuex';
import axios from 'axios';

import UserPayload from '@/interfaces/payloads/user';
import RootState from '@/interfaces/states/root';
import AuthModuleState from '@/interfaces/states/auth-module';
import AuthFormData from '@/interfaces/models/auth-form-data';
import determineErrorMessage from '@/utils/error-message';

interface SaveCredentialsData {
  accessToken: string;
  currentUser: UserPayload;
}

const FIFTEEN_MINUTES = 60 * 15 * 1000;

const state: AuthModuleState = {
  access_token: null,
  current_user: null,
  next_refresh_timestamp: null,
  refresh_timeout_id: null
};

const getters = {
  getAccessToken: (state: AuthModuleState) => state.access_token,
  getCurrentUser: (state: AuthModuleState) => state.current_user,
  isAuthenticated: (state: AuthModuleState) =>
    state.access_token && state.current_user,
  getNextRefreshTimestamp: (state: AuthModuleState) =>
    state.next_refresh_timestamp,
  getRefreshTimeoutId: (state: AuthModuleState) => state.refresh_timeout_id
};

const actions = {
  async register(
    { commit, dispatch }: ActionContext<AuthModuleState, RootState>,
    data: AuthFormData
  ) {
    try {
      const res = await axios.post('/api/auth/register', data);
      const accessToken = res.headers.authorization;
      const currentUser = res.data;

      commit('saveCredentials', { accessToken, currentUser });
      await dispatch('silentRefresh', FIFTEEN_MINUTES);
    } catch (error) {
      const message = determineErrorMessage(error);

      throw new Error(message);
    }
  },
  async logIn(
    { commit, dispatch }: ActionContext<AuthModuleState, RootState>,
    data: AuthFormData
  ) {
    try {
      const res = await axios.post('/api/auth/login', data);
      const accessToken = res.headers.authorization;
      const currentUser = res.data;

      commit('SAVE_CREDENTIALS', { accessToken, currentUser });
      await dispatch('silentRefresh', FIFTEEN_MINUTES);
    } catch (error) {
      const message = determineErrorMessage(error);

      throw new Error(message);
    }
  },
  silentRefresh(
    { commit, dispatch }: ActionContext<AuthModuleState, RootState>,
    timeout: number
  ) {
    return new Promise<number>((resolve, reject) => {
      const refreshTimeoutId = window.setTimeout(() => {
        axios
          .post('/api/auth/refresh', {})
          .then((res) => {
            const accessToken = res.headers.authorization;
            const currentUser = res.data;

            commit('saveCredentials', { accessToken, currentUser });
            dispatch('silentRefresh', FIFTEEN_MINUTES);
          })
          .catch((error) => {
            const message = determineErrorMessage(error);

            reject(new Error(message));
          });
      }, timeout);

      commit('SET_REFRESH_TIMEOUT_ID', refreshTimeoutId);
      resolve(refreshTimeoutId);
    });
  }
};

const mutations = {
  SAVE_CREDENTIALS(
    state: AuthModuleState,
    { accessToken, currentUser }: SaveCredentialsData
  ) {
    state.access_token = accessToken;
    state.current_user = currentUser;
    state.next_refresh_timestamp = new Date().getTime() + FIFTEEN_MINUTES;
  },
  SET_REFRESH_TIMEOUT_ID(state: AuthModuleState, id: number | null) {
    state.refresh_timeout_id = id;
  },
  LOG_OUT(state: AuthModuleState) {
    state.access_token = null;
    state.current_user = null;
    state.next_refresh_timestamp = null;
    state.refresh_timeout_id = null;
  }
};

const auth = {
  state,
  getters,
  actions,
  mutations
};

export default auth;
