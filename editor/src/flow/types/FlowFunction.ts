import type { InputOutput } from './InputOutput';

export interface FlowFunction {
  // The unique ID of this block
  id: string;

  // The block label (if defined)
  label: string | null;

  // The block description (if defined)
  description: string;

  // The block function configuration type
  functionType: string;

  // The input / outputs for this block
  io: InputOutput[];
}
