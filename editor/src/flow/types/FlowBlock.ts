import type { InputOutput } from './InputOutput';
import type { Offset } from './Offset';
import type { Size } from './Size';

export interface FlowBlock {
  // Unique ID for this block instance (used for reference from other elements such as connections)
  id: string;

  // A label if one specified
  label: string | undefined;

  // The function type for this flow block
  functionType: string;

  // The location of the block in SVG view units
  location: Offset;

  // The size of the block
  size: Size;

  // The display zOrder for the element. Used to determine rendering and pointer click order.
  // Elements with a higher zOrder are considered on top of elements with a lower zOrder.
  // That is:
  //  * higher zOrder items will be rendered over the top of lower zOrder items
  //  * clicking on a location will select the element with the highest zOrder at that location
  zOrder: number;

  // The amount to boost the zOrder by. Use to bring element to front for operations such as dragging.
  zBoost: number;

  // zOrder + zBoost to give total z value
  z: number;

  // True if the element is currently selected
  selected: boolean;

  // The block inputs/outputs
  io: InputOutput[];

  // Flag to indicate if this block is a new block being dragged onto editor area
  draggingAsNew?: boolean;

  // Will be set to true if the blocks drag location is valid
  dragLocationInvalid?: boolean;

  // For a new block this will be set to try once the block has been dragged to a valid location
  // it allows stopping the block from being dragged back out of a valid location
  dragLocationHasBeenValid?: boolean;
}
