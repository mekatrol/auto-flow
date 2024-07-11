import { MARKER_SIZE } from '../../constants';
import type { Shape } from './Shape';
import type { BlockElement } from './BlockElement';
import type { Offset } from './Offset';
import type { Size } from './Size';

export class MarkerShape {
  location: Offset;
  size: Size;
  shape: Shape;
  strokeColor: string;
  fillColor: string;
  parent: BlockElement;

  constructor(shape: Shape, x: number, y: number, parent: BlockElement, strokeColor: string = 'black', fillColor: string = 'white') {
    this.parent = parent;
    this.shape = shape;
    this.location = { x: x, y: y };
    this.size = { width: MARKER_SIZE, height: MARKER_SIZE };
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
  }
}
