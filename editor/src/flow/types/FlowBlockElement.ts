import type { FlowFunction } from './FlowFunction';
import { FlowElement } from './FlowElement';
import type { Offset } from './Offset';
import { BLOCK_HEIGHT, BLOCK_WIDTH } from '../constants';
import { FlowTaggedElement } from './FlowTaggedElement';
import { FlowElementType } from './FlowElementType';

// A flow block element is a flow element that has a location and size
// This is the visible component of a function block

export class FlowBlockElement extends FlowTaggedElement {
  function: FlowFunction;

  cornerRadius: number = 3;

  readonly z: number = 0; // zOrder + zBoost
  zBoost: number = 0;

  // The display zOrder for the element. Used to determine rendering and mouse click order.
  // Elements with a higher zOrder are considered on top of elements with a lower zOrder.
  // That is:
  //  * higher zOrder items will be rendered over the top of lower zOrder items
  //  * clicking on a position will select the element with the highest zOrder at that position
  zOrder: number = 0;

  constructor(id: string, label: string, description: string, block: FlowFunction) {
    super(id, label, description, FlowElementType.Block, { x: 0, y: 0 }, { width: BLOCK_WIDTH, height: BLOCK_HEIGHT });
    this.function = block;
  }

  public getHitElement(offset: Offset): FlowElement | undefined {
    // Are any connectors hit?
    const hitConnectors = this.function.connectors.filter((c) => c.getHitElement(offset) != undefined);
    if (hitConnectors.length > 0) {
      // Return first
      return hitConnectors[0];
    }

    // Call base class method
    return super.getHitElement(offset);
  }
}
