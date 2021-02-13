<template>
  <div class="about">
    <h1>VENM Auth Demo</h1>
    <p>&copy; Maciej Pędzich {{ currentYear }}</p>
    <p>
      Released under
      <a
        href="https://opensource.org/licenses/MIT"
        target="_blank"
        rel="noopener noreferrer"
      >
        MIT License
      </a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'About',
  setup() {
    const currentYear = ref<number>(new Date().getFullYear());

    return { currentYear };
  }
});
</script>
