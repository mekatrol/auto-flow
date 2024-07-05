<template>
  <rect
    :class="`connector`"
    :x="block.location.x + connector.location.x"
    :y="block.location.y + connector.location.y"
    :rx="`${cornerRadius}px`"
    :ry="`${cornerRadius}px`"
    :width="connector.size.width"
    :height="connector.size.height"
    :fill="fillColor"
    :stroke="strokeColor"
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
import type { FlowBlockElement } from '../types/FlowBlockElement';
import type { FlowBlockConnector } from '../types/FlowBlockConnector';
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
  block: FlowBlockElement;
  connector: FlowBlockConnector;
  fillColor?: string;
  strokeColor?: string;
}
const cornerRadius = 2;

const props = withDefaults(defineProps<Props>(), {
  // Default colors to current color
  fillColor: 'currentColor',
  strokeColor: 'currentColor'
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
