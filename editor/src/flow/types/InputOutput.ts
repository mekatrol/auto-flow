import type { InputOutputDirection } from './InputOutputDirection';
import type { InputOutputSignalType } from './InputOutputSignalType';
import type { BlockSide } from './ui/BlockSide';

export interface InputOutput {
  // The unique pin number of this input/output for a given function block
  pin: number;

  // The input/output label (if defined)
  label: string | null;

  // The input/output description (if defined)
  description: string | null;

  // The type of signal for this input/output
  type: InputOutputSignalType;

  // The direction for this input/output relative to the block it belongs to
  direction: InputOutputDirection;

  // Indicates the side of the block that this IO should be displayed.
  side: BlockSide;
}
