import type { Flow } from '../types/Flow';
import { useFlowController } from '../types/FlowController';

export const loadFlowFromJson = (json: string): Flow => {
  const flow = JSON.parse(json) as Flow;
  const flowController = useFlowController();

  // Load functionality blocks first
  for (let i = 0; i < flow.blocks.length; i++) {
    const block = flow.blocks[i];

    // Layout block IO
    flowController.layoutInputOutputs(block.size, block.io);
  }

  return flow;
};

export const flowToJson = (flow: Flow): string => {
  const json = JSON.stringify(flow);
  return json;
};
