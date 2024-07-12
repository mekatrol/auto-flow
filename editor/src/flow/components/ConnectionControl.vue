<template>
  <!-- Spline path -->
  <g
    v-if="show"
    :class="`flow-connection ${connecting ? 'connecting' : ''} ${connection.cssClasses}`"
  >
    <path
      :class="`line ${connecting ? 'connecting' : ''}`"
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
      v-if="connecting"
      class="connection-start"
      :x="startOffset.x - BLOCK_IO_SIZE / 2"
      :y="startOffset.y - BLOCK_IO_SIZE / 2"
      rx="2"
      ry="2"
      :width="BLOCK_IO_SIZE"
      :height="BLOCK_IO_SIZE"
    ></rect>

    <rect
      v-if="connecting"
      class="connection-end"
      :x="endOffset.x"
      :y="endOffset.y - BLOCK_IO_SIZE / 2"
      rx="2"
      ry="2"
      :width="BLOCK_IO_SIZE"
      :height="BLOCK_IO_SIZE"
    ></rect>
  </g>
</template>

<script setup lang="ts">
import { addOffsets } from '../utils/type-helper';
import { type Offset } from '../types/ui/Offset';
import { ConnectionElement } from '../types/ui/ConnectionElement';
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

const halfOffset: Offset = { x: BLOCK_IO_SIZE / 2, y: BLOCK_IO_SIZE / 2 };

const connecting = computed(() => !props.connection._endBlock);

const startInputOutput = computed(() => props.connection.startBlock.io.find((io) => io.pin === props.connection.startPin)!);

const startOffset = computed(() => addOffsets([props.connection.startBlock.location, startInputOutput.value.location, halfOffset]));

const endOffset = computed(() => props.connection.getEndOffset());

const svg = computed(() => {
  const points = generateCubicBezierPoints(startOffset.value, endOffset.value, startInputOutput.value.side);
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
