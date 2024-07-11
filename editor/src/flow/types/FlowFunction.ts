import type { FunctionType } from './FunctionType';
import type { InputOutput } from './InputOutput';

export interface FlowFunction {
  // The unique ID of this block
  id: string;

  // The block label (if defined)
  label: string | null;

  // The block description (if defined)
  description: string;

  // The block function type
  type: FunctionType;

  // The input / outputs for this block
  io: InputOutput[];
}
