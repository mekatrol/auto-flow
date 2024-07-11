import { BLOCK_IO_OFFSET, BLOCK_IO_SIZE } from '../constants';
import type { EnumDictionary } from '../types/EnumDictionary';
import { BlockSide } from '../types/ui/BlockSide';
import type { InputOutputElement } from '../types/ui/InputOutputElement';
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

const layoutInputsOutputsSide = (
  io: InputOutputElement[],
  side: BlockSide,
  inputOutputOffsets: EnumDictionary<BlockSide, Offset>
): InputOutputElement[] => {
  const ioForSide = io.filter((x) => x.side === side);

  let shift = 0;
  ioForSide.forEach((c) => {
    const shiftHorizontal = side === BlockSide.Top || side === BlockSide.Bottom;
    const offset = inputOutputOffsets[side];
    c.location.x = offset.x + (shiftHorizontal ? shift : 0);
    c.location.y = offset.y + (!shiftHorizontal ? shift : 0);
    shift += BLOCK_IO_SIZE + (BLOCK_IO_SIZE >> 1);
  });

  return ioForSide;
};

export const layoutInputOutputs = (size: Size, io: InputOutputElement[]): void => {
  // Get the layout offsets for each side
  const inputOutputOffsets = getInputOutputOffsets(size, 5);

  // Layout inputs/outputs on each side
  layoutInputsOutputsSide(io, BlockSide.Left, inputOutputOffsets);
  layoutInputsOutputsSide(io, BlockSide.Right, inputOutputOffsets);
  layoutInputsOutputsSide(io, BlockSide.Top, inputOutputOffsets);
  layoutInputsOutputsSide(io, BlockSide.Bottom, inputOutputOffsets);
};
