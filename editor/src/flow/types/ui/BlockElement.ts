import { ElementType } from './ElementType';
import { FunctionType } from '../FunctionType';
import { BlockSide } from './BlockSide';
import { InputOutputElement } from './InputOutputElement';
import { InputOutputDirection } from '../InputOutputDirection';
import type { FlowBlockElement } from '../persistence/FlowBlockElement';
import type { FlowFunction } from '../persistence/FlowFunction';
import type { Offset } from './Offset';
import type { Size } from './Size';

export class BlockElement {
  public flowFunction: FlowFunction;
  public io: InputOutputElement[];

  public zBoost: number = 0;
  public zOrder: number = 0;

  public icon: string;

  public location: Offset;
  public size: Size;
  public type: ElementType;

  public selected: boolean = false;

  constructor(element: FlowBlockElement, functionType: FunctionType, flowFunction: FlowFunction) {
    this.icon = functionType.toLowerCase();
    this.flowFunction = flowFunction;
    this.type = ElementType.Block;
    this.location = element.location;
    this.size = element.size;

    this.io = this.flowFunction.io.map(
      (io) => new InputOutputElement(this, io.direction === InputOutputDirection.Input ? BlockSide.Left : BlockSide.Right, io)
    );
  }

  public get z() {
    return this.zBoost + this.zOrder;
  }
}
