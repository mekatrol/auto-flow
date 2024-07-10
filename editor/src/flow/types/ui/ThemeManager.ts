import type { Ref } from 'vue';
import type { ThemeDefinition } from './theme/themeDefinition';

export interface ThemeManager {
  theme: Ref<ThemeDefinition>;
}
