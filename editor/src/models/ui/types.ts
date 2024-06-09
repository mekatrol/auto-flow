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
