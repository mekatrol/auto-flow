import { ref, type Ref } from 'vue';
import type { BlockSide, FunctionBlockType, IoDirection, IoSignalType } from './enums';

export type Shape = 'square' | 'circle' | 'triangle';

// Represents an offset position of an element in the the SVG view coordinates
export type Offset = {
  x: number;
  y: number;
};

// Represents the size of an element in the the SVG view coordinates
export type Size = {
  width: number;
  height: number;
};

// A line (straight or spline) from start to finish in SVG view coordinates
export type Line = {
  start: Offset;
  end: Offset;
};

// All flow objects are an entity
export class FlowEntity {}

// A flow input / output
export class InputOutput extends FlowEntity {
  signalType: IoSignalType;
  signalDirection: IoDirection;

  constructor(signalType: IoSignalType, signalDirection: IoDirection) {
    super();
    this.signalType = signalType;
    this.signalDirection = signalDirection;
  }
}

// A flow element is a visible object that is selectable
export class FlowElement extends FlowEntity {
  // True if this element is currently selected
  selected: boolean;

  // The location of the flow element relative to top / left of the screen in SVG view units.
  location: Offset;

  // The size of the flow element relative to top / left of the screen in SVG view units.
  size: Size;

  parent: FlowElement | undefined;

  constructor(parent?: FlowElement) {
    super();
    this.selected = false;
    this.location = { x: 0, y: 0 };
    this.size = { width: 0, height: 0 };
    this.parent = parent;
  }

  public getHitElement(offset: Offset): FlowElement | undefined {
    const hitElement = this.containsOffset(offset) ? this : undefined;
    return hitElement;
  }

  public getBoundingRect(): { left: number; top: number; right: number; bottom: number } {
    // Children offsets are relative to parent, so if this element
    // has a parent then offset by parent element bounds top left
    const parentBounds = this.parent?.getBoundingRect() ?? { left: 0, top: 0, right: 0, bottom: 0 };
    const x = parentBounds.left + this.location.x;
    const y = parentBounds.top + this.location.y;

    return {
      left: x, // left
      top: y, // top
      right: x + this.size.width, // right
      bottom: y + this.size.height // bottom
    };
  }

  // Default implementation just tests bounding box
  public containsOffset(offset: Offset): boolean {
    // Calculate left, right, top and bottom
    const bounds = this.getBoundingRect();

    // Check if offset within bounds (including boundary itself)
    return offset.x >= bounds.left && offset.x <= bounds.right && offset.y >= bounds.top && offset.y <= bounds.bottom;
  }
}

// A flow block element is a flow element that has a location and size
// This is the visible component of a function block
export class FlowBlockElement extends FlowElement {
  block: FunctionBlock;

  cornerRadius: number = 3;
  zBoost: number = 0;
  fill: string = 'purple';
  stroke: string = 'cyan';

  constructor(block: FunctionBlock) {
    super();
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

export class MarkerShape extends FlowElement {
  private _shape: Shape;

  strokeColor: string;
  fillColor: string;

  constructor(shape: Shape, x: number, y: number, parent: FlowElement, strokeColor: string = 'black', fillColor: string = 'white') {
    super(parent);
    this._shape = shape;
    this.location.x = x;
    this.location.y = y;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
  }

  public get shape(): Shape {
    return this._shape;
  }

  public set shape(value: Shape) {
    this._shape = value;
  }
}

// A flow connection element is a flow element that has start and end block connectors
export class FlowConnection extends FlowElement {
  id: string; // A GUID
  label: string;
  description: string;
  startBlock: FlowBlockElement;
  startBlockConnectorId: string;
  private _endBlock: FlowBlockElement | undefined;
  private _endBlockConnectorId: string | undefined;

  constructor(
    id: string,
    label: string,
    description: string,
    startBlock: FlowBlockElement,
    startNodeConnectorId: string,
    endBlock?: FlowBlockElement | undefined,
    endBlockConnectorId?: string
  ) {
    super();
    this.id = id;
    this.label = label;
    this.description = description;
    this.selected = false;

    this.startBlock = startBlock;
    this.startBlockConnectorId = startNodeConnectorId;

    this._endBlock = endBlock;
    this._endBlockConnectorId = endBlockConnectorId;
  }

  public get starBlock(): FlowBlockElement {
    return this.startBlock;
  }

  public get startNodeConnectorId(): string {
    return this.startBlockConnectorId;
  }

  getStartOffset(): Offset {
    const startConnector = this.startBlock.block.connectors.find((c) => c.id == this.startNodeConnectorId)!;
    return {
      x: this.startBlock.location.x + startConnector.location.x,
      y: this.startBlock.location.y + startConnector.location.y + startConnector.size.height / 2
    };
  }

  getStartSide(): BlockSide {
    const startConnector = this.startBlock.block.connectors.find((c) => c.id == this.startNodeConnectorId)!;
    return startConnector.side;
  }

  public getStartConnector(): FlowBlockConnector {
    return this.startBlock.block.connectors.find((c) => c.id === this.startNodeConnectorId)!;
  }

  public getEndConnector(): FlowBlockConnector | undefined {
    // If no end block then no end block offset
    if (!this._endBlock) {
      return undefined;
    }

    return this._endBlock.block.connectors.find((c) => c.id === this.endBlockConnectorId)!;
  }

  public get endBlock(): FlowBlockElement | undefined {
    // If no end block then no end block offset
    if (!this._endBlock) {
      return undefined;
    }

    return this._endBlock;
  }

  public get endBlockConnectorId(): string | undefined {
    // If no end block then no end block offset
    if (!this._endBlock) {
      return undefined;
    }

    return this._endBlockConnectorId;
  }

  getEndOffset(): Offset | undefined {
    // If no end block then no end block offset
    if (!this._endBlock) {
      return undefined;
    }

    const endConnector = this._endBlock.block.connectors.find((c) => c.id == this.endBlockConnectorId)!;
    return {
      x: this._endBlock.location.x + endConnector.location.x,
      y: this._endBlock.location.y + endConnector.location.y + endConnector.size.height / 2
    };
  }

  getEndSide(): BlockSide | undefined {
    const endConnector = this.endBlock?.block.connectors.find((c) => c.id == this.endBlockConnectorId);
    return endConnector?.side;
  }
}

export class FunctionBlock extends FlowEntity {
  id: string; // A GUID
  label: string;
  description: string;
  type: FunctionBlockType;
  io: InputOutput[];
  connectors: FlowBlockConnector[];
  code: (block: FunctionBlock) => void;

  constructor(
    id: string,
    label: string,
    description: string,
    type: FunctionBlockType,
    io: InputOutput[],
    connectors: FlowBlockConnector[],
    code: (block: FunctionBlock) => void
  ) {
    super();
    this.id = id;
    this.label = label;
    this.description = description;
    this.type = type;
    this.io = io;
    this.connectors = connectors;
    this.code = code;
  }
}

export class FlowBlockConnector extends FlowElement {
  id: string; // A GUID
  label: string;
  description: string;
  io: InputOutput;
  side: BlockSide;

  constructor(id: string, label: string, description: string, side: BlockSide, io: InputOutput) {
    super();
    this.id = id;
    this.label = label;
    this.description = description;
    this.io = io;
    this.side = side;
  }
}

export type Flow = {
  blocks: FlowBlockElement[];
  connections: FlowConnection[];
} & FlowEntity;

export class FlowDesigner {
  viewSize: Ref<Size>;
  gridSize: Ref<number>;

  blocks: Ref<FlowBlockElement[]>;
  connections: Ref<FlowConnection[]>;

  // The block that is currently selected (undefined if no block selected)
  selectedBlock: Ref<FlowBlockElement | undefined>;

  // The current block that is being dragged (undefined if no block being dragged)
  dragBlock: Ref<FlowBlockElement | undefined>;
  dragBlockOffset: Ref<Offset>;
  dragBlockOriginalPosition: Ref<Offset>;

  drawingConnection: Ref<FlowConnection | undefined>;
  drawingConnectionEndConnector: Ref<FlowBlockConnector | undefined>;
  selectedConnection: Ref<FlowConnection | undefined>;

  constructor(
    blocks: Ref<FlowBlockElement[]>,
    connections: Ref<FlowConnection[]>,
    viewSize: Ref<{ width: number; height: number }>,
    gridSize: Ref<number>
  ) {
    this.viewSize = viewSize;

    this.connections = connections;
    this.blocks = blocks;
    this.gridSize = gridSize;

    this.selectedBlock = ref(undefined);

    this.dragBlock = ref<FlowBlockElement | undefined>(undefined);
    this.dragBlockOffset = ref<Offset>({ x: 0, y: 0 });
    this.dragBlockOriginalPosition = ref<Offset>({ x: 0, y: 0 });
    this.drawingConnection = ref(undefined);
    this.drawingConnectionEndConnector = ref<FlowBlockConnector | undefined>(undefined);
    this.selectedConnection = ref(undefined);
  }

  dragNodeMove = (e: MouseEvent): void => {
    if (!this.dragBlock.value) return;
    this.dragBlock.value.location.x = e.offsetX - this.dragBlockOffset.value.x;
    this.dragBlock.value.location.y = e.offsetY - this.dragBlockOffset.value.y;
  };

  public clearSelectedItems(): void {
    // We just try and clear everything so that selections
    // are reset to a known state

    // Clear selected block
    this.clearSelectedBlock();

    // Clear selected connection
    this.clearSelectedConnection();

    // Clear drawing connection
    this.drawingConnection.value = undefined;
    this.drawingConnectionEndConnector.value = undefined;
  }

  private clearSelectedConnection = (): void => {
    // Clear selected connection
    this.selectedConnection.value = undefined;

    if (!this.connections) {
      return;
    }

    // Make sure all are deselected
    this.connections.value.forEach((c) => (c.selected = false));
  };

  private clearSelectedBlock = (): void => {
    // Clear selected node
    this.selectedBlock.value = undefined;

    if (!this.blocks) {
      return;
    }

    // Make sure all are deselected
    this.blocks.value.forEach((b) => (b.selected = false));
  };

  private getHitElements = (e: MouseEvent): FlowElement[] => {
    const hitElements = [] as FlowElement[];
    const offset = { x: e.offsetX, y: e.offsetY } as Offset;

    this.blocks.value.forEach((b) => {
      const hitElement = b.getHitElement(offset);

      if (hitElement) {
        hitElements.push(hitElement);
      }
    });

    this.connections.value.forEach((c) => {
      const hitElement = c.getHitElement(offset);

      if (hitElement) {
        hitElements.push(hitElement);
      }
    });

    return hitElements;
  };
}
