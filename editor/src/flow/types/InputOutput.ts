import type { InputOutputDirection } from './InputOutputDirection';
import type { InputOutputSignalType } from './InputOutputSignalType';

export interface InputOutput {
  // The unique ID of this input/output
  id: string;

  // The input/output label (if defined)
  label: string | null;

  // The input/output description (if defined)
  description: string | null;

  // The type of signal for this input/output
  type: InputOutputSignalType;

  // The direction for this input/output relative to the block it belongs to
  direction: InputOutputDirection;
}
