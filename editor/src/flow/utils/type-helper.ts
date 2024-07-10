import type { Offset } from '../types/ui/Offset';

export const addOffsets = (offsets: Offset[]): Offset => {
  const output: Offset = { x: 0, y: 0 };

  for (const i in offsets) {
    output.x += offsets[i].x;
    output.y += offsets[i].y;
  }

  return output;
};
