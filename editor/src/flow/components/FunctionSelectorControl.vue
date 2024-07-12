<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="200"
    height="1000"
    class="flow-designer"
    @focusin="(e) => focus(e)"
  >
    <LabelControl
      :x="0"
      :y="0"
      text="Function Selector"
      vertical-alignment="hanging"
    />
  </svg>
</template>

<script setup lang="ts">
import LabelControl from './LabelControl.vue';

const focus = (_e: FocusEvent): void => {
  // Do nothing, and SVG element won't raise keyboard events unless it has
  // a focus event handler
};
</script>
