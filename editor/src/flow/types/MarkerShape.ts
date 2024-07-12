import type { Shape } from './Shape';
import type { Offset } from './Offset';
import type { Size } from './Size';

export type MarkerShape = {
  location: Offset;
  size: Size;
  shape: Shape;
  strokeColor: string;
  fillColor: string;
};
