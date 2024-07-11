import { InputOutputDirection } from '../InputOutputDirection';
import type { Flow } from '../Flow';
import type { FlowBlockElement } from '../FlowBlockElement';
import type { FlowConnection } from '../FlowConnection';
import type { FlowFunction } from '../FlowFunction';
import { BlockElement } from '../ui/BlockElement';
import { BlockSide } from '../ui/BlockSide';
import { ConnectionElement } from '../ui/ConnectionElement';
import { layoutInputOutputs } from '@/flow/utils/flow-element-helpers';
import { BLOCK_HEIGHT, BLOCK_IO_SIZE, BLOCK_WIDTH } from '@/flow/constants';
import { useFlowStore } from '@/flow/stores/flowStore';

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
      icon: flowFunction.functionType.toUpperCase(),
      selected: false,
      zOrder: 1,
      zBoost: 0,
      z: 1
    };
  }

  const { functionConfigurations } = useFlowStore();
  const config = functionConfigurations.find((f) => f.type === flowFunction.functionType);

  if (!config) {
    throw new Error(
      `The flow function with ID '${flowFunction.id}' references the block configuration type '${flowFunction.functionType}' which does not exist.`
    );
  }

  // Populate function with copy of IO values
  flowFunction.io = config.io.map((io) => ({ ...io, size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE } }));

  // Create a block element for the flow function
  const blockElement = new BlockElement(loadedFlowElement, config.type.toLowerCase(), flowFunction);

  // Add to dictionary of keyed elements
  elements[flowFunction.id] = blockElement;

  for (let j = 0; j < flowFunction.io.length; j++) {
    // Get deserialized IO
    const io = flowFunction.io[j];

    // Add to dictionary of keyed elements
    elements[io.pin] = io;
  }

  layoutInputOutputs(blockElement.size, blockElement.io);
};

const loadConnection = (flow: Flow, elements: Record<string, any>, flowConnection: FlowConnection): void => {
  const startBlock = elements[flowConnection.startBlockId] as BlockElement;
  const endBlock = elements[flowConnection.endBlockId] as BlockElement;

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
