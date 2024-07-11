import type { InputOutputDirection } from './InputOutputDirection';
import type { InputOutputSignalType } from './InputOutputSignalType';

// A flow input / output

export class InputOutput {
  public id: string;
  public label: string | null;
  public description: string | null;
  public signalType: InputOutputSignalType;
  public signalDirection: InputOutputDirection;

  constructor(
    id: string,
    label: string | null,
    description: string | null,
    signalType: InputOutputSignalType,
    signalDirection: InputOutputDirection
  ) {
    this.id = id;
    this.label = label;
    this.description = description;
    this.signalType = signalType;
    this.signalDirection = signalDirection;
  }
}
