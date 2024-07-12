<template>
  <!-- Spline path -->
  <g
    v-if="show"
    :class="`flow-connection ${connecting ? 'connecting' : ''} ${connecting.cssClasses}`"
  >
    <path
      class="`line connecting"
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
      zOrder="100"
    />

    <rect
      class="connection-start"
      :x="startOffset.x - BLOCK_IO_SIZE"
      :y="startOffset.y - BLOCK_IO_SIZE / 2"
      rx="2"
      ry="2"
      :width="BLOCK_IO_SIZE"
      :height="BLOCK_IO_SIZE"
    ></rect>

    <rect
      class="connection-end"
      :x="endOffset.x - BLOCK_IO_SIZE / 2"
      :y="endOffset.y - BLOCK_IO_SIZE / 2"
      rx="2"
      ry="2"
      :width="BLOCK_IO_SIZE"
      :height="BLOCK_IO_SIZE"
    ></rect>
  </g>
</template>

<script setup lang="ts">
import { type Offset } from '../types/Offset';
import { generateCubicBezierPoints } from '../utils/cubic-spline';
import { cubicBezierToSvg } from '../utils/svg';
import { computed } from 'vue';
import { useEmitter, type FlowConnectingMouseEvent, type FlowEvents } from '../utils/event-emitter';
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
import type { FlowConnecting } from '../types/FlowConnecting';

interface Props {
  show?: boolean;

  connecting: FlowConnecting;

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

const startInputOutput = computed(() => props.connecting.startBlock.io.find((io) => io.pin === props.connecting.startPin)!);

const startOffset = computed(() => {
  return {
    x: props.connecting.startBlock.location.x + startInputOutput.value.location.x + BLOCK_IO_SIZE,
    y: props.connecting.startBlock.location.y + startInputOutput.value.location.y + BLOCK_IO_SIZE / 2
  };
});

const endOffset = computed(() => props.connecting.endLocation);

const svg = computed(() => {
  const points = generateCubicBezierPoints(startOffset.value, endOffset.value, startInputOutput.value.side);
  return cubicBezierToSvg(points);
});

const emitter = useEmitter();
const emit = (event: keyof FlowEvents, e: MouseEvent): boolean => {
  emitter.emit(event, {
    data: props.connecting,
    mouseEvent: e
  } as FlowConnectingMouseEvent);
  e.preventDefault();
  return false;
};

const { theme } = useThemeStore();
</script>

<style scoped lang="scss">
.flow-connection {
  .line {
    fill: none;
    cursor: pointer;
  }

  &.connecting {
    .line {
      stroke-dasharray: 5;
    }

    .connection-start {
      fill: #008000;
    }

    .connection-end {
      fill: #ff0000;
    }

    &.valid-end-point {
      .line {
        &.connecting {
          stroke-dasharray: 0;
          stroke: #00ff37;
        }
      }
      .connection-end {
        fill: #008000;
      }
    }
  }
}
</style>
