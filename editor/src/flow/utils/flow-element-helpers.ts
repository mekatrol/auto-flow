import { BLOCK_IO_OFFSET, BLOCK_IO_SIZE } from '../constants';
import type { EnumDictionary } from '../types/EnumDictionary';
import type { BlockElement } from '../types/ui/BlockElement';
import { BlockSide } from '../types/ui/BlockSide';
import type { InputOutputElement } from '../types/ui/InputOutputElement';
import type { Offset } from '../types/ui/Offset';

const getInputOutputOffsets = (block: BlockElement, offset: number): EnumDictionary<BlockSide, Offset> => {
  const inputOutputOffsets: EnumDictionary<BlockSide, Offset> = {
    [BlockSide.Left]: { x: -(BLOCK_IO_SIZE - BLOCK_IO_OFFSET), y: offset },
    [BlockSide.Top]: { x: offset, y: -BLOCK_IO_OFFSET },
    [BlockSide.Right]: { x: block.size.width - BLOCK_IO_OFFSET, y: offset },
    [BlockSide.Bottom]: { x: offset, y: block.size.height - BLOCK_IO_OFFSET }
  };

  return inputOutputOffsets;
};

const layoutInputsOutputsSide = (
  block: BlockElement,
  side: BlockSide,
  inputOutputOffsets: EnumDictionary<BlockSide, Offset>
): InputOutputElement[] => {
  const ioForSide = block.io.filter((x) => x.side === side);

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

export const layoutInputOutputs = (block: BlockElement): void => {
  // Get the layout offsets for each side
  const inputOutputOffsets = getInputOutputOffsets(block, 5);

  // Layout inputs/outputs on each side
  layoutInputsOutputsSide(block, BlockSide.Left, inputOutputOffsets);
  layoutInputsOutputsSide(block, BlockSide.Right, inputOutputOffsets);
  layoutInputsOutputsSide(block, BlockSide.Top, inputOutputOffsets);
  layoutInputsOutputsSide(block, BlockSide.Bottom, inputOutputOffsets);
};
