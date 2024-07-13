<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1200"
    :height="screenSize.height"
    overflow="scroll"
    class="flow-designer"
    @mousemove="(e) => flowDesigner.mouseMove(e)"
    @mouseleave="(e) => flowDesigner.mouseLeave(e)"
    @mousedown="(e) => flowDesigner.mouseDown(e)"
    @mouseup="(e) => flowDesigner.mouseUp(e)"
    @keypress="(e) => flowDesigner.keyPress(e)"
    @keydown="(e) => flowDesigner.keyDown(e)"
    @keyup="(e) => flowDesigner.keyUp(e)"
    @focusin="(e) => focus(e)"
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

    <g class="editor">
      <BlockPalletteControl
        :width="blockPalletteWidth"
        :height="screenSize.height"
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
    </g>
  </svg>
</template>

<script setup lang="ts">
import ConnectionControl from './ConnectionControl.vue';
import ConnectingControl from './ConnectingControl.vue';
import BlockPalletteControl from './BlockPalletteControl.vue';
import { ref } from 'vue';
import { useScreenSize } from 'vue-boosted';
import BlockControl from './BlockControl.vue';
import { initFlowDesigner } from '../types/FlowDesigner';
import { useMockStore } from '../stores/mockStore';

const blockPalletteWidth = ref(168);
const gridSize = ref(20);
const screenSize = useScreenSize();

// Must be done before constructing any blocks or connections
const flowDesigner = initFlowDesigner(screenSize, gridSize, blockPalletteWidth);
const gridLines = flowDesigner.gridLines;

const { flow } = useMockStore();

flowDesigner.blocks.value = flow.blocks;
flowDesigner.connections.value = flow.connections;

const focus = (_e: FocusEvent): void => {
  // Do nothing, and SVG element won't raise keyboard events unless it has
  // a focus event handler
};
</script>

<style scoped lang="scss">
.flow-designer {
  width: 100%;
  height: 100%;
  border: 1px solid #b6b3b6;
  overflow: scroll;

  .grid-line {
    stroke: #aaaaaa77;
    stroke-width: 0.3;
    pointer-events: none;
  }
}
</style>
