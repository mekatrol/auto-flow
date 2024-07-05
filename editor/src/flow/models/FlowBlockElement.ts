import type { FunctionBlock } from './FunctionBlock';
import { FlowElement } from './FlowElement';
import type { Offset } from './Offset';
import { BLOCK_HEIGHT, BLOCK_WIDTH } from '../constants';

// A flow block element is a flow element that has a location and size
// This is the visible component of a function block

export class FlowBlockElement extends FlowElement {
  block: FunctionBlock;

  cornerRadius: number = 3;
  zBoost: number = 0;

  constructor(block: FunctionBlock) {
    super({ x: 0, y: 0 }, { width: BLOCK_WIDTH, height: BLOCK_HEIGHT });
    this.block = block;
  }

  public getHitElement(offset: Offset): FlowElement | undefined {
    // Are any connectors hit?
    const hitConnectors = this.block.connectors.filter((c) => c.getHitElement(offset) != undefined);
    if (hitConnectors.length > 0) {
      // Return first
      return hitConnectors[0];
    }

    // Call base class method
    return super.getHitElement(offset);
  }
}
