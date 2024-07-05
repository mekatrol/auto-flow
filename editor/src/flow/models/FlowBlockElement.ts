import type { FlowFunction } from './FlowFunction';
import { FlowElement } from './FlowElement';
import type { Offset } from './Offset';
import { BLOCK_HEIGHT, BLOCK_WIDTH } from '../constants';

// A flow block element is a flow element that has a location and size
// This is the visible component of a function block

export class FlowBlockElement extends FlowElement {
  function: FlowFunction;

  cornerRadius: number = 3;
  zBoost: number = 0;

  constructor(block: FlowFunction) {
    super({ x: 0, y: 0 }, { width: BLOCK_WIDTH, height: BLOCK_HEIGHT });
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
