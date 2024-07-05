import { MARKER_SIZE } from '../constants';
import { FlowElement } from './FlowElement';
import { FlowElementType } from './FlowElementType';
import type { Shape } from './Shape';

export class MarkerShape extends FlowElement {
  private _shape: Shape;

  strokeColor: string;
  fillColor: string;

  constructor(shape: Shape, x: number, y: number, parent: FlowElement, strokeColor: string = 'black', fillColor: string = 'white') {
    super({ x: 0, y: 0 }, { width: MARKER_SIZE, height: MARKER_SIZE }, FlowElementType.Marker, parent);
    this._shape = shape;
    this.location.x = x;
    this.location.y = y;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
  }

  public get shape(): Shape {
    return this._shape;
  }

  public set shape(value: Shape) {
    this._shape = value;
  }
}
