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

    <ConnectionControl
      v-if="flowDesigner.drawingConnection.value"
      :connection="flowDesigner.drawingConnection.value!"
    />
  </svg>
</template>

<script setup lang="ts">
import ConnectionControl from './ConnectionControl.vue';
import { UIBlockElement } from '../types/UIBlockElement';
import { UIConnectionElement } from '../types/UIConnectionElement';
import { ref, type Ref } from 'vue';
import { useScreenSize } from 'vue-boosted';
import BlockControl from './BlockControl.vue';
import { FunctionType } from '../types/FunctionType';
import { initFlowDesignController } from '../types/FlowDesigner';

const gridSize = ref(20);
const screenSize = useScreenSize();

// Must be done before constructing any blocks or connections
const flowDesigner = initFlowDesignController(screenSize, gridSize);
const gridLines = flowDesigner.gridLines;

const flowBlock1 = new UIBlockElement('Block 1', 'This is block 1.', FunctionType.And, { x: 100, y: 200 });
const flowBlock2 = new UIBlockElement('Block 2', 'This is block 2.', FunctionType.Or, { x: 600, y: 100 });
const flowBlock3 = new UIBlockElement('Block 3', 'This is block 3.', FunctionType.Xnor, { x: 600, y: 200 });
const flowBlock4 = new UIBlockElement('Block 4', 'This is block 4.', FunctionType.Xor, { x: 900, y: 200 });
const flowBlock5 = new UIBlockElement('Block 5', 'This is block 5.', FunctionType.Invert, { x: 200, y: 400 });

const connection1: UIConnectionElement = new UIConnectionElement(
  'Connection 1',
  'This is connection 1.',
  flowBlock1,
  flowBlock1.flowFunction.connectors[flowBlock1.flowFunction.connectors.length - 1].id,
  flowBlock2,
  flowBlock2.flowFunction.connectors[1].id
);
const connection2: UIConnectionElement = new UIConnectionElement(
  'Connection 2',
  'This is connection 2.',
  flowBlock2,
  flowBlock2.flowFunction.connectors[flowBlock2.flowFunction.connectors.length - 1].id,
  flowBlock1,
  flowBlock1.flowFunction.connectors[1].id
);

flowDesigner.blocks.value = [flowBlock1, flowBlock2, flowBlock3, flowBlock4, flowBlock5];
flowDesigner.connections.value = [connection1, connection2];

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
