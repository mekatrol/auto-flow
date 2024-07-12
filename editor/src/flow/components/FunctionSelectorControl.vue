<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="203"
    height="1200"
    class="flow-designer"
    @focusin="(e) => focus(e)"
  >
    <BlockConfigurationControl
      v-for="(functionConfiguration, i) in functionConfigurations"
      :key="i"
      :blockConfiguration="functionConfiguration"
      :x="gap"
      :y="i * BLOCK_HEIGHT + gap + gap * i"
    />
  </svg>
</template>

<script setup lang="ts">
import BlockConfigurationControl from './BlockConfigurationControl.vue';
import { useFlowStore } from '../stores/flowStore';
import { BLOCK_HEIGHT } from '../constants';

const { functionConfigurations } = useFlowStore();

const gap = 7;

const focus = (_e: FocusEvent): void => {
  // Do nothing, and SVG element won't raise keyboard events unless it has
  // a focus event handler
};
</script>
