import type { FlowBlockElement } from './FlowBlockElement';
import type { FlowConnection } from './FlowConnection';

export interface Flow {
  blocks: FlowBlockElement[];
  connections: FlowConnection[];
}
