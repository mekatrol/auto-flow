import { MARKER_SIZE } from '../../constants';
import type { Shape } from './Shape';
import type { Offset } from './Offset';
import type { Size } from './Size';

export class MarkerShape {
  location: Offset;
  size: Size;
  shape: Shape;
  strokeColor: string;
  fillColor: string;

  constructor(shape: Shape, x: number, y: number, strokeColor: string = 'black', fillColor: string = 'white') {
    this.shape = shape;
    this.location = { x: x, y: y };
    this.size = { width: MARKER_SIZE, height: MARKER_SIZE };
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
  }
}
