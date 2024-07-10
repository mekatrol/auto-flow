import type { InputOutputDirection } from './InputOutputDirection';
import type { InputOutputSignalType } from './InputOutputSignalType';

// A flow input / output

export class InputOutput {
  signalType: InputOutputSignalType;
  signalDirection: InputOutputDirection;

  constructor(signalType: InputOutputSignalType, signalDirection: InputOutputDirection) {
    this.signalType = signalType;
    this.signalDirection = signalDirection;
  }
}
