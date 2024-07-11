import type { Offset } from './ui/Offset';
import type { Size } from './ui/Size';

export interface FlowBlockElement {
  // The ID of the flow function that this block represents
  functionId: string;

  // The location of the block in SVG view units
  location: Offset;

  // The size of the block
  size: Size;

  // The icon to use for the block, if an empty string then the
  // default icon for the function type will be used
  icon: string;

  // The display zOrder for the element. Used to determine rendering and mouse click order.
  // Elements with a higher zOrder are considered on top of elements with a lower zOrder.
  // That is:
  //  * higher zOrder items will be rendered over the top of lower zOrder items
  //  * clicking on a position will select the element with the highest zOrder at that position
  zOrder: number;

  // The amount to boost the zOrder by. Use to bring element to front for operations such as dragging.
  zBoost: number;

  // zOrder + zBoost to give total z value
  z: number;

  // True if the element is currently selected
  selected: boolean;
}
