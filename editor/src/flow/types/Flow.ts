import type { FlowBlock } from './FlowBlock';
import type { FlowConnection } from './FlowConnection';

export interface Flow {
  blocks: FlowBlock[];
  connections: FlowConnection[];
}
