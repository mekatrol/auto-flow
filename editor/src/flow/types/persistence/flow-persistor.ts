import { FlowFunction } from '../function/FlowFunction';
import { InputOutput } from '../function/InputOutput';
import { InputOutputDirection } from '../function/InputOutputDirection';
import type { IFlow, IFlowBlock, IFlowBlockElement, IFlowConnection } from '../persistence/types';
import { InputOutputElement } from '../ui/InputOutputElement';
import { BlockElement } from '../ui/BlockElement';
import { BlockSide } from '../ui/BlockSide';
import { ConnectionElement } from '../ui/ConnectionElement';
import { FlowConnection } from '../function/FlowConnection';
import { layoutInputOutputs } from '@/flow/utils/flow-element-helpers';
import { BLOCK_HEIGHT, BLOCK_WIDTH } from '@/flow/constants';

// Loaded functions and connections that do no have a matching element definition with have their location
// randomized such that (0, 0) <= (x,y) <= (maxX, maxY)
const maxX = 400;
const maxY = 300;

const loadBlock = (flow: IFlow, elements: Record<string, any>, flowBlock: IFlowBlock): void => {
  // Create a flow function based on the deserialized values
  const flowFunction = new FlowFunction(flowBlock.id, flowBlock.type.toUpperCase(), flowBlock.description, flowBlock.type, [], () => {});

  // Try and find the definition for the block element
  let loadedFlowElement: IFlowBlockElement | undefined = flow.elements.blocks.find((b) => b.functionId === flowBlock.id);

  // If couldn't find it then create a new one at a random location
  if (!loadedFlowElement) {
    loadedFlowElement = {
      functionId: flowBlock.id,
      location: { x: Math.floor(Math.random() * maxX), y: Math.floor(Math.random() * maxY) },
      size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
      icon: flowBlock.type.toUpperCase(),
      zOrder: 1
    };
  }

  // Create a block element for the flow function
  const blockElement = new BlockElement(loadedFlowElement, flowBlock.type, flowFunction);

  // Add to dictionary of keyed elements
  elements[flowFunction.id] = blockElement;

  for (let j = 0; j < flowBlock.io.length; j++) {
    // Get deserialized IO
    const io = flowBlock.io[j];

    // Create an input/output instance
    const inputOutput = new InputOutput(io.id, io.label, io.description, io.signalType, io.direction);

    // Add the IO to the function
    flowFunction.io.push(inputOutput);

    // Determine block side based on input or output
    const side = io.direction === InputOutputDirection.Input ? BlockSide.Left : BlockSide.Right;

    // Create input/output element for input/output
    const inputOutputElement = new InputOutputElement(blockElement, side, inputOutput);

    // Set parent
    inputOutputElement.parent = blockElement;

    // Add to parent inputs/outputs
    blockElement.io.push(inputOutputElement);

    // Add to dictionary of keyed elements
    elements[inputOutput.id] = inputOutputElement;
  }

  layoutInputOutputs(blockElement);
};

const loadConnection = (flow: IFlow, elements: Record<string, any>, flowConnection: IFlowConnection): void => {
  const startInputOutput = elements[flowConnection.startInputOutputId];
  const endInputOutput = elements[flowConnection.endInputOutputId];

  const startBlock = startInputOutput.parent! as BlockElement;
  const endBlock = endInputOutput.parent! as BlockElement;

  const connection = new FlowConnection(
    flowConnection.id,
    flowConnection.label,
    flowConnection.description,
    flowConnection.startInputOutputId,
    flowConnection.endInputOutputId
  );

  const connectionElement = new ConnectionElement(connection, startBlock, endBlock);

  // Add to dictionary of keyed elements
  elements[flowConnection.id] = connectionElement;
};

export const loadFlowFromJson = (json: string): Record<string, any> => {
  const flow = JSON.parse(json) as IFlow;
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

export const flowToJson = (flow: IFlow): string => {
  const json = JSON.stringify(flow);
  return json;
};
