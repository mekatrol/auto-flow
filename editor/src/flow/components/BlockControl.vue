<template>
  <g
    v-if="block"
    :transform="`translate(${block.location.x},${block.location.y})`"
    :class="block.draggingAsNew ? 'dragging-new' : ''"
  >
    <rect
      :class="`flow-block ${block.draggingAsNew ? 'dragging-new' : ''}`"
      :x="0"
      :y="0"
      :width="block.size.width"
      :height="block.size.height"
      :rx="`${theme.blockStyles.radius}px`"
      :ry="`${theme.blockStyles.radius}px`"
      :fill="blockStyles.fill"
      :fill-opacity="blockStyles.opacity"
      :stroke="blockStyles.stroke"
      :stroke-width="theme.blockStyles.strokeWidth"
      @mousemove="(e) => emit(BLOCK_MOUSE_MOVE, e)"
      @mouseover="(e) => emit(BLOCK_MOUSE_OVER, e)"
      @mouseenter="(e) => emit(BLOCK_MOUSE_ENTER, e)"
      @mouseleave="(e) => emit(BLOCK_MOUSE_LEAVE, e)"
      @mousedown="(e) => emit(BLOCK_MOUSE_DOWN, e)"
      @mouseup="(e) => emit(BLOCK_MOUSE_UP, e)"
    ></rect>

    <!-- Block icon -->
    <SvgIcon
      :icon="props.block.functionType.toLowerCase()"
      :x="0"
      :y="0"
      :backgroundCornerRadius="theme.blockStyles.radius"
      :size="iconSize"
      :svg-fill="theme.blockIconStyles.svg.fill"
      :svg-fill-opacity="iconStyles.opacity"
      :svg-stroke="iconStyles.stroke"
      :svg-strokeWidth="theme.blockIconStyles.svg.strokeWidth"
      :background-fill="iconStyles.fill"
      :background-opacity="iconStyles.opacity"
    />

    <!-- Icon right border -->
    <path
      :d="`M ${iconSize - 0.5} ${0.5} l 0 ${iconSize - 1}`"
      class="separator"
      :stroke="theme.blockStyles.stroke"
      :stroke-width="theme.blockStyles.strokeWidth"
    >
    </path>

    <!-- Label inside block -->
    <LabelControl
      :x="iconSize + textGapX"
      :y="block.size.height / 2"
      :text="block.functionType.toUpperCase()"
      vertical-alignment="middle"
      :color="theme.blockFunctionLabelStyles.color"
    />

    <!-- Label below block -->
    <LabelControl
      v-if="block.label"
      :x="0"
      :y="block.size.height + textGapY"
      :text="block.label"
      :color="theme.blockLabelStyles.color"
    />

    <!-- Block markers -->
    <MarkerControl
      v-for="(marker, i) in markers"
      :key="i"
      :x="marker.location.x"
      :y="marker.location.y"
      :shape="marker.shape"
      :size="MARKER_SIZE"
      :fill-color="marker.fillColor"
      :stroke-color="marker.strokeColor"
    />

    <!-- Block io -->
    <InputOutputControl
      v-for="ioElement in io"
      :key="ioElement.pin"
      :block="block"
      :inputOutput="ioElement"
      :fill-color="theme.blockIOStyles.fill"
      :stroke-color="theme.blockIOStyles.stroke"
      :stroke-width="theme.blockIOStyles.strokeWidth"
    />
  </g>
</template>

<script setup lang="ts">
import LabelControl from './LabelControl.vue';
import MarkerControl from './MarkerControl.vue';
import InputOutputControl from './InputOutputControl.vue';
import SvgIcon from './SvgIcon.vue';
import type { MarkerShape } from '../types/MarkerShape';
import { computed } from 'vue';
import { useEmitter, type FlowEvents } from '../utils/event-emitter';
import {
  MARKER_OFFSET_X,
  MARKER_OFFSET_Y,
  MARKER_SIZE,
  BLOCK_MOUSE_MOVE,
  BLOCK_MOUSE_OVER,
  BLOCK_MOUSE_ENTER,
  BLOCK_MOUSE_LEAVE,
  BLOCK_MOUSE_DOWN,
  BLOCK_MOUSE_UP
} from '../constants';
import { useThemeStore } from '../stores/themeStore';
import type { FlowBlockElement } from '../types/FlowBlockElement';

const textGapX = 10;
const textGapY = 5;

interface Props {
  block: FlowBlockElement;
}

const props = defineProps<Props>();

const io = props.block.io;

interface Styles {
  opacity: string;
  fill: string;
  stroke: string;
}

const blockStyles = computed((): Styles => {
  return {
    opacity: props.block.dragLocationInvalid ? '20%' : theme.blockStyles.fillOpacity,
    fill: props.block.dragLocationInvalid ? 'red' : theme.blockStyles.fill,
    stroke: props.block.dragLocationInvalid ? 'darkred' : theme.blockStyles.stroke
  };
});

const iconStyles = computed((): Styles => {
  return {
    opacity: props.block.dragLocationInvalid ? '20%' : theme.blockIconStyles.background.opacity,
    fill: props.block.dragLocationInvalid ? 'darkred' : theme.blockIconStyles.background.fill,
    stroke: theme.blockIconStyles.svg.stroke
  };
});

const labelStyles = computed((): Styles => {
  return {
    opacity: props.block.dragLocationInvalid ? '100%' : theme.blockStyles.fillOpacity,
    fill: props.block.dragLocationInvalid ? 'red' : theme.blockStyles.fill,
    stroke: props.block.dragLocationInvalid ? 'red' : theme.blockStyles.stroke
  };
});

// Make the icon size same as block height (less border size) so that it is displayed as a square.
// Using height works because the aspect ratio of the block is always width > height
const iconSize = computed(() => props.block.size.height);

const emitter = useEmitter();

const emit = (event: keyof FlowEvents, e: MouseEvent): boolean => {
  if (props.block) {
    emitter.emit(event, {
      data: props.block,
      mouseEvent: e
    });
  }

  e.preventDefault();
  return false;
};

const markers = computed((): MarkerShape[] => {
  if (!props.block) {
    return [];
  }

  return [
    {
      shape: 'circle',
      location: { x: props.block.size.width - (MARKER_SIZE + MARKER_OFFSET_X) * 1, y: MARKER_OFFSET_Y },
      size: { width: MARKER_SIZE, height: MARKER_SIZE },
      strokeColor: 'black',
      fillColor: 'yellow'
    },
    {
      shape: 'triangle',
      location: { x: props.block.size.width - (MARKER_SIZE + MARKER_OFFSET_X) * 2, y: MARKER_OFFSET_Y },
      size: { width: MARKER_SIZE, height: MARKER_SIZE },
      strokeColor: 'darkred',
      fillColor: 'coral'
    },
    {
      shape: 'square',
      location: { x: props.block.size.width - (MARKER_SIZE + MARKER_OFFSET_X) * 3, y: MARKER_OFFSET_Y },
      size: { width: MARKER_SIZE, height: MARKER_SIZE },
      strokeColor: 'green',
      fillColor: 'white'
    }
  ];
});

const { theme } = useThemeStore();
</script>

<style scoped lang="css">
.dragging-new {
  filter: grayscale(20%);
}
</style>
