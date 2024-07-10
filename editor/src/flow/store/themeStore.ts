import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { defaultTheme, type ThemeDefinition } from '../types/ui/theme/themeDefinition';

export const useThemeStore = defineStore('theme', () => {
  const theme: Ref<ThemeDefinition> = ref(defaultTheme);
  return { theme };
});
