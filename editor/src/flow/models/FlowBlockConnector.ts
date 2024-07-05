import { BLOCK_CONNECTOR_SIZE } from '../constants';
import type { BlockSide } from './BlockSide';
import { FlowElement } from './FlowElement';
import { InputOutput } from './InputOutput';

export class FlowBlockConnector extends FlowElement {
  id: string; // A GUID
  label: string;
  description: string;
  io: InputOutput;
  side: BlockSide;

  constructor(id: string, label: string, description: string, side: BlockSide, io: InputOutput) {
    super({ x: 0, y: 0 }, { width: BLOCK_CONNECTOR_SIZE, height: BLOCK_CONNECTOR_SIZE });
    this.id = id;
    this.label = label;
    this.description = description;
    this.io = io;
    this.side = side;
  }
}
