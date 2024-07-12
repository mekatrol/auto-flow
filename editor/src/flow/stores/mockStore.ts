import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import type { Flow } from '../types/Flow';
import { loadFlowFromJson } from '../types/flow-persistor';
import { useFlowStore } from './flowStore';
import type { FlowBlockElement } from '../types/FlowBlockElement';
import type { FlowConnection } from '../types/FlowConnection';

export const useMockStore = defineStore('mock', () => {
  const { elements, clearElements, functionConfigurations } = useFlowStore();

  const andConfiguration = functionConfigurations.find((f) => f.type === 'AND')!;
  const orConfiguration = functionConfigurations.find((f) => f.type === 'OR')!;
  const notConfiguration = functionConfigurations.find((f) => f.type === 'NOT')!;

  const blocks: FlowBlockElement[] = [
    {
      id: uuidv4(),
      label: undefined,
      functionType: 'AND',
      location: { x: 300, y: 100 },
      size: { width: andConfiguration.size.width, height: andConfiguration.size.height },
      selected: false,
      zOrder: 1,
      zBoost: 0,
      z: 1,
      io: andConfiguration.io.map((io) => ({ ...io }))
    },
    {
      id: uuidv4(),
      label: undefined,
      functionType: 'OR',
      location: { x: 700, y: 200 },
      size: { width: orConfiguration.size.width, height: orConfiguration.size.height },
      selected: false,
      zOrder: 1,
      zBoost: 0,
      z: 1,
      io: orConfiguration.io.map((io) => ({ ...io }))
    },
    {
      id: uuidv4(),
      label: undefined,
      functionType: 'NOT',
      location: { x: 180, y: 200 },
      size: { width: notConfiguration.size.width, height: notConfiguration.size.height },
      selected: false,
      zOrder: 1,
      zBoost: 0,
      z: 1,
      io: notConfiguration.io.map((io) => ({ ...io }))
    }
  ];

  const connections: FlowConnection[] = [
    {
      startBlockId: blocks[0].id,
      startPin: 3,
      endBlockId: blocks[1].id,
      endPin: 1,
      selected: false
    }
  ];

  const mockFlow = {
    blocks: blocks,
    connections: connections
  } as Flow;

  // Load elements from JSON
  const flow = loadFlowFromJson(JSON.stringify(mockFlow));

  return { flow };
});
