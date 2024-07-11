import { ElementType } from './ElementType';
import type { FlowBlockElement } from '../FlowBlockElement';
import type { FlowFunction } from '../FlowFunction';
import type { Offset } from './Offset';
import type { Size } from './Size';
import type { InputOutput } from '../InputOutput';

export class BlockElement implements FlowBlockElement {
  public functionId: string;
  public flowFunction: FlowFunction;
  public io: InputOutput[];

  public zBoost: number = 0;
  public zOrder: number = 0;
  public z: number = 0;

  public icon: string;

  public location: Offset;
  public size: Size;
  public type: ElementType;

  public selected: boolean = false;

  constructor(element: FlowBlockElement, icon: string, flowFunction: FlowFunction) {
    this.icon = icon;
    this.flowFunction = flowFunction;
    this.functionId = flowFunction.id;
    this.type = ElementType.Block;
    this.location = element.location;
    this.size = element.size;

    this.io = this.flowFunction.io.map((io) => ({ ...io }));
  }
}
