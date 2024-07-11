import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { FunctionType } from '../types/function/FunctionType';
import { InputOutputSignalType } from '../types/function/InputOutputSignalType';
import { InputOutputDirection } from '../types/function/InputOutputDirection';
import type { IFlow, IFlowBlock, IFlowElements, IFlowFunctionality } from '../types/persistence/types';
import { BLOCK_HEIGHT, BLOCK_WIDTH } from '../constants';
import { loadFlowFromJson } from '../types/persistence/flow-persistor';
import type { BlockElement } from '../types/ui/BlockElement';
import type { ConnectionElement } from '../types/ui/ConnectionElement';
import { useFlowStore } from './flowStore';
import { ElementType } from '../types/ui/ElementType';

export const useMockStore = defineStore('mock', () => {
  const { elements, clearElements } = useFlowStore();

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
          size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
          icon: '',
          zOrder: 1
        },
        {
          functionId: function2Id,
          location: { x: 700, y: 200 },
          size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
          icon: '',
          zOrder: 1
        },
        {
          functionId: function3Id,
          location: { x: 180, y: 200 },
          size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
          icon: '',
          zOrder: 1
        }
      ],
      connections: []
    } as IFlowElements
  } as IFlow;

  // Load elements from JSON
  const loadedElements = loadFlowFromJson(JSON.stringify(f));

  // Clear all elements from store
  clearElements();

  for (const key in loadedElements) {
    elements[key] = loadedElements[key];
  }

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

  return { blocks, connections };
});
