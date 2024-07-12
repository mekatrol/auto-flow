import type { BlockSide } from './BlockSide';
import { type Offset } from './Offset';
import { BlockElement } from './BlockElement';
import { ElementType } from './ElementType';
import type { FlowConnection } from '../FlowConnection';
import type { InputOutput } from '../InputOutput';

export class ConnectionElement {
  public type: ElementType;

  public _connection: FlowConnection;
  public _startBlock: BlockElement;
  public _endBlock: BlockElement | null;
  public selected: boolean = false;
  public cssClasses: string = '';

  public endLocation: Offset | undefined = undefined;

  constructor(connection: FlowConnection, startBlock: BlockElement, endBlock: BlockElement | null) {
    this.type = ElementType.Connection;
    this._connection = connection;
    this._startBlock = startBlock;
    this._endBlock = endBlock;
  }

  public get startBlock(): BlockElement {
    return this._startBlock;
  }

  public get startPin(): number {
    return this._connection.startPin;
  }

  public getStartOffset(): Offset {
    const startInputOutput = this._startBlock.io.find((io) => io.pin == this.startPin)!;
    return {
      x: this._startBlock.location.x + startInputOutput.location.x,
      y: this._startBlock.location.y + startInputOutput.location.y + startInputOutput.size.height / 2
    };
  }

  public getStartSide(): BlockSide {
    const startInputOutput = this._startBlock.io.find((io) => io.pin == this.startPin)!;
    return startInputOutput.side;
  }

  public getStartInputOutput(): InputOutput {
    return this._startBlock.io.find((io) => io.pin === this.startPin)!;
  }

  public getEndInputOutput(): InputOutput | undefined {
    // If no end block then no end block offset
    if (!this._endBlock) {
      return undefined;
    }

    return this._endBlock.io.find((io) => io.pin === this.endPin)!;
  }

  public get endBlock(): BlockElement | undefined {
    // If no end block then no end block offset
    if (!this._endBlock) {
      return undefined;
    }

    return this._endBlock;
  }

  public get endPin(): number | undefined {
    return this._connection.endPin;
  }

  public getEndOffset(): Offset {
    // If no end block then no end block offset
    if (!this._endBlock) {
      // If no end block then we must be creating a connection so return
      // location (which is set to mouse offset)
      return this.endLocation ?? { x: 0, y: 0 };
    }

    const endInputOutput = this._endBlock.io.find((io) => io.pin == this.endPin)!;
    return {
      x: this._endBlock.location.x + endInputOutput.location.x,
      y: this._endBlock.location.y + endInputOutput.location.y + endInputOutput.size.height / 2
    };
  }

  public getEndSide(): BlockSide | undefined {
    const endInputOutput = this.endBlock?.io.find((io) => io.pin == this.endPin);
    return endInputOutput?.side;
  }
}
