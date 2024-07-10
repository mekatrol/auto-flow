import type { FlowFunctionConnector } from './FlowFunctionConnector';
import type { FunctionType as FunctionType } from './FunctionType';
import { InputOutput } from './InputOutput';

export class FlowFunction {
  id: string; // A GUID
  label: string;
  description: string;
  type: FunctionType;
  io: InputOutput[];
  connectors: FlowFunctionConnector[];
  code: (block: FlowFunction) => void;

  constructor(
    id: string,
    label: string,
    description: string,
    type: FunctionType,
    io: InputOutput[],
    connectors: FlowFunctionConnector[],
    code: (block: FlowFunction) => void
  ) {
    this.id = id;
    this.label = label;
    this.description = description;
    this.type = type;
    this.io = io;
    this.connectors = connectors;
    this.code = code;
  }
}
