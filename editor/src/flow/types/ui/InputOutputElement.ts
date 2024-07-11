import { BLOCK_IO_SIZE } from '../../constants';
import type { BlockSide } from './BlockSide';
import { FlowElement } from './FlowElement';
import { ElementType } from './ElementType';
import type { InputOutput } from '../function/InputOutput';

export class InputOutputElement extends FlowElement {
  io: InputOutput;
  side: BlockSide;

  constructor(side: BlockSide, io: InputOutput) {
    super(ElementType.BlockInputOutput, { x: 0, y: 0 }, { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE });
    this.io = io;
    this.side = side;
  }
}
