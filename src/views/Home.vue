<template>
  <div v-if="currentUser">
    <h1>Welcome home, {{ currentUser.username }}!</h1>
    <p>You can see this page, because you're logged in.</p>
  </div>
  <div v-else>
    <p>What? You're not supposed to be here. I don't even know you...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

import UserPayload from '../interfaces/payloads/user';

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore();

    const currentUser = computed<UserPayload | null>(
      () => store.getters.getCurrentUser
    );

    return { currentUser };
  }
});
</script>
