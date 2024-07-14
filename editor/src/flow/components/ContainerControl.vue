<template>
  <path
    class="border"
    :stroke="borderStroke"
    :stroke-width="borderWidth"
    :d="`M ${borderOffset} ${borderOffset} l ${width - borderWidth} 0 l 0 ${height} l ${-width} 0 l 0 ${-height} z`"
  />
  <slot> </slot>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  width: number;
  height: number;
  borderStroke?: string;
  borderWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  borderStroke: '',
  borderWidth: 0
});

const borderOffset = computed(() => props.borderWidth / 2);
</script>

<style scoped lang="scss">
svg.container > g {
  overflow: hidden;
  transform-origin: top left;
}
</style>
