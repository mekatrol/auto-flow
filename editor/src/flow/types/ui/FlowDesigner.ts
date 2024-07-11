import { computed, type Ref, ref } from 'vue';
import { InputOutputElement } from './InputOutputElement';
import { ConnectionElement } from './ConnectionElement';
import type { Offset } from './Offset';
import { BlockElement } from './BlockElement';
import { ZOrder } from './ZOrder';
import type { Line } from './Line';
import { configureFlowMouseEvents } from '../../utils/event-emitter';
import type { FlowConnection } from '../persistence/FlowConnection';
import { v4 as uuidv4 } from 'uuid';
import type { Size } from './Size';

export class FlowDesigner {
  private _viewSize: Ref<{ width: number; height: number }>;
  private _blocks: Ref<BlockElement[]>;
  private _connections: Ref<ConnectionElement[]>;
  private _zOrder: ZOrder;
  private _gridSize: Ref<number>;
  private _drawingConnection = ref<ConnectionElement | undefined>(undefined);
  private _drawingConnectionEndConnector = ref<InputOutputElement | undefined>(undefined);
  private _selectedConnection = ref<ConnectionElement | undefined>(undefined);
  private _selectedBlock = ref<BlockElement | undefined>(undefined);
  private _dragBlock = ref<BlockElement | undefined>(undefined);
  private _dragBlockOffset = ref<Offset>({ x: 0, y: 0 });
  private _dragBlockOriginalPosition = ref<Offset>({ x: 0, y: 0 });

  constructor(viewSize: Ref<{ width: number; height: number }>, gridSize: Ref<number>) {
    this._blocks = ref([]);
    this._connections = ref([]);
    this._viewSize = viewSize;
    this._gridSize = gridSize;
    this._zOrder = new ZOrder(this._blocks);
  }

  public get blocks(): Ref<BlockElement[]> {
    return this._blocks;
  }

  public get connections(): Ref<ConnectionElement[]> {
    return this._connections;
  }

  public get viewSize(): Ref<{ width: number; height: number }> {
    return this._viewSize;
  }

  public get dragBlock(): Ref<BlockElement | undefined> {
    return this._dragBlock;
  }

  public get dragBlockOriginalPosition(): Ref<Offset> {
    return this._dragBlockOriginalPosition;
  }

  public get dragBlockOffset(): Ref<Offset> {
    return this._dragBlockOffset;
  }

  public get drawingConnection(): Ref<ConnectionElement | undefined> {
    return this._drawingConnection;
  }

  public get drawingConnectionEndConnector(): Ref<InputOutputElement | undefined> {
    return this._drawingConnectionEndConnector;
  }

  public get selectedBlock(): BlockElement | undefined {
    return this._selectedBlock.value;
  }

  public set selectedBlock(block: BlockElement | undefined) {
    // Clear any existing selections
    this.clearSelectedBlock();

    if (!block) {
      return;
    }

    block.selected = true;
    this._selectedBlock.value = block;
  }

  public get selectedConnection(): ConnectionElement | undefined {
    return this._selectedConnection.value;
  }

  public set selectedConnection(connection: ConnectionElement | undefined) {
    // Clear any existing selections
    this.clearSelectedConnection();

    if (!connection) {
      return;
    }

    connection.selected = true;
    this._selectedConnection.value = connection;
  }

  public clearSelectedItems(): void {
    // We just try and clear everything so that selections
    // are reset to a known state

    // Clear selected node
    this.clearSelectedBlock();

    // Clear selected connection
    this.clearSelectedConnection();

    // Clear drawing connection
    this.drawingConnection.value = undefined;
    this.drawingConnectionEndConnector.value = undefined;
  }

  public clearSelectedConnection = (): void => {
    // Clear selected node
    this._selectedConnection.value = undefined;

    if (!this._connections) {
      return;
    }

    // Make sure all are deselected
    this._connections.value.forEach((c) => (c.selected = false));
  };

  public clearSelectedBlock = (): void => {
    // Clear selected node
    this._selectedBlock.value = undefined;

    if (!this._blocks) {
      return;
    }

    // Make sure all are deselected
    this._blocks.value.forEach((n) => (n.selected = false));
  };

  public moveBlockZOrder = (action: string): void => {
    if (!this.selectedBlock || !this._blocks || !this._blocks.value) {
      return;
    }

    this._zOrder.moveBlockZOrder(action, this.selectedBlock);
  };

  public gridLines = computed((): Line[] => {
    const lines: Line[] = [];

    if (this.viewSize.value.height < this._gridSize.value || this.viewSize.value.height < this._gridSize.value) {
      return [];
    }

    for (let y = 0; y < this.viewSize.value.height; y += this._gridSize.value) {
      lines.push({
        start: { x: 0, y: y },
        end: { x: this.viewSize.value.width, y: y }
      });
    }

    for (let x = 0; x < this.viewSize.value.width; x += this._gridSize.value) {
      lines.push({
        start: { x: x, y: 0 },
        end: { x: x, y: this.viewSize.value.height }
      });
    }

    return lines;
  });

  public dragBlockMove = (e: MouseEvent): void => {
    if (!this._dragBlock.value) return;
    this._dragBlock.value.location.x = e.offsetX - this._dragBlockOffset.value.x;
    this._dragBlock.value.location.y = e.offsetY - this._dragBlockOffset.value.y;
  };

  public dragConnectionMove = (e: MouseEvent): void => {
    if (!flowDesigner.drawingConnection.value) return;

    // Get starting io
    const startInputOutput = flowDesigner.drawingConnection.value.getStartInputOutput();

    // Is there an element at the mouse position (that is not the drawing connection)
    const hitInputOutputs = this.getHitInputOutputs(e).filter(
      (io) =>
        // Don't hit test the starting io
        io != startInputOutput
    );

    // Set css extra if is hovering over valid io (connection is compatible for io types)
    const inputOutput = hitInputOutputs.length > 0 ? (hitInputOutputs[0] as InputOutputElement) : undefined;
    flowDesigner.drawingConnection.value.cssClasses = inputOutput && this.canConnect(inputOutput, startInputOutput) ? 'valid-end-point' : '';
    this._drawingConnectionEndConnector.value = inputOutput;

    // Update end offset to mouse offset
    flowDesigner.drawingConnection.value.endLocation = { x: e.offsetX, y: e.offsetY };
  };

  public dragConnectionCreateConnection = (): void => {
    if (!this._drawingConnection.value || !this._drawingConnectionEndConnector.value) {
      return;
    }

    const startBlock = this._drawingConnection.value.startBlock;
    const startBlockId = this._drawingConnection.value?.startBlockInputOutputId;
    const endBlock = this._drawingConnectionEndConnector.value?.parent! as BlockElement;
    const endBlockId = this._drawingConnectionEndConnector.value.io.id;

    const connection = {
      id: uuidv4(),
      label: null,
      description: null,
      startInputOutputId: startBlockId,
      endInputOutputId: endBlockId
    } as FlowConnection;

    const connectionElement = new ConnectionElement(connection, startBlock, endBlock);
    this._connections.value.push(connectionElement);
  };

  public canConnect = (from: InputOutputElement, to: InputOutputElement): boolean => {
    // Connection must be between io is opposite direction
    if (from.io.direction === to.io.direction) {
      return false;
    }

    // Connectors must have logic type match (eg, analogue / digital compatibility)
    if (from.io.type != to.io.type) {
      return false;
    }

    // Connectors cannot already be connected
    if (this.isConnectorConnected(from) || this.isConnectorConnected(from)) {
      return false;
    }

    return true;
  };

  public isConnectorConnected = (inputOutput: InputOutputElement): boolean => {
    let isConnected = false;
    this._connections.value.forEach((c) => {
      if (c.getStartInputOutput() === inputOutput || c.getEndInputOutput() === inputOutput) {
        isConnected = true;
        return;
      }
    });

    return isConnected;
  };

  public getBoundingBox(location: Offset, size: Size): { left: number; top: number; right: number; bottom: number } {
    return {
      left: location.x, // left
      top: location.y, // top
      right: location.x + size.width, // right
      bottom: location.y + size.height // bottom
    };
  }

  public boundingBoxContainsOffset(boundingBox: { left: number; top: number; right: number; bottom: number }, offset: Offset): boolean {
    // Check if offset within bounds (including boundary itself)
    return offset.x >= boundingBox.left && offset.x <= boundingBox.right && offset.y >= boundingBox.top && offset.y <= boundingBox.bottom;
  }

  public getHitInputOutputs = (e: MouseEvent): InputOutputElement[] => {
    const hitInputOutputs: InputOutputElement[] = [];

    this._blocks.value.forEach((block) => {
      // Convert mouse location to offset relative to block location for block input/output hit testing
      const blockRelativeOffset: Offset = { x: e.offsetX - block.location.x, y: e.offsetY - block.location.y };

      // Are any input/output hit?
      block.io.forEach((io) => {
        const boundingBox = this.getBoundingBox(io.location, io.size);
        if (this.boundingBoxContainsOffset(boundingBox, blockRelativeOffset)) {
          hitInputOutputs.push(io);
        }
      });
    });

    return hitInputOutputs;
  };

  // Whenever mouse is clicked anywhere in the designer
  // allows clearing any currently selected node when clicking
  // on designer background (ie not on a node)
  public mouseDown = (e: MouseEvent): void => {
    if (e.target instanceof SVGElement || e.target instanceof HTMLElement) {
      const element = e.target as HTMLElement | SVGElement;

      // Focus the element (which will focus the parent SVG element)
      element.focus({
        preventScroll: true
      });

      // If the actual SVG element was clicked on then clear any selected items
      if (element.tagName === 'svg') {
        this.clearSelectedItems();
      }
    }
  };

  public mouseUp = (e: MouseEvent): void => {
    if (this.drawingConnection.value && this.drawingConnectionEndConnector.value) {
      this.dragConnectionCreateConnection();
    }

    if (e.target instanceof Element) {
      const element = e.target as Element;
      if (element.tagName === 'svg') {
        this.clearSelectedBlock();
      }
    }

    // Clear drawing connection
    this.drawingConnection.value = undefined;
  };

  public mouseMove = (e: MouseEvent): void => {
    // Is there a connection being drawn
    if (this.drawingConnection.value) {
      this.dragConnectionMove(e);
      return;
    }
    this.dragBlockMove(e);
  };

  public mouseLeave = (_: MouseEvent): void => {
    this.dragBlock.value = undefined;
    this.drawingConnection.value = undefined;
  };

  public keyPress = (_e: KeyboardEvent): void => {
    // console.log('keyPress', _e);
  };

  public keyDown = (_e: KeyboardEvent): void => {
    // console.log('keyDown', _e);
  };

  public keyUp = (e: KeyboardEvent): void => {
    if (e.key === 'Delete') {
      if (this._selectedBlock.value) {
        this.deleteSelectedBlock();
      } else if (this._selectedConnection.value) {
        this.deleteSelectedConnection();
      }
    }
  };

  public deleteSelectedBlock = (): void => {
    // Can only delete the selected node if a node is actually selected
    if (!this._selectedBlock.value) {
      return;
    }

    // Delete selected node
    this.deleteBlock(this._selectedBlock.value);

    // Clear any selections
    this.clearSelectedItems();
  };

  public deleteSelectedConnection = (): void => {
    // Can only delete the selected connection if a connection is actually selected
    if (!this._selectedConnection.value) {
      return;
    }

    // Delete selected connection
    this.deleteConnection(this._selectedConnection.value);

    // Clear any selections
    this.clearSelectedItems();
  };

  public deleteBlock = (block: BlockElement): void => {
    // We must also delete any connections that connect to the node
    const connections = this._connections.value.filter((c) => c.startBlock === block || c.endBlock === block);
    connections.forEach((c) => this.deleteConnection(c));

    // Filter nodes to the set without the node
    this._blocks.value = this._blocks.value.filter((b) => b != block);
  };

  public deleteConnection = (connection: ConnectionElement): void => {
    // Filter connections to the set without the connection
    this._connections.value = this._connections.value.filter((c) => c != connection);
  };
}

// The singleton flow designer instance
let flowDesigner: FlowDesigner;

// Initialise the designer
export const initFlowDesignController = (screenSize: Ref<{ width: number; height: number }>, gridSize: Ref<number>): FlowDesigner => {
  flowDesigner = new FlowDesigner(screenSize, gridSize);

  // Mouse events
  configureFlowMouseEvents(flowDesigner);

  // Return flow designer instance
  return flowDesigner;
};

// Use the designer methods and values
export const useFlowDesigner = (): FlowDesigner => {
  return flowDesigner;
};
