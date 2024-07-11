import { InputOutputDirection } from '../InputOutputDirection';
import type { Flow } from './Flow';
import type { FlowBlockElement } from './FlowBlockElement';
import type { FlowConnection } from './FlowConnection';
import type { FlowFunction } from './FlowFunction';
import { InputOutputElement } from '../ui/InputOutputElement';
import { BlockElement } from '../ui/BlockElement';
import { BlockSide } from '../ui/BlockSide';
import { ConnectionElement } from '../ui/ConnectionElement';
import { layoutInputOutputs } from '@/flow/utils/flow-element-helpers';
import { BLOCK_HEIGHT, BLOCK_WIDTH } from '@/flow/constants';

// Loaded functions and connections that do no have a matching element definition with have their location
// randomized such that (0, 0) <= (x,y) <= (maxX, maxY)
const maxX = 400;
const maxY = 300;

const loadBlock = (flow: Flow, elements: Record<string, any>, flowFunction: FlowFunction): void => {
  // Try and find the definition for the block element
  let loadedFlowElement: FlowBlockElement | undefined = flow.elements.blocks.find((b) => b.functionId === flowFunction.id);

  // If couldn't find it then create a new one at a random location
  if (!loadedFlowElement) {
    loadedFlowElement = {
      functionId: flowFunction.id,
      location: { x: Math.floor(Math.random() * maxX), y: Math.floor(Math.random() * maxY) },
      size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
      icon: flowFunction.type.toUpperCase(),
      selected: false,
      zOrder: 1,
      zBoost: 0,
      z: 1
    };
  }

  // Create a block element for the flow function
  const blockElement = new BlockElement(loadedFlowElement, flowFunction.type, flowFunction);

  // Add to dictionary of keyed elements
  elements[flowFunction.id] = blockElement;

  for (let j = 0; j < flowFunction.io.length; j++) {
    // Get deserialized IO
    const io = flowFunction.io[j];

    // Determine block side based on input or output
    const side = io.direction === InputOutputDirection.Input ? BlockSide.Left : BlockSide.Right;

    // Create input/output element for input/output
    const inputOutputElement = new InputOutputElement(blockElement, side, io);

    // Set parent
    inputOutputElement.parent = blockElement;

    // Add to dictionary of keyed elements
    elements[io.id] = inputOutputElement;
  }

  layoutInputOutputs(blockElement.size, blockElement.io);
};

const loadConnection = (flow: Flow, elements: Record<string, any>, flowConnection: FlowConnection): void => {
  const startInputOutput = elements[flowConnection.startInputOutputId];
  const endInputOutput = elements[flowConnection.endInputOutputId];

  const startBlock = startInputOutput.parent! as BlockElement;
  const endBlock = endInputOutput.parent! as BlockElement;

  const connectionElement = new ConnectionElement(flowConnection, startBlock, endBlock);

  // Add to dictionary of keyed elements
  elements[flowConnection.id] = connectionElement;
};

export const loadFlowFromJson = (json: string): Record<string, any> => {
  const flow = JSON.parse(json) as Flow;
  const elements: Record<string, any> = {};

  // Load functionality blocks first
  for (let i = 0; i < flow.functionality.blocks.length; i++) {
    // Get deserialized block
    loadBlock(flow, elements, flow.functionality.blocks[i]);
  }

  // Load connections next (they reference the loaded blocks and io)
  for (let i = 0; i < flow.functionality.connections.length; i++) {
    // Get deserialized block
    loadConnection(flow, elements, flow.functionality.connections[i]);
  }

  return elements;
};

export const flowToJson = (flow: Flow): string => {
  const json = JSON.stringify(flow);
  return json;
};
