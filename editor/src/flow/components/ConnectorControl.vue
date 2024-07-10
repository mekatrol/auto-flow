<template>
  <rect
    :class="`connector`"
    :x="connector.location.x"
    :y="connector.location.y"
    :rx="`${cornerRadius}px`"
    :ry="`${cornerRadius}px`"
    :width="connector.size.width"
    :height="connector.size.height"
    :fill="fillColor"
    :stroke="strokeColor"
    :stroke-width="strokeWidth"
    @mousemove="(e) => emit(BLOCK_CONNECTOR_MOUSE_MOVE, e)"
    @mouseover="(e) => emit(BLOCK_CONNECTOR_MOUSE_OVER, e)"
    @mouseenter="(e) => emit(BLOCK_CONNECTOR_MOUSE_ENTER, e)"
    @mouseleave="(e) => emit(BLOCK_CONNECTOR_MOUSE_LEAVE, e)"
    @mousedown="(e) => emit(BLOCK_CONNECTOR_MOUSE_DOWN, e)"
    @mouseup="(e) => emit(BLOCK_CONNECTOR_MOUSE_UP, e)"
  >
    ></rect
  >
</template>

<script setup lang="ts">
import type { UIBlockElement } from '../types/ui/UIBlockElement';
import type { UIBlockConnectorElement } from '../types/ui/UIBlockConnectorElement';
import { useEmitter, type FlowEvents } from '../utils/event-emitter';
import {
  BLOCK_CONNECTOR_MOUSE_MOVE,
  BLOCK_CONNECTOR_MOUSE_OVER,
  BLOCK_CONNECTOR_MOUSE_ENTER,
  BLOCK_CONNECTOR_MOUSE_LEAVE,
  BLOCK_CONNECTOR_MOUSE_DOWN,
  BLOCK_CONNECTOR_MOUSE_UP
} from '../constants';

interface Props {
  block: UIBlockElement;
  connector: UIBlockConnectorElement;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: string;
}
const cornerRadius = 2;

const props = withDefaults(defineProps<Props>(), {
  // Default colors to current color
  fillColor: 'currentColor',
  strokeColor: 'currentColor',
  strokeWidth: '2px'
});

const emitter = useEmitter();

const emit = (event: keyof FlowEvents, e: MouseEvent): boolean => {
  emitter.emit(event, {
    connector: props.connector,
    data: props.block,
    mouseEvent: e
  });
  e.preventDefault();
  return false;
};
</script>

<style>
rect.connector {
  cursor: crosshair;
}
</style>
