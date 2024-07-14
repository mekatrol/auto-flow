<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="flow-designer"
    :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
    ref="svg"
    @pointermove="(e) => flowDesigner.pointerMove(e)"
    @pointerleave="(e) => flowDesigner.pointerLeave(e)"
    @pointerdown="(e) => flowDesigner.pointerDown(e)"
    @pointerup="(e) => flowDesigner.pointerUp(e)"
    @keypress="(e) => flowDesigner.keyPress(e)"
    @keydown="(e) => flowDesigner.keyDown(e)"
    @keyup="(e) => flowDesigner.keyUp(e)"
    @focusin="(e) => focus(e)"
  >
    <g :transform="`translate(0, 0)`">
      <ContainerControl
        :width="blockPalletteWidth"
        :height="svgHeight"
      >
        <BlockPalletteControl
          :x="0"
          :y="0"
          :width="blockPalletteWidth"
          :height="svgHeight"
          :gap="palletteGap"
          :scrollbarWidth="palletteScrollbarWidth"
        />
      </ContainerControl>
    </g>
    <g :transform="`translate(${blockPalletteWidth}, 0)`">
      <ContainerControl
        :width="svgWidth - blockPalletteWidth"
        :height="svgHeight"
      >
        <FlowControl
          :width="svgWidth - blockPalletteWidth"
          :height="svgHeight"
          :grid-size="gridSize"
        />

        <ConnectionControl
          v-for="(connection, i) in flowDesigner.connections.value"
          :key="i"
          :connection="connection"
        />
        <BlockControl
          v-for="(block, i) in flowDesigner.blocks.value"
          :key="i"
          :block="block"
        />
        <ConnectingControl
          v-if="flowDesigner.drawingConnection.value"
          :connecting="flowDesigner.drawingConnection.value!"
        />
        <BlockControl
          v-if="flowDesigner.dragBlock.value && flowDesigner.dragBlock.value.draggingAsNew"
          :block="flowDesigner.dragBlock.value"
        />
      </ContainerControl>
    </g>
  </svg>
</template>

<script setup lang="ts">
import ConnectionControl from './ConnectionControl.vue';
import ConnectingControl from './ConnectingControl.vue';
import BlockPalletteControl from './BlockPalletteControl.vue';
import FlowControl from './FlowControl.vue';
import { onMounted, ref, watch } from 'vue';
import { useScreenSize } from 'vue-boosted';
import BlockControl from './BlockControl.vue';
import { initFlowDesigner } from '../types/FlowDesigner';
import { useMockStore } from '../stores/mock-store';
import ContainerControl from './ContainerControl.vue';
import { BLOCK_WIDTH } from '../constants';

const palletteScrollbarWidth = ref(25);
const palletteGap = ref(8);
const blockPalletteWidth = ref(BLOCK_WIDTH + 2 * palletteGap.value + palletteScrollbarWidth.value);
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
const flowDesigner = initFlowDesigner(screenSize, blockPalletteWidth);

const { flow } = useMockStore();

flowDesigner.blocks.value = flow.blocks;
flowDesigner.connections.value = flow.connections;

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

<style scoped lang="scss">
.flow-designer {
  width: 100%;
  height: 100%;
  transform-origin: top left;

  .editor {
    border: 1px solid #b6b3b6;
  }

  .grid-line {
    stroke: #aaaaaa77;
    stroke-width: 0.3;
    pointer-events: none;
  }
}
</style>
