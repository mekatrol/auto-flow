<template>
  <text
    class="label"
    :transform="`translate(${x}, ${y})`"
    :fill="color"
    :alignment-baseline="verticalAlignment"
    >{{ text }}</text
  >
</template>

<script setup lang="ts">
interface Props {
  text: string;
  color?: string;
  x: number;
  y: number;
  verticalAlignment?:
    | 'hanging'
    | 'auto'
    | 'baseline'
    | 'before-edge'
    | 'text-before-edge'
    | 'middle'
    | 'central'
    | 'after-edge'
    | 'text-after-edge'
    | 'ideographic'
    | 'alphabetic'
    | 'mathematical'
    | 'inherit'
    | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  // Default text color to current color
  color: 'currentColor',

  verticalAlignment: 'hanging'
});
</script>
