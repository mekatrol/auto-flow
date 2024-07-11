import type { FlowFunction } from '../function/FlowFunction';
import { FlowElement } from './FlowElement';
import type { Offset } from './Offset';
import { BLOCK_IO_OFFSET as BLOCK_IO_OFFSET, BLOCK_IO_SIZE as BLOCK_IO_SIZE, BLOCK_HEIGHT, BLOCK_WIDTH } from '../../constants';
import { LabelledElement } from './LabelledElement';
import { ElementType } from './ElementType';
import { generateFunctionBlock } from '../../utils/flow-object-generator';
import { FunctionType } from '../function/FunctionType';
import { BlockSide } from './BlockSide';
import { InputOutputElement } from './InputOutputElement';
import type { EnumDictionary } from '../EnumDictionary';
import { InputOutputDirection } from '../function/InputOutputDirection';
import type { Size } from './Size';

// A flow block element is a flow element that has a location and size
// This is the visible component of a function block

export class BlockElement extends LabelledElement {
  public flowFunction: FlowFunction;
  public io: InputOutputElement[];

  public readonly z: number = 0; // zOrder + zBoost
  public zBoost: number = 0;

  // The display zOrder for the element. Used to determine rendering and mouse click order.
  // Elements with a higher zOrder are considered on top of elements with a lower zOrder.
  // That is:
  //  * higher zOrder items will be rendered over the top of lower zOrder items
  //  * clicking on a position will select the element with the highest zOrder at that position
  public zOrder: number = 0;

  public icon: string;

  constructor(
    label: string | null,
    description: string | null,
    functionType: FunctionType,
    offset: Offset,
    size: Size | undefined,
    flowFunction?: FlowFunction | undefined
  ) {
    super(label, description, ElementType.Block, offset, size ?? { width: BLOCK_WIDTH, height: BLOCK_HEIGHT });
    this.icon = functionType.toLowerCase();
    this.flowFunction = flowFunction ?? generateFunctionBlock(functionType);

    this.io = this.flowFunction.io.map(
      (io) => new InputOutputElement(io.signalDirection === InputOutputDirection.Input ? BlockSide.Left : BlockSide.Right, io)
    );

    this.layoutInputOutputs();
  }

  public getHitElement(offset: Offset): FlowElement | undefined {
    // Convert off set to local offset for input/output hit testing
    const localOffset: Offset = { x: offset.x - this.location.x, y: offset.y - this.location.y };

    // Are any input/output hit?
    const hitInputOutput = this.io.filter((c) => c.getHitElement(localOffset) != undefined);
    if (hitInputOutput.length > 0) {
      // Return first
      return hitInputOutput[0];
    }

    // Call base class method
    return super.getHitElement(offset);
  }

  public layoutInputOutputs() {
    this.transformInputOutputs(BlockSide.Left);
    this.transformInputOutputs(BlockSide.Right);
  }

  public getInputOutputOffsets(offset: number): EnumDictionary<BlockSide, Offset> {
    const inputOutputOffsets: EnumDictionary<BlockSide, Offset> = {
      [BlockSide.Left]: { x: -(BLOCK_IO_SIZE - BLOCK_IO_OFFSET), y: offset },
      [BlockSide.Top]: { x: offset, y: -BLOCK_IO_OFFSET },
      [BlockSide.Right]: { x: this.size.width - BLOCK_IO_OFFSET, y: offset },
      [BlockSide.Bottom]: { x: offset, y: this.size.height - BLOCK_IO_OFFSET }
    };

    return inputOutputOffsets;
  }

  public transformInputOutputs(side: BlockSide): InputOutputElement[] {
    const io = this.io.filter((x) => x.side === side);

    const inputOutputOffsets = this.getInputOutputOffsets(5);

    let shift = 0;
    io.forEach((c) => {
      const shiftHorizontal = side === BlockSide.Top || side === BlockSide.Bottom;
      const offset = inputOutputOffsets[side];
      c.location.x = offset.x + (shiftHorizontal ? shift : 0);
      c.location.y = offset.y + (!shiftHorizontal ? shift : 0);
      shift += BLOCK_IO_SIZE + (BLOCK_IO_SIZE >> 1);
    });

    return io;
  }
}
