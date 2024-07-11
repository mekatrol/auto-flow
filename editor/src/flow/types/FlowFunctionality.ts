import type { FlowConnection } from './FlowConnection';
import type { FlowFunction } from './FlowFunction';

export interface FlowFunctionality {
  blocks: FlowFunction[];
  connections: FlowConnection[];
}
