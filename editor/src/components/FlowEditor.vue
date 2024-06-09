<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1200"
      height="500"
      class="flow-designer"
      @mousemove="mouseMove"
      @mouseleave="mouseLeave"
      @mousedown="svgMouseDown"
      @mouseup="svgMouseUp"
    >
      <rect
        focusable="true"
        x="200"
        y="95"
        fill="white"
        :rx="`${5}`"
        :ry="`${5}`"
        :width="100"
        :height="50"
      ></rect>

      <rect
        focusable="true"
        x="410"
        y="155"
        fill="white"
        :rx="`${5}`"
        :ry="`${5}`"
        :width="100"
        :height="50"
      ></rect>

      <CubicSpline
        :show="true"
        :spline="spline1"
        @mousedown="(m) => controlPointMouseDown(m.e, m.p)"
        @mouseup="(m) => controlPointMouseUp(m.e, m.p)"
        @mousemove="(m) => controlPointMouseMove(m.e, m.p)"
      />
      <CubicSpline
        :show="true"
        :spline="spline2"
        @mousedown="(m) => controlPointMouseDown(m.e, m.p)"
        @mouseup="(m) => controlPointMouseUp(m.e, m.p)"
        @mousemove="(m) => controlPointMouseMove(m.e, m.p)"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import CubicSpline from './CubicSpline.vue';
import type { Connection, Offset } from '@/models/ui/types';
import { ref } from 'vue';

const spline1 = ref({ start: { x: 300, y: 110 }, end: { x: 410, y: 170 } } as Connection);
const spline2 = ref({ start: { x: 300, y: 110 }, end: { x: 200, y: 110 } } as Connection);

const mouseControlPoint = ref(null as Offset | null);
let mouseControlPointStart = { x: 0, y: 0 } as Offset;

const controlPointMouseDown = (e: MouseEvent, p: Offset): void => {
  mouseControlPoint.value = p;
  mouseControlPointStart = { x: e.offsetX - p.x, y: e.offsetY - p.y };
};

const controlPointMouseUp = (_e: MouseEvent, _p: Offset): void => {
  clearSelectedPoint();
};

const controlPointMouseMove = (e: MouseEvent, _p: Offset): void => {
  dragPointMove(e);
};

const clearSelectedPoint = (): void => {
  // Clear selected node
  mouseControlPoint.value = null;
};

const svgMouseDown = (e: MouseEvent): void => {
  if (e.target instanceof Element) {
    const element = e.target as Element;
    if (element.tagName == 'svg' || element.tagName == 'path') {
      clearSelectedPoint();
    }
  }
};

const svgMouseUp = (e: MouseEvent): void => {
  if (e.target instanceof Element) {
    const element = e.target as Element;
    if (element.tagName == 'svg' || element.tagName == 'circle' || element.tagName == 'path') {
      clearSelectedPoint();
    }
  }
};

const dragPointMove = (e: MouseEvent): void => {
  if (!mouseControlPoint.value) return;
  mouseControlPoint.value.x = e.offsetX - mouseControlPointStart.x;
  mouseControlPoint.value.y = e.offsetY - mouseControlPointStart.y;
};

const mouseMove = (e: MouseEvent): void => {
  dragPointMove(e);
};

const mouseLeave = (_: MouseEvent): void => {
  mouseControlPoint.value = null;
};
</script>

<style scoped lang="scss">
.flow-designer {
  width: 100%;
  height: 100%;
  border: 1px solid #b6b3b6;

  & > svg {
    width: 100%;
    height: 100%;
  }

  .grid-line {
    stroke: #aaaaaa;
    stroke-width: 0.5;
  }
}
</style>
