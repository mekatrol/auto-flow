<template>
  <GridControl
    :width="width"
    :height="height"
    :grid-size="gridSize"
  />
</template>

<script setup lang="ts">
import GridControl from './GridControl.vue';

interface Props {
  width: number;
  height: number;
  gridSize: number;
}

const props = defineProps<Props>();
</script>
