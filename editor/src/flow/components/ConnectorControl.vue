<template>
  <rect
    :class="`connector`"
    :x="block.location.x + connector.location.x"
    :y="block.location.y + connector.location.y"
    :rx="`${cornerRadius}px`"
    :ry="`${cornerRadius}px`"
    :width="connector.size.width"
    :height="connector.size.height"
    :fill="fillColor"
    :stroke="strokeColor"
  >
    ></rect
  >
</template>

<script setup lang="ts">
import type { FlowBlockConnector, FlowBlockElement } from '../models/types';

interface Props {
  block: FlowBlockElement;
  connector: FlowBlockConnector;
  fillColor?: string;
  strokeColor?: string;
}
const cornerRadius = 2;

withDefaults(defineProps<Props>(), {
  // Default colors to current color
  fillColor: 'currentColor',
  strokeColor: 'currentColor'
});
</script>
