<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1200"
    height="500"
    class="flow-designer"
    @mousemove="(e) => flowDesigner.mouseMove(e)"
    @mouseleave="(e) => flowDesigner.mouseLeave(e)"
    @mousedown="(e) => flowDesigner.mouseDown(e)"
    @mouseup="(e) => flowDesigner.mouseUp(e)"
    @keypress="(e) => flowDesigner.keyPress(e)"
    @keydown="(e) => flowDesigner.keyDown(e)"
    @keyup="(e) => flowDesigner.keyUp(e)"
    @focusin="(e) => focusDesigner(e)"
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
  </svg>
</template>

<script setup lang="ts">
import ConnectionControl from './ConnectionControl.vue';
import ConnectingControl from './ConnectingControl.vue';
import { ref } from 'vue';
import { useScreenSize } from 'vue-boosted';
import BlockControl from './BlockControl.vue';
import { initFlowDesignController } from '../types/FlowDesigner';
import { useMockStore } from '../stores/mockStore';

const gridSize = ref(20);
const screenSize = useScreenSize();

// Must be done before constructing any blocks or connections
const flowDesigner = initFlowDesignController(screenSize, gridSize);
const gridLines = flowDesigner.gridLines;

const { flow } = useMockStore();

flowDesigner.blocks.value = flow.blocks;
flowDesigner.connections.value = flow.connections;

const focusDesigner = (_e: FocusEvent): void => {
  // Do nothing, and SVG element won't raise keyboard events unless it has
  // a focus event handler
};
</script>

<style scoped lang="scss">
.flow-designer {
  width: 100%;
  height: 100%;
  border: 1px solid #b6b3b6;

  .grid-line {
    stroke: #aaaaaa77;
    stroke-width: 0.3;
    pointer-events: none;
  }
}
</style>
