import { computed, type Ref, ref } from 'vue';
import { UIBlockConnectorElement } from './UIBlockConnectorElement';
import { UIConnectionElement } from './UIConnectionElement';
import { UIElement } from './UIElement';
import type { Offset } from './Offset';
import { UIBlockElement } from './UIBlockElement';
import { ZOrder } from './ZOrder';
import type { Line } from './Line';
import type { UILabelledElement } from './UILabelledElement';
import { configureFlowMouseEvents } from '../utils/event-emitter';
import { UIElementType } from './UIElementType';

export class FlowDesigner {
  private _viewSize: Ref<{ width: number; height: number }>;
  private _blocks: Ref<UIBlockElement[]>;
  private _connections: Ref<UIConnectionElement[]>;
  private _zOrder: ZOrder;
  private _gridSize: Ref<number>;
  private _drawingConnection = ref<UIConnectionElement | undefined>(undefined);
  private _drawingConnectionEndConnector = ref<UIBlockConnectorElement | undefined>(undefined);
  private _selectedConnection = ref<UIConnectionElement | undefined>(undefined);
  private _selectedBlock = ref<UIBlockElement | undefined>(undefined);
  private _dragBlock = ref<UIBlockElement | undefined>(undefined);
  private _dragBlockOffset = ref<Offset>({ x: 0, y: 0 });
  private _dragBlockOriginalPosition = ref<Offset>({ x: 0, y: 0 });

  constructor(viewSize: Ref<{ width: number; height: number }>, gridSize: Ref<number>) {
    this._blocks = ref([]);
    this._connections = ref([]);
    this._viewSize = viewSize;
    this._gridSize = gridSize;
    this._zOrder = new ZOrder(this._blocks);
  }

  public update(_element: UIElement) {}

  public get blocks(): Ref<UIBlockElement[]> {
    return this._blocks;
  }

  public get connections(): Ref<UIConnectionElement[]> {
    return this._connections;
  }

  public get viewSize(): Ref<{ width: number; height: number }> {
    return this._viewSize;
  }

  public get dragBlock(): Ref<UIBlockElement | undefined> {
    return this._dragBlock;
  }

  public get dragBlockOriginalPosition(): Ref<Offset> {
    return this._dragBlockOriginalPosition;
  }

  public get dragBlockOffset(): Ref<Offset> {
    return this._dragBlockOffset;
  }

  public get drawingConnection(): Ref<UIConnectionElement | undefined> {
    return this._drawingConnection;
  }

  public get drawingConnectionEndConnector(): Ref<UIBlockConnectorElement | undefined> {
    return this._drawingConnectionEndConnector;
  }

  public get selectedBlock(): UIBlockElement | undefined {
    return this._selectedBlock.value;
  }

  public set selectedBlock(node: UIBlockElement | undefined) {
    // Clear any existing selections
    this.clearSelectedBlock();

    if (!node) {
      return;
    }

    node.selected = true;
    this._selectedBlock.value = node;
  }

  public get selectedConnection(): UIConnectionElement | undefined {
    return this._selectedConnection.value;
  }

  public set selectedConnection(connection: UIConnectionElement | undefined) {
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

  public getAllElements = (): UILabelledElement[] => {
    const elements: UILabelledElement[] = [...this._connections.value, ...this._blocks.value] as UILabelledElement[];
    return elements;
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

    // Get starting connector
    const startConnector = flowDesigner.drawingConnection.value.getStartConnector();

    // Is there an element at the mouse position (that is not the drawing connection)
    const hitElements = this.getHitElements(e);
    const hitConnectors = hitElements.filter(
      (flowElement) =>
        // Must be a block connector
        flowElement.type === UIElementType.BlockConnector &&
        // Don't hit test connection being connected
        flowElement !== flowDesigner.drawingConnection.value &&
        // Don't hit test the starting connector
        flowElement != startConnector
    );

    // Set css extra if is hovering over valid connector (hit connector and connector is a compatible type)
    const connector = hitConnectors.length > 0 ? (hitConnectors[0] as UIBlockConnectorElement) : undefined;
    flowDesigner.drawingConnection.value.cssClasses = connector && this.canConnect(connector, startConnector) ? 'valid-end-point' : '';
    this._drawingConnectionEndConnector.value = connector;

    // Update end offset to mouse offset
    flowDesigner.drawingConnection.value.location = { x: e.offsetX, y: e.offsetY };
  };

  public dragConnectionCreateConnection = (): void => {
    if (!this._drawingConnection.value || !this._drawingConnectionEndConnector.value) {
      return;
    }

    const startBlock = this._drawingConnection.value.startBlock;
    const startBlockId = this._drawingConnection.value?.startBlockConnectorId;
    const endBlock = this._drawingConnectionEndConnector.value?.parent! as UIBlockElement;
    const endBlockId = this._drawingConnectionEndConnector.value.connector.id;

    const connection = new UIConnectionElement('Connection', '', startBlock, startBlockId, endBlock, endBlockId);
    this._connections.value.push(connection);
  };

  public canConnect = (from: UIBlockConnectorElement, to: UIBlockConnectorElement): boolean => {
    // Connection must be between connectors is opposite direction
    if (from.connector.io.signalDirection === to.connector.io.signalDirection) {
      return false;
    }

    // Connectors must have logic type match (eg, analogue / digital compatibility)
    if (from.connector.io.signalType != to.connector.io.signalType) {
      return false;
    }

    // Connectors cannot already be connected
    if (this.isConnectorConnected(from) || this.isConnectorConnected(from)) {
      return false;
    }

    return true;
  };

  public isConnectorConnected = (connector: UIBlockConnectorElement): boolean => {
    let isConnected = false;
    this._connections.value.forEach((c) => {
      if (c.getStartConnector() === connector || c.getEndConnector() === connector) {
        isConnected = true;
        return;
      }
    });

    return isConnected;
  };

  public getHitElements = (e: MouseEvent): UIElement[] => {
    const hitElements = [] as UIElement[];
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

  public deleteBlock = (block: UIBlockElement): void => {
    // We must also delete any connections that connect to the node
    const connections = this._connections.value.filter((c) => c.startBlock === block || c.endBlock === block);
    connections.forEach((c) => this.deleteConnection(c));

    // Filter nodes to the set without the node
    this._blocks.value = this._blocks.value.filter((b) => b != block);
  };

  public deleteConnection = (connection: UIConnectionElement): void => {
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
