<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="200"
    height="1000"
    class="flow-controller"
    focusable="true"
    ref="svg"
    @focusin="(e) => focus(e)"
  >
    <LabelControl
      :x="0"
      :y="0"
      text="Flow Information"
      vertical-alignment="hanging"
    />
  </svg>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LabelControl from './LabelControl.vue';

const svg = ref<SVGAElement>();

const focus = (_e: FocusEvent): void => {
  // Do nothing, and SVG element won't raise keyboard events unless it has
  // a focus event handler
};

onMounted(() => {
  // Send all svg element focus events to the SVG
  svg.value!.querySelectorAll('[focusable=true]').forEach((el) => {
    el.addEventListener('focus', (_e) => {
      svg.value!.focus({
        preventScroll: true
      });
    });
  });
});
</script>
