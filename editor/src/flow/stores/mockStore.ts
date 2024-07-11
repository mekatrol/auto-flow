import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { InputOutputSignalType } from '../types/InputOutputSignalType';
import { InputOutputDirection } from '../types/InputOutputDirection';
import type { Flow } from '../types/Flow';
import type { FlowElements } from '../types/FlowElements';
import type { FlowFunctionality } from '../types/FlowFunctionality';
import type { FlowFunction } from '../types/FlowFunction';
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

  const f = {
    functionality: {
      blocks: [
        {
          id: function1Id,
          label: 'Block 1',
          description: 'Block 1 description',
          functionType: 'AND'
        } as FlowFunction,
        {
          id: function2Id,
          label: 'Block 2',
          description: 'Block 2 description',
          functionType: 'OR'
        } as FlowFunction,
        {
          id: function3Id,
          label: 'Block 3',
          description: 'Block 3 description',
          functionType: 'NOT'
        } as FlowFunction
      ],
      connections: [
        {
          id: uuidv4(),
          label: null,
          description: null,
          startBlockId: function1Id,
          startPin: 3,
          endBlockId: function2Id,
          endPin: 1
        },
        {
          id: uuidv4(),
          label: null,
          description: null,
          startBlockId: function3Id,
          startPin: 2,
          endBlockId: function2Id,
          endPin: 2
        },
        {
          id: uuidv4(),
          label: null,
          description: null,
          startBlockId: function1Id,
          startPin: 3,
          endBlockId: function3Id,
          endPin: 1
        }
      ]
    } as FlowFunctionality,
    elements: {
      blocks: [
        {
          functionId: function1Id,
          location: { x: 300, y: 100 },
          size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
          icon: '',
          selected: false,
          zOrder: 1,
          zBoost: 0,
          z: 1
        },
        {
          functionId: function2Id,
          location: { x: 700, y: 200 },
          size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
          icon: '',
          selected: false,
          zOrder: 1,
          zBoost: 0,
          z: 1
        },
        {
          functionId: function3Id,
          location: { x: 180, y: 200 },
          size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
          icon: '',
          selected: false,
          zOrder: 1,
          zBoost: 0,
          z: 1
        }
      ],
      connections: []
    } as FlowElements
  } as Flow;

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
