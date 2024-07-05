import type { FunctionBlockType } from './FunctionBlockType';
import { InputOutput } from './InputOutput';
import { FlowBlockConnector } from './FlowBlockConnector';

export class FunctionBlock {
  id: string; // A GUID
  label: string;
  description: string;
  type: FunctionBlockType;
  io: InputOutput[];
  connectors: FlowBlockConnector[];
  code: (block: FunctionBlock) => void;

  constructor(
    id: string,
    label: string,
    description: string,
    type: FunctionBlockType,
    io: InputOutput[],
    connectors: FlowBlockConnector[],
    code: (block: FunctionBlock) => void
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
