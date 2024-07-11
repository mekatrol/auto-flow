<template>
  <g
    v-if="block"
    :transform="`translate(${block.location.x},${block.location.y})`"
  >
    <rect
      class="flow-block"
      :x="0"
      :y="0"
      :width="block.size.width"
      :height="block.size.height"
      :rx="`${theme.blockStyles.radius}px`"
      :ry="`${theme.blockStyles.radius}px`"
      :fill="theme.blockStyles.fill"
      :fill-opacity="theme.blockStyles.fillOpacity"
      :stroke="theme.blockStyles.stroke"
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
      :icon-name="(block as BlockElement).flowFunction.type.toLowerCase()"
      :x="0"
      :y="0"
      :backgroundCornerRadius="theme.blockStyles.radius"
      :icon="props.block.icon"
      :size="iconSize"
      :svg-fill="theme.blockIconStyles.svg.fill"
      :svg-fill-opacity="theme.blockIconStyles.svg.opacity"
      :svg-stroke="theme.blockIconStyles.svg.stroke"
      :svg-strokeWidth="theme.blockIconStyles.svg.strokeWidth"
      :background-fill="theme.blockIconStyles.background.fill"
      :background-opacity="theme.blockIconStyles.background.opacity"
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
      :text="(block as BlockElement).flowFunction.type.toUpperCase()"
      vertical-alignment="middle"
      :color="theme.blockFunctionLabelStyles.color"
    />

    <!-- Label below block -->
    <LabelControl
      :x="0"
      :y="block.size.height + textGapY"
      :text="(block as BlockElement).flowFunction.label ?? ''"
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
      :key="ioElement.io.id"
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
import { BlockElement } from '../types/ui/BlockElement';
import { MarkerShape } from '../types/ui/MarkerShape';
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
import { InputOutputElement } from '../types/ui/InputOutputElement';
import { InputOutputDirection } from '../types/InputOutputDirection';
import { BlockSide } from '../types/ui/BlockSide';
import { layoutInputOutputs } from '../utils/flow-element-helpers';
import type { FlowBlockElement } from '../types/persistence/FlowBlockElement';

const textGapX = 10;
const textGapY = 5;

interface Props {
  block: FlowBlockElement;
}

const props = defineProps<Props>();

const io = (props.block as BlockElement).flowFunction.io.map(
  (io) => new InputOutputElement(props.block as BlockElement, io.direction === InputOutputDirection.Input ? BlockSide.Left : BlockSide.Right, io)
);

layoutInputOutputs(props.block.size, io);

// Make the icon size same as block height (less border size) so that it is displayed as a square.
// Using height works because the aspect ratio of the block is always width > height
const iconSize = computed(() => props.block.size.height);

const emitter = useEmitter();

const emit = (event: keyof FlowEvents, e: MouseEvent): boolean => {
  if (props.block) {
    emitter.emit(event, {
      data: props.block as BlockElement,
      mouseEvent: e
    });
  }

  e.preventDefault();
  return false;
};

const markers = computed(() => {
  if (!props.block) {
    return [];
  }

  return [
    new MarkerShape('circle', props.block.size.width - (MARKER_SIZE + MARKER_OFFSET_X) * 1, MARKER_OFFSET_Y, 'black', 'yellow'),
    new MarkerShape('triangle', props.block.size.width - (MARKER_SIZE + MARKER_OFFSET_X) * 2, MARKER_OFFSET_Y, 'darkred', 'coral'),
    new MarkerShape('square', props.block.size.width - (MARKER_SIZE + MARKER_OFFSET_X) * 3, MARKER_OFFSET_Y, 'green', 'white')
  ];
});

const { theme } = useThemeStore();
</script>
