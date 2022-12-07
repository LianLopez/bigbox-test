<script setup>
import { RouterView } from "vue-router";
import { NConfigProvider } from "naive-ui";

/**
 * Use this for type hints under js file
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides = {
  common: {
    primaryColor: "#FF6C5E",
  },
  Pagination: {
    itemTextColorHover: "#FF6C5E",
  },
  // ...
};
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <main class="mx-auto pt-8 md:pt-16 px-5 sm:px-8 max-w-6xl">
      <div></div>
      <RouterView :key="$route.fullPath" />
    </main>
  </n-config-provider>
</template>

<style scoped></style>
