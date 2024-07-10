import type { InputOutput } from './InputOutput';

export class FlowFunctionConnector {
  public id: string;
  public io: InputOutput;

  constructor(id: string, io: InputOutput) {
    this.id = id;
    this.io = io;
  }
}
