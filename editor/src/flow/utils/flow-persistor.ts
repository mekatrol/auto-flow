import type { Flow } from '../types/Flow';
import { useFlowDesigner } from '../types/FlowDesigner';

export const loadFlowFromJson = (json: string): Flow => {
  const flow = JSON.parse(json) as Flow;
  const flowDesigner = useFlowDesigner();

  // Load functionality blocks first
  for (let i = 0; i < flow.blocks.length; i++) {
    const block = flow.blocks[i];

    // Layout block IO
    flowDesigner.layoutInputOutputs(block.size, block.io);
  }

  return flow;
};

export const flowToJson = (flow: Flow): string => {
  const json = JSON.stringify(flow);
  return json;
};
