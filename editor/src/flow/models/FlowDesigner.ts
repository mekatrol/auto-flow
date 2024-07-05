import { type Ref, ref } from 'vue';
import type { FlowBlockConnector } from './FlowBlockConnector';
import type { FlowConnection } from './FlowConnection';
import { FlowElement } from './FlowElement';
import type { Size } from './Size';
import type { Offset } from './Offset';
import type { FlowBlockElement } from './FlowBlockElement';

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

  dragBlockMove = (e: MouseEvent): void => {
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
    // Clear selected block
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
