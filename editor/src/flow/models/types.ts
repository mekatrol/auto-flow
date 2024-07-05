import { type Ref } from 'vue';
import { configureFlowMouseEvents } from '../utils/event-emitter';
import type { FlowConnection } from './FlowConnection';
import { FlowDesigner } from './FlowDesigner';
import type { FlowBlockElement } from './FlowBlockElement';
import type { Offset } from './Offset';

export const addOffsets = (offsets: Offset[]): Offset => {
  const output: Offset = { x: 0, y: 0 };

  for (const i in offsets) {
    output.x += offsets[i].x;
    output.y += offsets[i].y;
  }

  return output;
};

// The singleton flow designer instance
let flowDesigner: FlowDesigner;

// Initialise the designer
export const initFlowDesignController = (
  blocks: Ref<FlowBlockElement[]>,
  connections: Ref<FlowConnection[]>,
  screenSize: Ref<{ width: number; height: number }>,
  gridSize: Ref<number>
): FlowDesigner => {
  flowDesigner = new FlowDesigner(blocks, connections, screenSize, gridSize);

  // Mouse events
  configureFlowMouseEvents(flowDesigner);

  // Return flow designer instance
  return flowDesigner;
};

// Use the controller methods and values
export const useFlowDesignController = (): FlowDesigner => {
  return flowDesigner;
};
