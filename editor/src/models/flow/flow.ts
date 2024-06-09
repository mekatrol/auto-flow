import type { BlockDefinition } from './block';
import type { BlockConnection } from './connection';

export interface Flow {
  block: BlockDefinition[];
  connectors: BlockConnection[];
}
