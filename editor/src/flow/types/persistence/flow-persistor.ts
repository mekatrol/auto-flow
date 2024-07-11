import { FlowFunction } from '../function/FlowFunction';
import { InputOutput } from '../function/InputOutput';
import { InputOutputDirection } from '../function/InputOutputDirection';
import type { IFlow, IFlowBlock, IFlowBlockElement, IFlowConnection } from '../persistence/types';
import { InputOutputElement } from '../ui/InputOutputElement';
import { BlockElement } from '../ui/BlockElement';
import { BlockSide } from '../ui/BlockSide';
import type { FlowElement } from '../ui/FlowElement';
import { ConnectionElement } from '../ui/ConnectionElement';
import { FlowConnection } from '../function/FlowConnection';
import { useFlowStore } from '@/flow/stores/flowStore';

// Loaded functions and connections that do no have a matching element definition with have their location
// randomized such that (0, 0) <= (x,y) <= (maxX, maxY)
const maxX = 400;
const maxY = 300;

const loadBlock = (flow: IFlow, elements: Record<string, FlowElement>, flowBlock: IFlowBlock): void => {
  // Create a flow function based on the deserialized values
  const flowFunction = new FlowFunction(flowBlock.id, flowBlock.type.toUpperCase(), flowBlock.description, flowBlock.type, [], () => {});

  // Try and find the definition for the block element
  const loadedFlowElement: IFlowBlockElement | undefined = flow.elements.blocks.find((b) => b.functionId === flowBlock.id);

  // Create a block element for the flow function
  const blockElement = new BlockElement(
    flowBlock.label,
    flowBlock.description,
    flowBlock.type,
    loadedFlowElement?.location ?? { x: Math.floor(Math.random() * maxX), y: Math.floor(Math.random() * maxY) },
    loadedFlowElement?.size,
    flowFunction
  );

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
    const inputOutputElement = new InputOutputElement(side, inputOutput);

    // Set parent
    inputOutputElement.parent = blockElement;

    // Add to parent inputs/outputs
    blockElement.io.push(inputOutputElement);

    // Add to dictionary of keyed elements
    elements[inputOutput.id] = inputOutputElement;
  }
};

const loadConnection = (flow: IFlow, elements: Record<string, FlowElement>, flowConnection: IFlowConnection): void => {
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

export const loadFlowFromJson = (json: string): IFlow => {
  const flow = JSON.parse(json) as IFlow;
  const { elements, clearElements } = useFlowStore();

  // Clear all elements from store
  clearElements();

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

  return flow;
};

export const flowToJson = (flow: IFlow): string => {
  const json = JSON.stringify(flow);
  return json;
};
