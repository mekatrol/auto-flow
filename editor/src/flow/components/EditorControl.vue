<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1200"
    height="500"
    class="flow-designer"
    @mousemove="flowDesigner.mouseMove"
    @mouseleave="flowDesigner.mouseLeave"
    @mousedown="flowDesigner.mouseDown"
    @mouseup="flowDesigner.mouseUp"
    @keypress="flowDesigner.keyPress"
    @keydown="flowDesigner.keyDown"
    @keyup="flowDesigner.keyUp"
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

    <BlockControl
      v-for="block in flowDesigner.blocks.value"
      :key="block.id"
      :block="block"
    />

    <ConnectionControl
      v-for="connection in flowDesigner.connections.value"
      :key="connection.id"
      :connection="connection"
    />
  </svg>
</template>

<script setup lang="ts">
import ConnectionControl from './ConnectionControl.vue';
import { FlowBlock } from '../types/FlowBlock';
import { FlowConnection } from '../types/FlowConnection';
import { ref, type Ref } from 'vue';
import { useScreenSize } from 'vue-boosted';
import BlockControl from './BlockControl.vue';
import { generateFunctionBlock } from '../utils/flow-object-generator';
import { FunctionType } from '../types/FunctionType';
import { initFlowDesignController } from '../types/FlowDesigner';
import { v4 as uuidv4 } from 'uuid';

const flowBlock1 = new FlowBlock(
  uuidv4(),
  'Block 1',
  'This is block 1.',
  generateFunctionBlock(FunctionType.And, {
    attributes: { label: 'AND' }
  })
);

flowBlock1.location.x = 100;
flowBlock1.location.y = 200;

const flowBlock2 = new FlowBlock(
  uuidv4(),
  'Block 2',
  'This is block 2.',
  generateFunctionBlock(FunctionType.Or, {
    attributes: { label: 'OR' }
  })
);

flowBlock2.location.x = 600;
flowBlock2.location.y = 100;

const connection1: FlowConnection = new FlowConnection(
  uuidv4(),
  'Connection 1',
  'This is connection 1.',
  flowBlock1,
  flowBlock1.flowFunction.connectors[flowBlock1.flowFunction.connectors.length - 1].id,
  flowBlock2,
  flowBlock2.flowFunction.connectors[1].id
);
const connection2: FlowConnection = new FlowConnection(
  uuidv4(),
  'Connection 2',
  'This is connection 2.',
  flowBlock2,
  flowBlock2.flowFunction.connectors[flowBlock2.flowFunction.connectors.length - 1].id,
  flowBlock1,
  flowBlock1.flowFunction.connectors[1].id
);

const blocks: Ref<FlowBlock[]> = ref([flowBlock1, flowBlock2]);
const connections: Ref<FlowConnection[]> = ref([connection1, connection2]);

const focusDesigner = (_e: FocusEvent): void => {
  // Do nothing, and SVG element won't raise keyboard events unless it has
  // a focus event handler
};

const gridSize = ref(20);
const screenSize = useScreenSize();
const flowDesigner = initFlowDesignController(blocks, connections, screenSize, gridSize);
const gridLines = flowDesigner.gridLines;

if (!flowDesigner.validateIds()) {
  throw new Error('Duplicate IDs found in the flow. This may cause unexpected behaviour in the designer.');
}
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
