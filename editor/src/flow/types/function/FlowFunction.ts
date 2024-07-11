import type { FunctionType as FunctionType } from './FunctionType';
import { InputOutput } from './InputOutput';

export class FlowFunction {
  public id: string; // A GUID
  public label: string | null;
  public description: string | null;
  public type: FunctionType;
  public io: InputOutput[];
  public code: (block: FlowFunction) => void;

  constructor(
    id: string,
    label: string | null,
    description: string | null,
    type: FunctionType,
    io: InputOutput[],
    code: (block: FlowFunction) => void
  ) {
    this.id = id;
    this.label = label;
    this.description = description;
    this.type = type;
    this.io = io;
    this.code = code;
  }
}
