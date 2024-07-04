<template>
  <text
    class="label"
    :transform="`translate(${x}, ${y})`"
    :fill="color"
    alignment-baseline="hanging"
    >{{ text }}</text
  >
</template>

<script setup lang="ts">
interface Props {
  text: string;
  color?: string;
  x: number;
  y: number;
}

const props = withDefaults(defineProps<Props>(), {
  // Default text color to current color
  color: 'currentColor'
});
</script>
