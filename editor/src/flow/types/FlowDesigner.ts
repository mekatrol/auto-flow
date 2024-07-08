import { computed, type Ref, ref } from 'vue';
import { FlowBlockConnector } from './FlowBlockConnector';
import { FlowConnection } from './FlowConnection';
import { FlowElement } from './FlowElement';
import type { Offset } from './Offset';
import { FlowBlock } from './FlowBlock';
import { ZOrder } from './ZOrder';
import type { Line } from './Line';
import type { FlowTaggedElement } from './FlowTaggedElement';
import { v4 as uuidv4 } from 'uuid';
import { configureFlowMouseEvents } from '../utils/event-emitter';
import { FlowElementType } from './FlowElementType';

export class FlowDesigner {
  private _viewSize: Ref<{ width: number; height: number }>;
  private _blocks: Ref<FlowBlock[]>;
  private _connections: Ref<FlowConnection[]>;
  private _zOrder: ZOrder;
  private _gridSize: Ref<number>;
  private _drawingConnection = ref<FlowConnection | undefined>(undefined);
  private _drawingConnectionEndConnector = ref<FlowBlockConnector | undefined>(undefined);
  private _selectedConnection = ref<FlowConnection | undefined>(undefined);
  private _selectedBlock = ref<FlowBlock | undefined>(undefined);
  private _dragBlock = ref<FlowBlock | undefined>(undefined);
  private _dragBlockOffset = ref<Offset>({ x: 0, y: 0 });
  private _dragBlockOriginalPosition = ref<Offset>({ x: 0, y: 0 });

  constructor(nodes: Ref<FlowBlock[]>, connections: Ref<FlowConnection[]>, viewSize: Ref<{ width: number; height: number }>, gridSize: Ref<number>) {
    this._blocks = nodes;
    this._connections = connections;
    this._viewSize = viewSize;
    this._gridSize = gridSize;
    this._zOrder = new ZOrder(nodes);
  }

  public get blocks(): Ref<FlowBlock[]> {
    return this._blocks;
  }

  public get connections(): Ref<FlowConnection[]> {
    return this._connections;
  }

  public get viewSize(): Ref<{ width: number; height: number }> {
    return this._viewSize;
  }

  public get dragBlock(): Ref<FlowBlock | undefined> {
    return this._dragBlock;
  }

  public get dragBlockOriginalPosition(): Ref<Offset> {
    return this._dragBlockOriginalPosition;
  }

  public get dragBlockOffset(): Ref<Offset> {
    return this._dragBlockOffset;
  }

  public get drawingConnection(): Ref<FlowConnection | undefined> {
    return this._drawingConnection;
  }

  public get drawingConnectionEndConnector(): Ref<FlowBlockConnector | undefined> {
    return this._drawingConnectionEndConnector;
  }

  public get selectedBlock(): FlowBlock | undefined {
    return this._selectedBlock.value;
  }

  public set selectedBlock(node: FlowBlock | undefined) {
    // Clear any existing selections
    this.clearSelectedBlock();

    if (!node) {
      return;
    }

    node.selected = true;
    this._selectedBlock.value = node;
  }

  public get selectedConnection(): FlowConnection | undefined {
    return this._selectedConnection.value;
  }

  public set selectedConnection(connection: FlowConnection | undefined) {
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

  private clearSelectedConnection = (): void => {
    // Clear selected node
    this._selectedConnection.value = undefined;

    if (!this._connections) {
      return;
    }

    // Make sure all are deselected
    this._connections.value.forEach((c) => (c.selected = false));
  };

  private clearSelectedBlock = (): void => {
    // Clear selected node
    this._selectedBlock.value = undefined;

    if (!this._blocks) {
      return;
    }

    // Make sure all are deselected
    this._blocks.value.forEach((n) => (n.selected = false));
  };

  private getAllElements = (): FlowTaggedElement[] => {
    const elements: FlowTaggedElement[] = [...this._connections.value, ...this._blocks.value] as FlowTaggedElement[];
    return elements;
  };

  validateIds = (): boolean => {
    let valid = true;

    // Get all elements that require a unique id
    const elements = this.getAllElements();

    // Create a dictionary to key by id
    const keyed: { [id: string]: FlowTaggedElement } = {};

    // Iterate over elements
    elements.forEach((e) => {
      // Does the dictionary already contain the key
      if (e.id in keyed) {
        // Return false to indicate not valid
        valid = false;
        return;
      }

      keyed[e.id] = e;
    });

    // Return false if has duplicate id
    return valid;
  };

  moveBlockZOrder = (action: string): void => {
    if (!this.selectedBlock || !this._blocks || !this._blocks.value) {
      return;
    }

    this._zOrder.moveBlockZOrder(action, this.selectedBlock);
  };

  gridLines = computed((): Line[] => {
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

  dragBlockMove = (e: MouseEvent): void => {
    if (!this._dragBlock.value) return;
    this._dragBlock.value.location.x = e.offsetX - this._dragBlockOffset.value.x;
    this._dragBlock.value.location.y = e.offsetY - this._dragBlockOffset.value.y;
  };

  dragConnectionMove = (e: MouseEvent): void => {
    if (!flowDesigner.drawingConnection.value) return;

    // Get starting connector
    const startConnector = flowDesigner.drawingConnection.value.getStartConnector();

    // Is there an element at the mouse position (that is not the drawing connection)
    const hitElements = this.getHitElements(e);
    const hitConnectors = hitElements.filter(
      (flowElement) =>
        // Must be a block connector
        flowElement.type === FlowElementType.BlockConnector &&
        // Don't hit test connection being connected
        flowElement !== flowDesigner.drawingConnection.value &&
        // Don't hit test the starting connector
        flowElement != startConnector
    );

    // Set css extra if is hovering over valid connector (hit connector and connector is a compatible type)
    const connector = hitConnectors.length > 0 ? (hitConnectors[0] as FlowBlockConnector) : undefined;
    flowDesigner.drawingConnection.value.cssClasses = connector && this.canConnect(connector, startConnector) ? 'valid-end-point' : '';
    this._drawingConnectionEndConnector.value = connector;

    // Update end offset to mouse offset
    flowDesigner.drawingConnection.value.location = { x: e.offsetX, y: e.offsetY };
  };

  dragConnectionCreateConnection = (): void => {
    if (!this._drawingConnection.value || !this._drawingConnectionEndConnector.value) {
      return;
    }

    const startBlock = this._drawingConnection.value.startBlock;
    const startBlockId = this._drawingConnection.value?.startBlockConnectorId;
    const endBlock = this._drawingConnectionEndConnector.value?.parent! as FlowBlock;
    const endBlockId = this._drawingConnectionEndConnector.value.id;

    const connection = new FlowConnection(uuidv4(), 'Connection', '', startBlock, startBlockId, endBlock, endBlockId);
    this._connections.value.push(connection);
  };

  canConnect = (from: FlowBlockConnector, to: FlowBlockConnector): boolean => {
    // Connection must be between connectors is opposite direction
    if (from.io.signalDirection === to.io.signalDirection) {
      return false;
    }

    // Connectors must have logic type match (eg, analogue / digital compatibility)
    if (from.io.signalType != to.io.signalType) {
      return false;
    }

    // Connectors cannot already be connected
    if (this.isConnectorConnected(from) || this.isConnectorConnected(from)) {
      return false;
    }

    return true;
  };

  isConnectorConnected = (connector: FlowBlockConnector): boolean => {
    let isConnected = false;
    this._connections.value.forEach((c) => {
      if (c.getStartConnector() === connector || c.getEndConnector() === connector) {
        isConnected = true;
        return;
      }
    });

    return isConnected;
  };

  getHitElements = (e: MouseEvent): FlowElement[] => {
    const hitElements = [] as FlowElement[];
    const offset = { x: e.offsetX, y: e.offsetY } as Offset;

    this._blocks.value.forEach((block) => {
      const hitElement = block.getHitElement(offset);

      if (hitElement) {
        hitElements.push(hitElement);
      }
    });

    this._connections.value.forEach((c) => {
      const hitElement = c.getHitElement(offset);

      if (hitElement) {
        hitElements.push(hitElement);
      }
    });

    return hitElements;
  };

  // Whenever mouse is clicked anywhere in the designer
  // allows clearing any currently selected node when clicking
  // on designer background (ie not on a node)
  mouseDown = (e: MouseEvent): void => {
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

  mouseUp = (e: MouseEvent): void => {
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

  mouseMove = (e: MouseEvent): void => {
    // Is there a connection being drawn
    if (this.drawingConnection.value) {
      this.dragConnectionMove(e);
      return;
    }
    this.dragBlockMove(e);
  };

  mouseLeave = (_: MouseEvent): void => {
    this.dragBlock.value = undefined;
    this.drawingConnection.value = undefined;
  };

  keyPress = (_e: KeyboardEvent): void => {
    // console.log('keyPress', _e);
  };

  keyDown = (_e: KeyboardEvent): void => {
    // console.log('keyDown', _e);
  };

  keyUp = (e: KeyboardEvent): void => {
    if (e.key === 'Delete') {
      if (this._selectedBlock.value) {
        this.deleteSelectedBlock();
      } else if (this._selectedConnection.value) {
        this.deleteSelectedConnection();
      }
    }
  };

  deleteSelectedBlock = (): void => {
    // Can only delete the selected node if a node is actually selected
    if (!this._selectedBlock.value) {
      return;
    }

    // Delete selected node
    this.deleteBlock(this._selectedBlock.value);

    // Clear any selections
    this.clearSelectedItems();
  };

  deleteSelectedConnection = (): void => {
    // Can only delete the selected connection if a connection is actually selected
    if (!this._selectedConnection.value) {
      return;
    }

    // Delete selected connection
    this.deleteConnection(this._selectedConnection.value);

    // Clear any selections
    this.clearSelectedItems();
  };

  private deleteBlock = (block: FlowBlock): void => {
    // We must also delete any connections that connect to the node
    const connections = this._connections.value.filter((c) => c.startBlock.id === block.id || c.endBlock?.id === block.id);
    connections.forEach((c) => this.deleteConnection(c));

    // Filter nodes to the set without the node
    this._blocks.value = this._blocks.value.filter((c) => c.id != block.id);
  };

  private deleteConnection = (connection: FlowConnection): void => {
    // Filter connections to the set without the connection
    this._connections.value = this._connections.value.filter((c) => c.id != connection.id);
  };
}

// The singleton flow designer instance
let flowDesigner: FlowDesigner;

// Initialise the designer
export const initFlowDesignController = (
  blocks: Ref<FlowBlock[]>,
  connections: Ref<FlowConnection[]>,
  screenSize: Ref<{ width: number; height: number }>,
  gridSize: Ref<number>
): FlowDesigner => {
  flowDesigner = new FlowDesigner(blocks, connections, screenSize, gridSize);

  // Mouse events
  configureFlowMouseEvents(flowDesigner);

  // Return flow designer instance
  return flowDesigner;
};

// Use the controller methods and values
export const useFlowDesignController = (): FlowDesigner => {
  return flowDesigner;
};
