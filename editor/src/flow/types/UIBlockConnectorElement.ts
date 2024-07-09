import { BLOCK_CONNECTOR_SIZE } from '../constants';
import type { BlockSide } from './BlockSide';
import { UILabelledElement } from './UILabelledElement';
import { UIElementType } from './UIElementType';
import { InputOutput } from './InputOutput';

export class UIBlockConnectorElement extends UILabelledElement {
  io: InputOutput;
  side: BlockSide;

  constructor(id: string, label: string, description: string, side: BlockSide, io: InputOutput) {
    super(id, label, description, UIElementType.BlockConnector, { x: 0, y: 0 }, { width: BLOCK_CONNECTOR_SIZE, height: BLOCK_CONNECTOR_SIZE });
    this.io = io;
    this.side = side;
  }
}
