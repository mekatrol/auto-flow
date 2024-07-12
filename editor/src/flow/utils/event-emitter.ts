import mitt, { type Emitter } from 'mitt';
import { type FlowDesigner } from '../types/FlowDesigner';
import { v4 as uuidv4 } from 'uuid';
import {
  BLOCK_IO_MOUSE_DOWN,
  BLOCK_IO_MOUSE_ENTER,
  BLOCK_IO_MOUSE_LEAVE,
  BLOCK_IO_MOUSE_MOVE,
  BLOCK_IO_MOUSE_OVER,
  BLOCK_IO_MOUSE_UP,
  BLOCK_MOUSE_DOWN,
  BLOCK_MOUSE_ENTER,
  BLOCK_MOUSE_LEAVE,
  BLOCK_MOUSE_MOVE,
  BLOCK_MOUSE_OVER,
  BLOCK_MOUSE_UP,
  CONNECTING_MOUSE_DOWN,
  CONNECTING_MOUSE_ENTER,
  CONNECTING_MOUSE_LEAVE,
  CONNECTING_MOUSE_MOVE,
  CONNECTING_MOUSE_OVER,
  CONNECTING_MOUSE_UP,
  CONNECTION_MOUSE_DOWN,
  CONNECTION_MOUSE_ENTER,
  CONNECTION_MOUSE_LEAVE,
  CONNECTION_MOUSE_MOVE,
  CONNECTION_MOUSE_OVER,
  CONNECTION_MOUSE_UP
} from '../constants';
import type { FlowConnection } from '../types/FlowConnection';
import type { InputOutput } from '../types/InputOutput';
import type { FlowBlockElement } from '../types/FlowBlockElement';
import type { FlowConnecting } from '../types/FlowConnecting';

export interface FlowMouseEvent<T> {
  data: T;
  mouseEvent: MouseEvent;
}

// An event from a flow block
export interface FlowBlockMouseEvent extends FlowMouseEvent<FlowBlockElement> {}

// A mouse event from a flow block io (includes the block that the io is attached to)
export interface FlowBlockConnectorMouseEvent extends FlowBlockMouseEvent {
  inputOutput: InputOutput;
}

// A mouse event from a flow connection
export interface FlowConnectionMouseEvent extends FlowMouseEvent<FlowConnection> {}

// A mouse event from a flow connecting
export interface FlowConnectingMouseEvent extends FlowMouseEvent<FlowConnecting> {}

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
   * Block input/output mouse events
   */
  blockIOMouseMove: FlowBlockConnectorMouseEvent;
  blockIOMouseOver: FlowBlockConnectorMouseEvent;
  blockIOMouseEnter: FlowBlockConnectorMouseEvent;
  blockIOMouseLeave: FlowBlockConnectorMouseEvent;
  blockIOMouseDown: FlowBlockConnectorMouseEvent;
  blockIOMouseUp: FlowBlockConnectorMouseEvent;

  /*
   * Connecting mouse events
   */
  connectingMouseMove: FlowConnectingMouseEvent;
  connectingMouseOver: FlowConnectingMouseEvent;
  connectingMouseEnter: FlowConnectingMouseEvent;
  connectingMouseLeave: FlowConnectingMouseEvent;
  connectingMouseDown: FlowConnectingMouseEvent;
  connectingMouseUp: FlowConnectingMouseEvent;

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
    flowDesigner.dragBlock.value.z = flowDesigner.dragBlock.value.zOrder;
    flowDesigner.dragBlockOffset.value = { x: e.mouseEvent.offsetX - e.data.location.x, y: e.mouseEvent.offsetY - e.data.location.y };
    flowDesigner.dragBlockOriginalPosition.value = { x: e.data.location.x, y: e.data.location.y };
  });

  emitter.on(BLOCK_MOUSE_UP, (_e: FlowBlockMouseEvent) => {
    // Restore drag block boost if a block is being dragged
    if (flowDesigner.dragBlock.value) {
      flowDesigner.dragBlock.value.zBoost = 0;
      flowDesigner.dragBlock.value.z = flowDesigner.dragBlock.value.zOrder;
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

  emitter.on(BLOCK_IO_MOUSE_MOVE, (_e) => {
    // console.log(`BLOCK_IO_MOUSE_MOVE: ${e.data.id}`, e);
  });

  emitter.on(BLOCK_IO_MOUSE_OVER, (_e) => {
    // console.log(`BLOCK_IO_MOUSE_OVER: ${e.data.id}`, e);
  });

  emitter.on(BLOCK_IO_MOUSE_ENTER, (_e) => {
    // console.log(`BLOCK_IO_MOUSE_ENTER: ${e.data.id}`, e);
  });

  emitter.on(BLOCK_IO_MOUSE_LEAVE, (_e) => {
    // console.log(`BLOCK_IO_MOUSE_LEAVE: ${e.data.id}`, e);
  });

  emitter.on(BLOCK_IO_MOUSE_UP, (_e) => {
    flowDesigner.drawingConnection.value = undefined;
  });

  emitter.on(BLOCK_IO_MOUSE_DOWN, (e) => {
    flowDesigner.clearSelectedItems();

    const connecting = {
      startBlock: e.data as FlowBlockElement,
      startPin: e.inputOutput.pin,
      endLocation: { x: e.mouseEvent.offsetX, y: e.mouseEvent.offsetY },
      cssClasses: ''
    } as FlowConnecting;

    flowDesigner.drawingConnection.value = connecting;
  });

  emitter.on(CONNECTING_MOUSE_MOVE, (_e) => {
    // console.log(`CONNECTING_MOUSE_MOVE: ${_e.data.id}`, _e);
  });

  emitter.on(CONNECTING_MOUSE_OVER, (_e) => {
    // console.log(`CONNECTING_MOUSE_OVER: ${_e.data.id}`, _e);
  });

  emitter.on(CONNECTING_MOUSE_ENTER, (_e) => {
    // console.log(`CONNECTING_MOUSE_ENTER: ${_e.data.id}`, _e);
  });

  emitter.on(CONNECTING_MOUSE_LEAVE, (_e) => {
    // console.log(`CONNECTING_MOUSE_LEAVE: ${_e.data.id}`, _e);
  });

  emitter.on(CONNECTING_MOUSE_UP, (_e) => {
    // console.log(`CONNECTING_MOUSE_UP: ${_e.data.id}`, _e);
  });

  emitter.on(CONNECTING_MOUSE_DOWN, (e) => {
    // console.log(`CONNECTING_MOUSE_DOWN: ${_e.data.id}`, _e);
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
    // console.log(`CONNECTION_MOUSE_UP: ${_e.data.id}`, _e);
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
