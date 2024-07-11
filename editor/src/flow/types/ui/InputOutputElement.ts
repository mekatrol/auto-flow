import { BLOCK_IO_SIZE } from '../../constants';
import type { BlockSide } from './BlockSide';
import { ElementType } from './ElementType';
import type { Offset } from './Offset';
import type { Size } from './Size';
import type { BlockElement } from './BlockElement';
import type { InputOutput } from '../persistence/InputOutput';

export class InputOutputElement {
  type: ElementType;
  location: Offset;
  size: Size;
  io: InputOutput;
  side: BlockSide;
  parent: BlockElement;

  constructor(parent: BlockElement, side: BlockSide, io: InputOutput) {
    this.type = ElementType.BlockInputOutput;
    this.location = { x: 0, y: 0 };
    this.size = { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE };
    this.io = io;
    this.side = side;
    this.parent = parent;
  }
}
