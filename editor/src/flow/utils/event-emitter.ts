import mitt, { type Emitter } from 'mitt';
import { type FlowBlock } from '../types/FlowBlock';
import { type FlowDesigner } from '../types/FlowDesigner';
import { type FlowBlockConnector } from '../types/FlowBlockConnector';
import { FlowConnection } from '../types/FlowConnection';
import {
  BLOCK_CONNECTOR_MOUSE_DOWN,
  BLOCK_CONNECTOR_MOUSE_ENTER,
  BLOCK_CONNECTOR_MOUSE_LEAVE,
  BLOCK_CONNECTOR_MOUSE_MOVE,
  BLOCK_CONNECTOR_MOUSE_OVER,
  BLOCK_CONNECTOR_MOUSE_UP,
  BLOCK_MOUSE_DOWN,
  BLOCK_MOUSE_ENTER,
  BLOCK_MOUSE_LEAVE,
  BLOCK_MOUSE_MOVE,
  BLOCK_MOUSE_OVER,
  BLOCK_MOUSE_UP,
  CONNECTION_MOUSE_DOWN,
  CONNECTION_MOUSE_ENTER,
  CONNECTION_MOUSE_LEAVE,
  CONNECTION_MOUSE_MOVE,
  CONNECTION_MOUSE_OVER,
  CONNECTION_MOUSE_UP
} from '../constants';

export interface FlowMouseEvent<T> {
  data: T;
  mouseEvent: MouseEvent;
}

// An event from a flow block
export interface FlowBlockMouseEvent extends FlowMouseEvent<FlowBlock> {}

// A mouse event from a flow block connector (includes the block that the connector is attached to)
export interface FlowNodeConnectorMouseEvent extends FlowBlockMouseEvent {
  connector: FlowBlockConnector;
}

// A mouse event from a flow connection
export interface FlowConnectionMouseEvent extends FlowMouseEvent<FlowConnection> {}

export type FlowEvents = {
  /*
   * Block mouse events
   */
  blockMouseMove: FlowBlockMouseEvent;
  blockMouseOver: FlowBlockMouseEvent;
  blockMouseEnter: FlowBlockMouseEvent;
  blockMouseLeave: FlowBlockMouseEvent;
  blockMouseDown: FlowBlockMouseEvent;
  blockMouseUp: FlowBlockMouseEvent;

  /*
   * Block connector mouse events
   */
  blockConnectorMouseMove: FlowNodeConnectorMouseEvent;
  blockConnectorMouseOver: FlowNodeConnectorMouseEvent;
  blockConnectorMouseEnter: FlowNodeConnectorMouseEvent;
  blockConnectorMouseLeave: FlowNodeConnectorMouseEvent;
  blockConnectorMouseDown: FlowNodeConnectorMouseEvent;
  blockConnectorMouseUp: FlowNodeConnectorMouseEvent;

  /*
   * Connection mouse events
   */
  connectionMouseMove: FlowConnectionMouseEvent;
  connectionMouseOver: FlowConnectionMouseEvent;
  connectionMouseEnter: FlowConnectionMouseEvent;
  connectionMouseLeave: FlowConnectionMouseEvent;
  connectionMouseDown: FlowConnectionMouseEvent;
  connectionMouseUp: FlowConnectionMouseEvent;
};

// We want a single instance for all use (singleton pattern)
const emitter: Emitter<FlowEvents> = mitt<FlowEvents>();

export const configureFlowMouseEvents = (flowDesigner: FlowDesigner): void => {
  const emitter = useEmitter();

  emitter.on(BLOCK_MOUSE_ENTER, (_e: FlowBlockMouseEvent) => {
    // console.log(`block mouse enter: ${e.data.id}`, e);
  });

  emitter.on(BLOCK_MOUSE_LEAVE, (_e: FlowBlockMouseEvent) => {
    // console.log(`block mouse leave: ${e.data.id}`, e);
  });

  emitter.on(BLOCK_MOUSE_DOWN, (e: FlowBlockMouseEvent) => {
    flowDesigner.clearSelectedItems();
    flowDesigner.selectedBlock = e.data;
    flowDesigner.dragBlock.value = e.data;
    flowDesigner.dragBlock.value.zBoost = 0;
    flowDesigner.dragBlockOffset.value = { x: e.mouseEvent.offsetX - e.data.location.x, y: e.mouseEvent.offsetY - e.data.location.y };
    flowDesigner.dragBlockOriginalPosition.value = { x: e.data.location.x, y: e.data.location.y };
  });

  emitter.on(BLOCK_MOUSE_UP, (_e: FlowBlockMouseEvent) => {
    // Restore drag block boost if a block is being dragged
    if (flowDesigner.dragBlock.value) {
      flowDesigner.dragBlock.value.zBoost = 0;
    }

    // Clear drag block
    flowDesigner.dragBlock.value = undefined;

    // Clear drawing connection
    flowDesigner.drawingConnection.value = undefined;
  });

  emitter.on(BLOCK_MOUSE_MOVE, (e: FlowBlockMouseEvent) => {
    flowDesigner.dragBlockMove(e.mouseEvent);
  });

  emitter.on(BLOCK_MOUSE_OVER, (_e) => {});

  emitter.on(BLOCK_CONNECTOR_MOUSE_MOVE, (_e) => {
    // console.log(`BLOCK_CONNECTOR_MOUSE_MOVE: ${e.data.id}`, e);
  });

  emitter.on(BLOCK_CONNECTOR_MOUSE_OVER, (_e) => {
    // console.log(`BLOCK_CONNECTOR_MOUSE_OVER: ${e.data.id}`, e);
  });

  emitter.on(BLOCK_CONNECTOR_MOUSE_ENTER, (_e) => {
    // console.log(`BLOCK_CONNECTOR_MOUSE_ENTER: ${e.data.id}`, e);
  });

  emitter.on(BLOCK_CONNECTOR_MOUSE_LEAVE, (_e) => {
    // console.log(`BLOCK_CONNECTOR_MOUSE_LEAVE: ${e.data.id}`, e);
  });

  emitter.on(BLOCK_CONNECTOR_MOUSE_UP, (_e) => {
    flowDesigner.drawingConnection.value = undefined;
  });

  emitter.on(BLOCK_CONNECTOR_MOUSE_DOWN, (e) => {
    flowDesigner.clearSelectedItems();
    // flowDesigner.drawingConnection.value = new FlowConnection(
    //   uuidv4(),
    //   'connecting',
    //   '',
    //   e.data,
    //   e.connector.id,
    //   e.mouseEvent.offsetX,
    //   e.mouseEvent.offsetY
    // );
  });

  emitter.on(CONNECTION_MOUSE_MOVE, (_e) => {
    // console.log(`CONNECTION_MOUSE_MOVE: ${_e.data.id}`, _e);
  });

  emitter.on(CONNECTION_MOUSE_OVER, (_e) => {
    // console.log(`CONNECTION_MOUSE_OVER: ${_e.data.id}`, _e);
  });

  emitter.on(CONNECTION_MOUSE_ENTER, (_e) => {
    // console.log(`CONNECTION_MOUSE_ENTER: ${_e.data.id}`, _e);
  });

  emitter.on(CONNECTION_MOUSE_LEAVE, (_e) => {
    // console.log(`CONNECTION_MOUSE_LEAVE: ${_e.data.id}`, _e);
  });

  emitter.on(CONNECTION_MOUSE_UP, (_e) => {
    // console.log(`BLOCK_CONNECTOR_MOUSE_UP: ${_e.data.id}`, _e);
  });

  emitter.on(CONNECTION_MOUSE_DOWN, (e) => {
    flowDesigner.clearSelectedItems();
    flowDesigner.drawingConnection.value = undefined;
    flowDesigner.selectedConnection = e.data;
  });
};

export const useEmitter = (): Emitter<FlowEvents> => {
  return emitter;
};
