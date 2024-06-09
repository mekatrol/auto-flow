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
    <circle
      v-for="(p, i) in controlPoints"
      :key="i"
      :fill="colors[i]"
      :cx="p.x"
      :cy="p.y"
      :r="endPointRadius"
    ></circle> </g
  ><g>
    <circle
      :fill="startPointColor"
      :cx="spline.start.x"
      :cy="spline.start.y"
      :r="startPointRadius"
      @mousedown="(e) => controlPointMouseDown(e, spline.start)"
      @mouseup="(e) => controlPointMouseUp(e, spline.start)"
      @mousemove="(e) => controlPointMouseMove(e, spline.start)"
    ></circle>
    <circle
      :fill="endPointColor"
      :cx="spline.end.x"
      :cy="spline.end.y"
      :r="endPointRadius"
      @mousedown="(e) => controlPointMouseDown(e, spline.end)"
      @mouseup="(e) => controlPointMouseUp(e, spline.end)"
      @mousemove="(e) => controlPointMouseMove(e, spline.end)"
    ></circle>
  </g>
</template>

<script setup lang="ts">
import { BlockSide, type Connection, type Offset } from '@/models/ui/types';
import { generateCubicBezierPoints } from '@/utils/cubic-spline';
import { cubicBezierToSvg } from '@/utils/svg';
import { computed } from 'vue';

interface Props {
  show?: boolean;

  spline: Connection;

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

let controlPoints: Offset[] = [];
const colors = ['red', 'gray', 'blue', 'purple', 'white', 'yellow', 'brown', 'pink', 'cyan'];

const svg = computed(() => {
  const points = generateCubicBezierPoints(props.spline.start, props.spline.end, BlockSide.Right);

  controlPoints = points;

  return cubicBezierToSvg(points);
});

const emit = defineEmits<{
  (e: 'mousedown', mouseEvent: { e: MouseEvent; p: Offset }): void;
  (e: 'mouseup', mouseEvent: { e: MouseEvent; p: Offset }): void;
  (e: 'mousemove', mouseEvent: { e: MouseEvent; p: Offset }): void;
}>();

const controlPointMouseDown = (e: MouseEvent, p: Offset): void => {
  emit('mousedown', { e: e, p: p });
};

const controlPointMouseUp = (e: MouseEvent, p: Offset): void => {
  emit('mouseup', { e: e, p: p });
};

const controlPointMouseMove = (e: MouseEvent, p: Offset): void => {
  emit('mousemove', { e: e, p: p });
};
</script>
