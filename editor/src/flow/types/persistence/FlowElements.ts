import type { FlowBlockElement } from './FlowBlockElement';
import type { FlowConnectionElement } from './FlowConnectionElement';

export interface FlowElements {
  blocks: FlowBlockElement[];
  connections: FlowConnectionElement[];
}
