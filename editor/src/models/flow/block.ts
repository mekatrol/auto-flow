import type { Entity } from './entity';
import type { IoDefinition } from './io';

export interface BlockCode {
  code: (block: BlockInstance) => void;
}

export interface BlockDefinition extends Entity {
  io: IoDefinition[];
  code: BlockCode;
}

export interface BlockInstance {}
