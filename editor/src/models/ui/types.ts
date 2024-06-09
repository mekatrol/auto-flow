export enum BlockSide {
  Left = 'Left',
  Right = 'Right'
}

export type Offset = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Connection = {
  start: Offset;
  end: Offset;
};

export type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
