<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="flow-editor"
    :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
    ref="svg"
    @pointermove="(e) => flowController.pointerMove(e)"
    @pointerleave="(e) => flowController.pointerLeave(e)"
    @pointerdown="(e) => flowController.pointerDown(e)"
    @pointerup="(e) => flowController.pointerUp(e)"
    @keypress="(e) => flowController.keyPress(e)"
    @keydown="(e) => flowController.keyDown(e)"
    @keyup="(e) => flowController.keyUp(e)"
    @focusin="(e) => focus(e)"
  >
    <g :transform="`translate(0, 0)`">
      <ContainerControl
        :width="blockPaletteWidth"
        :height="svgHeight"
      >
        <BlockPaletteControl
          :x="0"
          :y="0"
          :width="blockPaletteWidth"
          :height="svgHeight"
          :gap="paletteGap"
          :scrollbarWidth="paletteScrollbarWidth"
        />
      </ContainerControl>
    </g>
    <g :transform="`translate(${blockPaletteWidth}, 0)`">
      <ContainerControl
        :width="svgWidth - blockPaletteWidth"
        :height="svgHeight"
      >
        <FlowControl
          :width="svgWidth - blockPaletteWidth"
          :height="svgHeight"
          :grid-size="gridSize"
        />
      </ContainerControl>
    </g>
  </svg>
</template>

<script setup lang="ts">
import BlockPaletteControl from './BlockPaletteControl.vue';
import FlowControl from './FlowControl.vue';
import { onMounted, ref, watch } from 'vue';
import { useScreenSize } from 'vue-boosted';
import { initFlowController } from '../types/FlowController';
import { useMockStore } from '../stores/mock-store';
import ContainerControl from './ContainerControl.vue';
import { BLOCK_WIDTH } from '../constants';

const paletteScrollbarWidth = ref(25);
const paletteGap = ref(8);
const blockPaletteWidth = ref(BLOCK_WIDTH + 2 * paletteGap.value + paletteScrollbarWidth.value);
const gridSize = ref(20);
const screenSize = useScreenSize();
const svg = ref();
const svgWidth = ref(0);
const svgHeight = ref(0);

const calculateSvgHeight = () => {
  // Cast to SVG element
  const svgElement = svg.value as SVGSVGElement;

  // Get the parent container
  const parentDiv = svgElement.parentElement as HTMLElement;

  // Use the parent height as the height
  svgWidth.value = parentDiv.clientWidth;
  svgHeight.value = parentDiv.clientHeight;
};

// Must be done before constructing any blocks or connections
const flowController = initFlowController('flow-key', screenSize, blockPaletteWidth);

const { flow } = useMockStore();

flowController.blocks.value = flow.blocks;
flowController.connections.value = flow.connections;

onMounted(() => {
  calculateSvgHeight();
});

const focus = (_e: FocusEvent): void => {
  // Do nothing, and SVG element won't raise keyboard events unless it has
  // a focus event handler
};

watch(
  () => screenSize.value,
  (c) => {
    calculateSvgHeight();
  }
);
</script>
