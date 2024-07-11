<template>
  <!-- Spline path -->
  <g v-if="show">
    <path
      :d="svg"
      :fill="theme.connectionStyles.fill"
      :fill-opacity="theme.connectionStyles.fillOpacity"
      :stroke="theme.connectionStyles.stroke"
      :stroke-width="theme.connectionStyles.strokeWidth"
      @mousemove="(e) => emit(CONNECTION_MOUSE_MOVE, e)"
      @mouseover="(e) => emit(CONNECTION_MOUSE_OVER, e)"
      @mouseenter="(e) => emit(CONNECTION_MOUSE_ENTER, e)"
      @mouseleave="(e) => emit(CONNECTION_MOUSE_LEAVE, e)"
      @mousedown="(e) => emit(CONNECTION_MOUSE_DOWN, e)"
      @mouseup="(e) => emit(CONNECTION_MOUSE_UP, e)"
    />
  </g>
</template>

<script setup lang="ts">
import { addOffsets } from '../utils/type-helper';
import { type Offset } from '../types/ui/Offset';
import { ConnectionElement } from '../types/ui/ConnectionElement';
import { BlockSide } from '../types/ui/BlockSide';
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
  BLOCK_IO_SIZE
} from '../constants';
import { useThemeStore } from '../stores/themeStore';

interface Props {
  show?: boolean;

  connection: ConnectionElement;

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
  startPointColor: '#fff',
  endPointRadius: 5
});

const svg = computed(() => {
  const startConnector = props.connection.startBlock.io.find((c) => c.io.id === props.connection.startBlockInputOutputId)!;

  const halfOffset: Offset = { x: BLOCK_IO_SIZE / 2, y: BLOCK_IO_SIZE / 2 };

  let endOffset: Offset = { x: 0, y: 0 };
  if (!props.connection.endBlock) {
    endOffset = props.connection.getEndOffset()!;
  } else {
    const endConnector = props.connection.endBlock.io.find((c) => c.io.id === props.connection.endBlockInputOutputId);
    endOffset = addOffsets([props.connection.endBlock.location, endConnector!.location, halfOffset]);
  }

  const points = generateCubicBezierPoints(
    addOffsets([props.connection.startBlock.location, startConnector.location, halfOffset]),
    endOffset,
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

const { theme } = useThemeStore();
</script>
