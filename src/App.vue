<template>
  <div class="pure-menu pure-menu-horizontal">
    <div class="pure-menu-heading pure-menu-link">
      <strong>VENM Auth Demo</strong>
    </div>
    <ul class="pure-menu-list">
      <template v-if="isAuthenticated">
        <li class="pure-menu-item">
          <router-link to="/" class="pure-menu-link">Home</router-link>
        </li>
        <li class="pure-menu-item">
          <div class="pure-menu-link">
            Logged in as: {{ currentUser.username }}
          </div>
        </li>
        <li class="pure-menu-item" @click="logOut">
          <div class="pure-menu-link">Log out</div>
        </li>
      </template>
      <template v-else>
        <li class="pure-menu-item">
          <router-link to="/login" class="pure-menu-link">
            Log in
          </router-link>
        </li>
        <li class="pure-menu-item">
          <router-link to="/register" class="pure-menu-link">
            Register
          </router-link>
        </li>
      </template>
      <li class="pure-menu-item">
        <router-link to="/about" class="pure-menu-link">About</router-link>
      </li>
    </ul>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import UserPayload from './interfaces/payloads/user';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const router = useRouter();

    const isAuthenticated = computed<boolean>(
      () => store.getters.isAuthenticated
    );
    const currentUser = computed<UserPayload | null>(
      () => store.getters.getCurrentUser
    );

    onMounted(() => {
      const nextRefreshTimestamp = computed<number | null>(
        () => store.getters.getNextRefreshTimestamp
      ).value;

      if (nextRefreshTimestamp) {
        const timeout = nextRefreshTimestamp - new Date().getTime();
        store.dispatch('startRefreshTimeout', timeout);
      }
    });

    onUnmounted(() => store.commit('SET_REFRESH_TIMEOUT_ID', null));

    function logOut() {
      const refreshTimeoutId = computed<number | null>(
        () => store.getters.getRefreshTimeoutId
      ).value;

      window.clearTimeout(refreshTimeoutId as number);
      store.commit('LOG_OUT');
      router.push('/login');
    }

    return { isAuthenticated, currentUser, logOut };
  }
});
</script>

<style>
#app {
  text-align: center;
}

a.router-link-exact-active {
  background-color: #eee;
}

form {
  display: inline-block;
}

label {
  text-align: left;
}

.pure-form-stacked input[type='text'],
.pure-form-stacked input[type='email'],
.pure-form-stacked input[type='password'] {
  margin-bottom: 1.2rem;
}
</style>
