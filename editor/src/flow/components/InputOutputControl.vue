<template>
  <rect
    :class="`input-output`"
    :x="inputOutput.location.x"
    :y="inputOutput.location.y"
    :rx="`${cornerRadius}px`"
    :ry="`${cornerRadius}px`"
    :width="inputOutput.size.width"
    :height="inputOutput.size.height"
    :fill="fillColor"
    :stroke="strokeColor"
    :stroke-width="strokeWidth"
    @mousemove="(e) => emit(BLOCK_IO_MOUSE_MOVE, e)"
    @mouseover="(e) => emit(BLOCK_IO_MOUSE_OVER, e)"
    @mouseenter="(e) => emit(BLOCK_IO_MOUSE_ENTER, e)"
    @mouseleave="(e) => emit(BLOCK_IO_MOUSE_LEAVE, e)"
    @mousedown="(e) => emit(BLOCK_IO_MOUSE_DOWN, e)"
    @mouseup="(e) => emit(BLOCK_IO_MOUSE_UP, e)"
  >
    ></rect
  >
</template>

<script setup lang="ts">
import type { InputOutput } from '../types/InputOutput';
import { useEmitter, type FlowEvents } from '../utils/event-emitter';
import {
  BLOCK_IO_MOUSE_MOVE,
  BLOCK_IO_MOUSE_OVER,
  BLOCK_IO_MOUSE_ENTER,
  BLOCK_IO_MOUSE_LEAVE,
  BLOCK_IO_MOUSE_DOWN,
  BLOCK_IO_MOUSE_UP
} from '../constants';
import type { BlockElement } from '../types/ui/BlockElement';

interface Props {
  block: BlockElement;
  inputOutput: InputOutput;
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
    inputOutput: props.inputOutput,
    data: props.block,
    mouseEvent: e
  });
  e.preventDefault();
  return false;
};
</script>

<style>
rect.input-output {
  cursor: crosshair;
}
</style>
