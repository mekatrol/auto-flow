<template>
  <g
    :transform="`translate(${x},${y})`"
    class="icon"
    style="pointer-events: none"
  >
    <!-- icon shadow -->
    <path
      class="dither"
      :d="`M${r} 0 h${size - r} v${size} h${-(size - r)} a ${r} ${r} 0 0 1 -${r} -${r} v-${size - 2 * r} a ${r} ${r} 0 0 1 ${r} -${r}`"
    >
    </path>

    <!-- icon -->
    <image
      :xlink:href="`icons/${icon}.svg`"
      class="flow-function-icon"
      :width="`${size}`"
      :height="`${size}`"
    >
    </image>

    <!-- icon right border -->
    <path
      :d="`M ${size - 0.5} ${0.5} l 0 ${size - 1}`"
      class="separator"
    >
    </path>
  </g>
</template>

<script setup lang="ts">
interface Props {
  icon: string;
  size: number;
  r: number; // Node corner radius
  x: number;
  y: number;
}

defineProps<Props>();
</script>
