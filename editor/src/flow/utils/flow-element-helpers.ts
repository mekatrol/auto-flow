import { BLOCK_IO_OFFSET, BLOCK_IO_SIZE } from '../constants';
import type { EnumDictionary } from '../types/EnumDictionary';
import type { InputOutput } from '../types/InputOutput';
import { BlockSide } from '../types/ui/BlockSide';
import type { Offset } from '../types/ui/Offset';
import type { Size } from '../types/ui/Size';

const getInputOutputOffsets = (size: Size, offset: number): EnumDictionary<BlockSide, Offset> => {
  const inputOutputOffsets: EnumDictionary<BlockSide, Offset> = {
    [BlockSide.Left]: { x: -(BLOCK_IO_SIZE - BLOCK_IO_OFFSET), y: offset },
    [BlockSide.Top]: { x: offset, y: -BLOCK_IO_OFFSET },
    [BlockSide.Right]: { x: size.width - BLOCK_IO_OFFSET, y: offset },
    [BlockSide.Bottom]: { x: offset, y: size.height - BLOCK_IO_OFFSET }
  };

  return inputOutputOffsets;
};

const layoutInputsOutputsSide = (io: InputOutput[], side: BlockSide, inputOutputOffsets: EnumDictionary<BlockSide, Offset>): InputOutput[] => {
  const ioForSide = io.filter((io) => io.side === side);

  let shift = 0;
  ioForSide.forEach((io) => {
    const shiftHorizontal = side === BlockSide.Top || side === BlockSide.Bottom;
    const offset = inputOutputOffsets[side];
    io.location = { x: offset.x + (shiftHorizontal ? shift : 0), y: offset.y + (!shiftHorizontal ? shift : 0) };
    shift += BLOCK_IO_SIZE + (BLOCK_IO_SIZE >> 1);
  });

  return ioForSide;
};

export const layoutInputOutputs = (size: Size, io: InputOutput[]): void => {
  // Get the layout offsets for each side
  const inputOutputOffsets = getInputOutputOffsets(size, 5);

  // Layout inputs/outputs on each side
  layoutInputsOutputsSide(io, BlockSide.Left, inputOutputOffsets);
  layoutInputsOutputsSide(io, BlockSide.Right, inputOutputOffsets);
  layoutInputsOutputsSide(io, BlockSide.Top, inputOutputOffsets);
  layoutInputsOutputsSide(io, BlockSide.Bottom, inputOutputOffsets);
};
