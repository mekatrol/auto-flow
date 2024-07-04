<template>
  <!-- Spline path -->
  <g v-if="show">
    <path
      :d="svg"
      fill="none"
      :stroke="lineColor"
      :stroke-width="lineStrokeWidth"
      @mousemove="(e) => emit(CONNECTION_MOUSE_MOVE, e)"
      @mouseover="(e) => emit(CONNECTION_MOUSE_OVER, e)"
      @mouseenter="(e) => emit(CONNECTION_MOUSE_ENTER, e)"
      @mouseleave="(e) => emit(CONNECTION_MOUSE_LEAVE, e)"
      @mousedown="(e) => emit(CONNECTION_MOUSE_DOWN, e)"
      @mouseup="(e) => emit(CONNECTION_MOUSE_UP, e)"
    />
  </g>
  <rect
    class="control-start"
    :x="connection.startBlock.location.x"
    :y="connection.startBlock.location.y - BLOCK_CONNECTOR_SIZE / 2"
    rx="2"
    ry="2"
    fill="currentColor"
    stroke="currentColor"
    :width="BLOCK_CONNECTOR_SIZE"
    :height="BLOCK_CONNECTOR_SIZE"
  ></rect>

  <rect
    v-if="connection.endBlock"
    class="control-end"
    :x="connection.endBlock.location.x"
    :y="connection.endBlock.location.y - BLOCK_CONNECTOR_SIZE / 2"
    rx="2"
    ry="2"
    fill="currentColor"
    stroke="currentColor"
    :width="BLOCK_CONNECTOR_SIZE"
    :height="BLOCK_CONNECTOR_SIZE"
  ></rect>
</template>

<script setup lang="ts">
import { addOffsets, FlowConnection, type Offset } from '../models/types';
import { BlockSide } from '../models/enums';
import { generateCubicBezierPoints } from '../utils/cubic-spline';
import { cubicBezierToSvg } from '../utils/svg';
import { computed } from 'vue';
import { useEmitter, type FlowConnectionMouseEvent, type FlowEvents } from '../utils/event-emitter';
import {
  CONNECTION_MOUSE_MOVE,
  CONNECTION_MOUSE_OVER,
  CONNECTION_MOUSE_ENTER,
  CONNECTION_MOUSE_LEAVE,
  CONNECTION_MOUSE_DOWN,
  CONNECTION_MOUSE_UP,
  BLOCK_CONNECTOR_SIZE
} from '../models/constants';

interface Props {
  show?: boolean;

  connection: FlowConnection;

  showPoints?: boolean;

  lineColor?: string;
  lineStrokeWidth?: number | string;

  startPointColor?: string;
  startPointRadius?: number | string;

  endPointColor?: string;
  endPointRadius?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  show: true,
  showPoints: false,
  lineColor: '#ccc',
  lineStrokeWidth: 2,
  endPointColor: 'red',
  startPointRadius: 5,
  startPointColor: 'green',
  endPointRadius: 5
});

const svg = computed(() => {
  if (!props.connection.endBlock) {
    return '';
  }

  const startConnector = props.connection.startBlock.block.connectors.find((c) => c.id === props.connection.startBlockConnectorId)!;
  const endConnector = props.connection.endBlock.block.connectors.find((c) => c.id === props.connection.endBlockConnectorId)!;

  const halfOffset: Offset = { x: BLOCK_CONNECTOR_SIZE / 2, y: BLOCK_CONNECTOR_SIZE / 2 };

  const points = generateCubicBezierPoints(
    addOffsets([props.connection.startBlock.location, startConnector.location, halfOffset]),
    addOffsets([props.connection.endBlock.location, endConnector.location, halfOffset]),
    BlockSide.Right
  );
  return cubicBezierToSvg(points);
});

const emitter = useEmitter();
const emit = (event: keyof FlowEvents, e: MouseEvent): boolean => {
  emitter.emit(event, {
    data: props.connection,
    mouseEvent: e
  } as FlowConnectionMouseEvent);
  e.preventDefault();
  return false;
};
</script>
