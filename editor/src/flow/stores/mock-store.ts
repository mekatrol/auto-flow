import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import type { Flow } from '../types/Flow';
import { loadFlowFromJson } from '../utils/flow-persistor';
import { useFlowStore } from './flow-store';
import type { FlowBlock } from '../types/FlowBlock';
import type { FlowConnection } from '../types/FlowConnection';

export const useMockStore = defineStore('mock', () => {
  const createMockFlow = (): Flow => {
    const { blockTemplates } = useFlowStore();

    const andConfiguration = blockTemplates.find((f) => f.type === 'AND')!;
    const orConfiguration = blockTemplates.find((f) => f.type === 'OR')!;
    const notConfiguration = blockTemplates.find((f) => f.type === 'NOT')!;
    const biConfiguration = blockTemplates.find((f) => f.type === 'BI')!;
    const boConfiguration = blockTemplates.find((f) => f.type === 'BO')!;

    const blocks: FlowBlock[] = [
      {
        id: uuidv4(),
        label: undefined,
        functionType: 'AND',
        offset: { x: 100, y: 100 },
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
        offset: { x: 500, y: 200 },
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
        offset: { x: 1000, y: 50 },
        size: { width: notConfiguration.size.width, height: notConfiguration.size.height },
        selected: false,
        zOrder: 1,
        zBoost: 0,
        z: 1,
        io: notConfiguration.io.map((io) => ({ ...io }))
      },
      {
        id: uuidv4(),
        label: undefined,
        functionType: 'TRANSITION',
        offset: { x: 280, y: 350 },
        size: { width: notConfiguration.size.width, height: notConfiguration.size.height },
        selected: false,
        zOrder: 1,
        zBoost: 0,
        z: 1,
        io: notConfiguration.io.map((io) => ({ ...io }))
      },
      {
        id: uuidv4(),
        label: undefined,
        functionType: 'BI',
        offset: { x: 100, y: 200 },
        size: { width: biConfiguration.size.width, height: biConfiguration.size.height },
        selected: false,
        zOrder: 1,
        zBoost: 0,
        z: 1,
        io: biConfiguration.io.map((io) => ({ ...io }))
      },
      {
        id: uuidv4(),
        label: undefined,
        functionType: 'BO',
        offset: { x: 980, y: 350 },
        size: { width: boConfiguration.size.width, height: boConfiguration.size.height },
        selected: false,
        zOrder: 1,
        zBoost: 0,
        z: 1,
        io: boConfiguration.io.map((io) => ({ ...io }))
      }
    ];

    const connections: FlowConnection[] = [
      {
        startBlockId: blocks[0].id,
        startPin: 3,
        endBlockId: blocks[1].id,
        endPin: 1,
        selected: false
      },
      {
        startBlockId: blocks[3].id,
        startPin: 2,
        endBlockId: blocks[2].id,
        endPin: 1,
        selected: false
      },
      {
        startBlockId: blocks[4].id,
        startPin: 1,
        endBlockId: blocks[3].id,
        endPin: 1,
        selected: false
      },
      {
        startBlockId: blocks[2].id,
        startPin: 2,
        endBlockId: blocks[5].id,
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

    const json = JSON.stringify(flow);
    // console.log(json);

    return flow;
  };

  return { createMockFlow };
});
