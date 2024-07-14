import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { BLOCK_WIDTH, PALETTE_GAP, SCROLLBAR_SIZE } from '../constants';

export const useAppStore = defineStore('app', () => {
  const isBusyCount = ref(0);

  const isBusy = computed(() => isBusyCount.value > 0);

  const incrementBusy = (): void => {
    isBusyCount.value++;
  };

  const decrementBusy = (): void => {
    isBusyCount.value--;

    if (isBusyCount.value < 0) {
      isBusyCount.value = 0;
    }
  };

  const blockPaletteWidth = computed(() => {
    return BLOCK_WIDTH + 2 * PALETTE_GAP + SCROLLBAR_SIZE;
  });

  return { isBusy, incrementBusy, decrementBusy, blockPaletteWidth };
});
