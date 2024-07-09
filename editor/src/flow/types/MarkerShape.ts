import { MARKER_SIZE } from '../constants';
import { UIFlowElement } from './UIFlowElement';
import { UIElementType } from './UIElementType';
import type { Shape } from './Shape';

export class MarkerShape extends UIFlowElement {
  private _shape: Shape;

  strokeColor: string;
  fillColor: string;

  constructor(id: string, shape: Shape, x: number, y: number, parent: UIFlowElement, strokeColor: string = 'black', fillColor: string = 'white') {
    super(id, UIElementType.Marker, { x: 0, y: 0 }, { width: MARKER_SIZE, height: MARKER_SIZE }, parent);
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
