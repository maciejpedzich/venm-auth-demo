<template>
  <h1>Log in</h1>
  <form class="pure-form pure-form-stacked" @submit.prevent="onSubmit">
    <fieldset>
      <label for="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        required
        v-model="user.username"
      />
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        required
        v-model="user.password"
      />
      <button class="pure-button pure-button-primary" type="submit">
        Confirm
      </button>
    </fieldset>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import determineErrorMessage from '@/utils/error-message';

export default defineComponent({
  name: 'LogIn',
  setup() {
    const store = useStore();
    const router = useRouter();

    const user = reactive({
      username: '',
      password: ''
    });

    async function onSubmit() {
      try {
        await store.dispatch('logIn', user);
        router.push('/');
      } catch (error) {
        const message = determineErrorMessage(error);

        alert(message);
      }
    }

    return { user, onSubmit };
  }
});
</script>
