<template>
  <!-- Spline path -->
  <g v-if="show">
    <path
      :d="svg"
      fill="none"
      :stroke="lineColor"
      :stroke-width="lineStrokeWidth"
    />
  </g>
  <!-- Spline start / end points -->
  <g
    fill="black"
    v-if="showPoints"
  >
  </g>
</template>

<script setup lang="ts">
import { type Line } from '../models/types';
import { BlockSide } from '../models/enums';
import { generateCubicBezierPoints } from '../utils/cubic-spline';
import { cubicBezierToSvg } from '../utils/svg';
import { computed } from 'vue';

interface Props {
  show?: boolean;

  connection: Line;

  showPoints?: boolean;

  lineColor?: string;
  lineStrokeWidth?: number | string;

  startPointColor?: string;
  startPointRadius?: number | string;

  endPointColor?: string;
  endPointRadius?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  show: true,
  showPoints: false,
  lineColor: '#ccc',
  lineStrokeWidth: 2,
  endPointColor: '#daa520',
  startPointRadius: 5,
  startPointColor: 'green',
  endPointRadius: 5
});

const svg = computed(() => {
  const points = generateCubicBezierPoints(props.connection.start, props.connection.end, BlockSide.Right);
  return cubicBezierToSvg(points);
});
</script>
