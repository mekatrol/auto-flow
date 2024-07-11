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
import { ref } from 'vue';
import { useScreenSize } from 'vue-boosted';
import BlockControl from './BlockControl.vue';
import { initFlowDesignController } from '../types/ui/FlowDesigner';
import { loadFlowFromJson } from '../types/persistence/flow-persistor';
import type { IFlow, IFlowBlock, IFlowElements, IFlowFunctionality } from '../types/persistence/types';
import { v4 as uuidv4 } from 'uuid';
import { FunctionType } from '../types/function/FunctionType';
import { useFlowStore } from '../stores/flowStore';
import { ElementType } from '../types/ui/ElementType';
import { BlockElement } from '../types/ui/BlockElement';
import { ConnectionElement } from '../types/ui/ConnectionElement';
import { BLOCK_HEIGHT, BLOCK_WIDTH } from '../constants';
import { InputOutputSignalType } from '../types/function/InputOutputSignalType';
import { InputOutputDirection } from '../types/function/InputOutputDirection';

const gridSize = ref(20);
const screenSize = useScreenSize();
const { elements } = useFlowStore();

const function1Id = uuidv4();
const function2Id = uuidv4();
const function3Id = uuidv4();

const function1OutputId = uuidv4();
const function2Input1Id = uuidv4();
const function2Input2Id = uuidv4();
const function3InputId = uuidv4();
const function3OutputId = uuidv4();

const f = {
  functionality: {
    blocks: [
      {
        id: function1Id,
        label: 'Block 1',
        description: 'Block 1 description',
        type: FunctionType.And,
        io: [
          {
            id: uuidv4(),
            label: 'Input 1',
            description: 'AND gate input 1',
            signalType: InputOutputSignalType.Digital,
            direction: InputOutputDirection.Input
          },
          {
            id: uuidv4(),
            label: 'Input 2',
            description: 'AND gate input 2',
            signalType: InputOutputSignalType.Digital,
            direction: InputOutputDirection.Input
          },
          {
            id: function1OutputId,
            label: 'Output',
            description: 'AND gate output',
            signalType: InputOutputSignalType.Digital,
            direction: InputOutputDirection.Output
          }
        ]
      } as IFlowBlock,
      {
        id: function2Id,
        label: 'Block 2',
        description: 'Block 2 description',
        type: FunctionType.Or,
        io: [
          {
            id: function2Input1Id,
            label: 'Input 1',
            description: 'OR gate input 1',
            signalType: InputOutputSignalType.Digital,
            direction: InputOutputDirection.Input
          },
          {
            id: function2Input2Id,
            label: 'Input 2',
            description: 'OR gate input 2',
            signalType: InputOutputSignalType.Digital,
            direction: InputOutputDirection.Input
          },
          {
            id: uuidv4(),
            label: 'Output',
            description: 'OR gate output',
            signalType: InputOutputSignalType.Digital,
            direction: InputOutputDirection.Output
          }
        ]
      } as IFlowBlock,
      {
        id: function3Id,
        label: 'Block 3',
        description: 'Block 3 description',
        type: FunctionType.Invert,
        io: [
          {
            id: function3InputId,
            label: 'Input',
            description: 'NOT gate input',
            signalType: InputOutputSignalType.Digital,
            direction: InputOutputDirection.Input
          },
          {
            id: function3OutputId,
            label: 'Output',
            description: 'NOT gate output',
            signalType: InputOutputSignalType.Digital,
            direction: InputOutputDirection.Output
          }
        ]
      } as IFlowBlock
    ],
    connections: [
      {
        id: uuidv4(),
        label: null,
        description: null,
        startInputOutputId: function1OutputId,
        endInputOutputId: function2Input1Id
      },
      {
        id: uuidv4(),
        label: null,
        description: null,
        startInputOutputId: function3OutputId,
        endInputOutputId: function2Input2Id
      },
      {
        id: uuidv4(),
        label: null,
        description: null,
        startInputOutputId: function1OutputId,
        endInputOutputId: function3InputId
      }
    ]
  } as IFlowFunctionality,
  elements: {
    blocks: [
      {
        functionId: function1Id,
        location: { x: 300, y: 100 },
        size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT }
      },
      {
        functionId: function2Id,
        location: { x: 700, y: 200 },
        size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT }
      },
      {
        functionId: function3Id,
        location: { x: 180, y: 200 },
        size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT }
      }
    ],
    connections: []
  } as IFlowElements
} as IFlow;

const flow: IFlow = loadFlowFromJson(JSON.stringify(f));

// Must be done before constructing any blocks or connections
const flowDesigner = initFlowDesignController(screenSize, gridSize);
const gridLines = flowDesigner.gridLines;

const blocks: BlockElement[] = [];
const connections: ConnectionElement[] = [];

for (const key in elements) {
  const element = elements[key];

  if (element.type === ElementType.Block) {
    blocks.push(element as BlockElement);
  } else if (element.type === ElementType.Connection) {
    connections.push(element as ConnectionElement);
  }
}

flowDesigner.blocks.value = blocks;
flowDesigner.connections.value = connections;

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
