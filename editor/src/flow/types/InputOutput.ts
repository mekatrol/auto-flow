import type { InputOutputDirection } from './InputOutputDirection';
import type { InputOutputSignalType } from './InputOutputSignalType';
import type { BlockSide } from './BlockSide';
import type { Offset } from './Offset';
import type { Size } from './Size';

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

  // The location of this input/output (relative to any parent component)
  location: Offset;

  // The visual size of the input/output
  size: Size;

  // Indicates the side of the block that this IO should be displayed.
  side: BlockSide;
}
