import type { FlowFunction } from './FlowFunction';
import { FlowElement } from './FlowElement';
import type { Offset } from './Offset';
import { BLOCK_CONNECTOR_OFFSET, BLOCK_CONNECTOR_SIZE, BLOCK_HEIGHT, BLOCK_WIDTH } from '../constants';
import { FlowTaggedElement } from './FlowTaggedElement';
import { FlowElementType } from './FlowElementType';
import { generateFunctionBlock } from '../utils/flow-object-generator';
import { FunctionType } from './FunctionType';
import { BlockSide } from './BlockSide';
import { FlowBlockConnector } from './FlowBlockConnector';
import type { EnumDictionary } from './EnumDictionary';

// A flow block element is a flow element that has a location and size
// This is the visible component of a function block

export class FlowBlock extends FlowTaggedElement {
  flowFunction: FlowFunction;

  readonly z: number = 0; // zOrder + zBoost
  zBoost: number = 0;

  // The display zOrder for the element. Used to determine rendering and mouse click order.
  // Elements with a higher zOrder are considered on top of elements with a lower zOrder.
  // That is:
  //  * higher zOrder items will be rendered over the top of lower zOrder items
  //  * clicking on a position will select the element with the highest zOrder at that position
  zOrder: number = 0;

  icon: string;

  constructor(id: string, label: string, description: string, functionType: FunctionType, offset: Offset) {
    super(id, label, description, FlowElementType.Block, offset, { width: BLOCK_WIDTH, height: BLOCK_HEIGHT });
    this.icon = functionType.toLowerCase();
    this.flowFunction = generateFunctionBlock(functionType, this, {
      attributes: { label: functionType.toUpperCase() }
    });

    this.layoutConnectors();
  }

  public getHitElement(offset: Offset): FlowElement | undefined {
    // Convert off set to local offset for connector hit testing
    const localOffset: Offset = { x: offset.x - this.location.x, y: offset.y - this.location.y };

    // Are any connectors hit?
    const hitConnectors = this.flowFunction.connectors.filter((c) => c.getHitElement(localOffset) != undefined);
    if (hitConnectors.length > 0) {
      // Return first
      return hitConnectors[0];
    }

    // Call base class method
    return super.getHitElement(offset);
  }

  private layoutConnectors() {
    this.transformConnectors(BlockSide.Left);
    this.transformConnectors(BlockSide.Right);
  }

  getConnectorOffsets(offset: number): EnumDictionary<BlockSide, Offset> {
    const connectorOffsets: EnumDictionary<BlockSide, Offset> = {
      [BlockSide.Left]: { x: -(BLOCK_CONNECTOR_SIZE - BLOCK_CONNECTOR_OFFSET), y: offset },
      [BlockSide.Top]: { x: offset, y: -BLOCK_CONNECTOR_OFFSET },
      [BlockSide.Right]: { x: this.size.width - BLOCK_CONNECTOR_OFFSET, y: offset },
      [BlockSide.Bottom]: { x: offset, y: this.size.height - BLOCK_CONNECTOR_OFFSET }
    };

    return connectorOffsets;
  }

  transformConnectors(side: BlockSide): FlowBlockConnector[] {
    const connectors = this.flowFunction.connectors.filter((x) => x.side === side);

    const connectorOffsets = this.getConnectorOffsets(5);

    let shift = 0;
    connectors.forEach((c) => {
      const shiftHorizontal = c.side === BlockSide.Top || c.side === BlockSide.Bottom;
      const offset = connectorOffsets[side];
      c.location.x = offset.x + (shiftHorizontal ? shift : 0);
      c.location.y = offset.y + (!shiftHorizontal ? shift : 0);
      shift += BLOCK_CONNECTOR_SIZE + (BLOCK_CONNECTOR_SIZE >> 1);
    });

    return connectors;
  }
}
