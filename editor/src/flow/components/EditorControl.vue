<template>
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
    <g class="grid">
      <line
        v-for="(line, i) in gridLines"
        :key="i"
        :x1="line.start.x"
        :y1="line.start.y"
        :x2="line.end.x"
        :y2="line.end.y"
        class="grid-line"
      ></line>
    </g>

    <BlockControl v-model="flowBlock1" />
    <BlockControl v-model="flowBlock2" />

    <ConnectionControl
      :show="true"
      :show-points="false"
      :connection="connection1"
      start-point-color="magenta"
      end-point-color="orange"
      @mousedown="(m) => controlPointMouseDown(m.e, m.p)"
      @mouseup="(m) => controlPointMouseUp(m.e, m.p)"
      @mousemove="(m) => controlPointMouseMove(m.e, m.p)"
    />
  </svg>
</template>

<script setup lang="ts">
import ConnectionControl from './ConnectionControl.vue';
import { FlowBlockElement, FlowConnection, type Line, type Offset } from '../models/types';
import { computed, ref } from 'vue';
import { useScreenSize } from 'vue-boosted';
import BlockControl from './BlockControl.vue';
import { generateFunctionBlock } from '../utils/flow-object-generator';
import { FunctionBlockType } from '../models/enums';

const flowBlock1 = new FlowBlockElement(
  generateFunctionBlock(FunctionBlockType.And, {
    attributes: { label: 'AND' }
  })
);

flowBlock1.location.x = 100;
flowBlock1.location.y = 200;
flowBlock1.size.width = 80;
flowBlock1.size.height = 40;

const flowBlock2 = new FlowBlockElement(
  generateFunctionBlock(FunctionBlockType.Or, {
    attributes: { label: 'OR' }
  })
);

flowBlock2.location.x = 600;
flowBlock2.location.y = 100;
flowBlock2.size.width = 80;
flowBlock2.size.height = 40;

const startConnector = flowBlock1.block.connectors[flowBlock1.block.connectors.length - 1];
const endConnector = flowBlock2.block.connectors[1];

const connection1 = new FlowConnection('', '', '', flowBlock1, startConnector.id, flowBlock2, endConnector.id);

const mouseControlPoint = ref(null as Offset | null);
let mouseControlPointStart = { x: 0, y: 0 } as Offset;

const viewSize = useScreenSize();
const gridSize = ref(20);

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
  // Clear selected block
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

const gridLines = computed((): Line[] => {
  const lines: Line[] = [];

  if (viewSize.value.height < gridSize.value || viewSize.value.height < gridSize.value) {
    return [];
  }

  for (let y = 0; y < viewSize.value.height; y += gridSize.value) {
    lines.push({
      start: { x: 0, y: y },
      end: { x: viewSize.value.width, y: y }
    });
  }

  for (let x = 0; x < viewSize.value.width; x += gridSize.value) {
    lines.push({
      start: { x: x, y: 0 },
      end: { x: x, y: viewSize.value.height }
    });
  }

  return lines;
});
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
    stroke: #aaaaaa77;
    stroke-width: 0.3;
  }
}
</style>
