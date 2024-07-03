import { ref, type Ref } from 'vue';
import type { BlockSide, IoDirection, IoSignalType } from './enums';

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
export class FlowEntity {
  id: string; // A GUID
  label: string;
  description: string;

  constructor(id: string, label: string, description: string) {
    this.id = id;
    this.label = label;
    this.description = description;
  }
}

// A flow input / output
export class InputOutput extends FlowEntity {
  signalType: IoSignalType;
  signalDirection: IoDirection;

  constructor(id: string, label: string, description: string, signalType: IoSignalType, signalDirection: IoDirection) {
    super(id, label, description);
    this.signalType = signalType;
    this.signalDirection = signalDirection;
  }
}

// A flow element is a visible object that is selectable
export class FlowElement extends FlowEntity {
  // True if this element is currently selected
  selected: boolean;

  constructor(id: string, label: string, description: string) {
    super(id, label, description);
    this.selected = false;
  }
}

// A flow block element is a flow element that has a location and size
// This is the visible component of a function block
export class FlowBlockElement extends FlowElement {
  // The location of the flow element relative to top / left of the screen in SVG view units.
  location: Offset;

  // The size of the flow element relative to top / left of the screen in SVG view units.
  size: Size;

  constructor(id: string, label: string, description: string) {
    super(id, label, description);
    this.location = { x: 0, y: 0 };
    this.size = { width: 0, height: 0 };
  }
}

// A flow connection element is a flow element that has start and end block connectors
export class FlowConnection extends FlowElement {
  startBlock: FlowBlock;
  startBlockConnectorId: number;
  private _endBlock: FlowBlock | undefined;
  private _endBlockConnectorId: string | undefined;

  constructor(id: string, startBlock: FlowBlock, startNodeConnectorId: number, endBlock?: FlowBlock | undefined, endBlockConnectorId?: string) {
    this.id = id;
    this.selected = false;

    this.startBlock = startBlock;
    this.startBlockConnectorId = startNodeConnectorId;

    this._endBlock = endBlock;
    this._endBlockConnectorId = endBlockConnectorId;
  }

  public get starBlock(): FlowBlock {
    return this.startBlock;
  }

  public get startNodeConnectorId(): number {
    return this.startBlockConnectorId;
  }

  getStartOffset(): Offset {
    const startConnector = this.startBlock.connectors.find((c) => c.id == this.startNodeConnectorId)!;
    return { x: this.startBlock.location.x + startConnector.x, y: this.startBlock.location.y + startConnector.y + startConnector.height / 2 };
  }

  getStartSide(): BlockSide {
    const startConnector = this.startBlock.connectors.find((c) => c.id == this.startNodeConnectorId)!;
    return startConnector.side;
  }

  public getStartConnector(): FlowBlockConnector {
    return this.startBlock.connectors.find((c) => c.id === this.startNodeConnectorId)!;
  }

  public getEndConnector(): FlowBlockConnector | undefined {
    // If no end block then no end block offset
    if (!this.endBlock) {
      return undefined;
    }

    return this.endBlock.connectors.find((c) => c.id === this.endBlockConnectorId)!;
  }

  public get endBlock(): FlowBlock {
    // If no end block then no end block offset
    if (!this.endBlock) {
      return undefined;
    }

    return this.endBlock;
  }

  public get endBlockConnectorId(): number {
    // If no end block then no end block offset
    if (!this.endBlock) {
      return undefined;
    }

    return this._endBlockConnectorId;
  }

  getEndOffset(): Offset | undefined {
    // If no end block then no end block offset
    if (!this.endBlock) {
      return undefined;
    }

    const endConnector = this.endBlock.connectors.find((c) => c.id == this.endBlockConnectorId)!;
    return { x: this.endBlock.location.x + endConnector.x, y: this.endBlock.location.y + endConnector.y + endConnector.height / 2 };
  }

  getEndSide(): BlockSide {
    const endConnector = this.endBlock.connectors.find((c) => c.id == this.endBlockConnectorId)!;
    return endConnector.side;
  }
}

export class FunctionBlock extends FlowEntity {
  io: InputOutput[];
  connectors: FlowBlockConnector[];
  code: (block: FunctionBlock) => void;

  constructor(
    id: string,
    label: string,
    description: string,
    io: InputOutput[],
    connectors: FlowBlockConnector[],
    code: (block: FunctionBlock) => void
  ) {
    super(id, label, description);
    this.io = io;
    this.connectors = connectors;
    this.code = code;
  }
}

export type FlowBlock = {
  zBoost: number;
} & FunctionBlock &
  FlowBlockElement;

export class FlowBlockConnector extends FlowBlockElement {
  io: InputOutput;
}

export type Flow = {
  blocks: FlowBlock[];
  connections: FlowConnection[];
} & FlowEntity;

export class FlowDesigner {
  viewSize: Ref<Size>;
  gridSize: Ref<number>;

  blocks: Ref<FlowBlock[]>;
  connections: Ref<FlowConnection[]>;

  // The block that is currently selected (undefined if no block selected)
  selectedBlock: Ref<FlowBlock | undefined>;

  // The current block that is being dragged (undefined if no block being dragged)
  dragBlock: Ref<FlowBlock | undefined>;
  dragBlockOffset: Ref<Offset>;
  dragBlockOriginalPosition: Ref<Offset>;

  drawingConnection: Ref<FlowConnection | undefined>;
  drawingConnectionEndConnector: Ref<FlowBlockConnector | undefined>;
  selectedConnection: Ref<FlowConnection | undefined>;
  selectedNode: Ref<FlowBlock | undefined>;

  constructor(blocks: Ref<FlowBlock[]>, connections: Ref<FlowConnection[]>, viewSize: Ref<{ width: number; height: number }>, gridSize: Ref<number>) {
    this.viewSize = viewSize;

    this.connections = connections;
    this.blocks = blocks;
    this.gridSize = gridSize;

    this.selectedBlock = ref<FlowBlock | undefined>(undefined);

    this.dragBlock = ref<FlowBlock | undefined>(undefined);
    this.dragBlockOffset = ref<Offset>({ x: 0, y: 0 });
    this.dragBlockOriginalPosition = ref<Offset>({ x: 0, y: 0 });
    this.drawingConnection = ref<FlowConnection | undefined>(undefined);
    this.drawingConnectionEndConnector = ref<FlowBlockConnector | undefined>(undefined);
    this.selectedConnection = ref<FlowConnection | undefined>(undefined);
    this.selectedNode = ref<FlowBlock | undefined>(undefined);
  }

  dragNodeMove = (e: MouseEvent): void => {
    if (!this.dragBlock.value) return;
    this.dragBlock.value.location.x = e.offsetX - this.dragBlockOffset.value.x;
    this.dragBlock.value.location.y = e.offsetY - this.dragBlockOffset.value.y;
  };

  dragConnectionMove = (e: MouseEvent): void => {
    if (!this.drawingConnection.value) return;

    // Get starting connector
    const startConnector = this.drawingConnection.value.getStartConnector();

    // Is there an element at the mouse position (that is not the drawing connection)
    const hitConnectors = this.getHitElements(e).filter(
      (x) =>
        // Must be a node connector
        x.type === FlowElementType.NodeConnector &&
        // Don't hit test connection being connected
        x !== flowDesigner.drawingConnection.value &&
        // Don't hit test the starting connector
        x != startConnector
    );

    // Set css extra if is hovering over valid connector (hit connector and connector is a compatible type)
    const connector = hitConnectors.length > 0 ? (hitConnectors[0] as IFlowNodeConnector) : undefined;
    this.drawingConnection.value.cssExtra = connector && this.canConnect(connector, startConnector) ? 'valid-end-point' : '';
    this._drawingConnectionEndConnector.value = connector;

    // Update end offset to mouse offset
    this.drawingConnection.value.endX = e.offsetX;
    this.drawingConnection.value.endY = e.offsetY;
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
}
