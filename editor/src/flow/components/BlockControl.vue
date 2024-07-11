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
      :icon-name="block.flowFunction.type.toLowerCase()"
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

    <!-- icon right border -->
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
      :text="block.flowFunction.label ?? ''"
      vertical-alignment="middle"
      :color="theme.blockFunctionLabelStyles.color"
    />

    <!-- Label below block -->
    <LabelControl
      :x="0"
      :y="block.size.height + textGapY"
      :text="block.label ?? ''"
      :color="theme.blockLabelStyles.color"
    />

    <!-- block markers -->
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

    <!-- block io -->
    <InputOutputControl
      v-for="ioElement in alignedInputOutputs"
      :key="ioElement.io.id"
      :block="block"
      :inputOutput="ioElement"
      :fill-color="theme.blockConnectorStyles.fill"
      :stroke-color="theme.blockConnectorStyles.stroke"
      :stroke-width="theme.blockConnectorStyles.strokeWidth"
    />
  </g>
</template>

<script setup lang="ts">
import LabelControl from './LabelControl.vue';
import MarkerControl from './MarkerControl.vue';
import InputOutputControl from './InputOutputControl.vue';
import SvgIcon from './SvgIcon.vue';
import { type EnumDictionary } from '../types/EnumDictionary';
import { BlockElement } from '../types/ui/BlockElement';
import { MarkerShape } from '../types/ui/MarkerShape';
import { InputOutputElement } from '../types/ui/InputOutputElement';
import { computed } from 'vue';
import { BlockSide } from '../types/ui/BlockSide';
import { useEmitter, type FlowEvents } from '../utils/event-emitter';
import {
  BLOCK_IO_OFFSET,
  BLOCK_IO_SIZE,
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
import type { Offset } from '../types/ui/Offset';

const textGapX = 10;
const textGapY = 5;

interface Props {
  block: BlockElement;
}

const props = defineProps<Props>();

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

const markers = computed(() => {
  if (!props.block) {
    return [];
  }

  return [
    new MarkerShape('circle', props.block.size.width - (MARKER_SIZE + MARKER_OFFSET_X) * 1, MARKER_OFFSET_Y, props.block, 'black', 'yellow'),
    new MarkerShape('triangle', props.block.size.width - (MARKER_SIZE + MARKER_OFFSET_X) * 2, MARKER_OFFSET_Y, props.block, 'darkred', 'coral'),
    new MarkerShape('square', props.block.size.width - (MARKER_SIZE + MARKER_OFFSET_X) * 3, MARKER_OFFSET_Y, props.block, 'green', 'white')
  ];
});

const getConnectorOffsets = (block: BlockElement, offset: number): EnumDictionary<BlockSide, Offset> => {
  const ioOffsets: EnumDictionary<BlockSide, Offset> = {
    [BlockSide.Left]: { x: -(BLOCK_IO_SIZE - BLOCK_IO_OFFSET), y: offset },
    [BlockSide.Top]: { x: offset, y: -BLOCK_IO_OFFSET },
    [BlockSide.Right]: { x: block.size.width - BLOCK_IO_OFFSET, y: offset },
    [BlockSide.Bottom]: { x: offset, y: block.size.height - BLOCK_IO_OFFSET }
  };

  return ioOffsets;
};

const transformConnectors = (side: BlockSide): InputOutputElement[] => {
  if (!props.block) {
    return [];
  }

  const io = props.block.io.filter((x) => x.side === side);

  const ioOffsets = getConnectorOffsets(props.block, 5);

  let shift = 0;
  io.forEach((c) => {
    const shiftHorizontal = c.side === BlockSide.Top || c.side === BlockSide.Bottom;
    const offset = ioOffsets[side];
    c.location.x = offset.x + (shiftHorizontal ? shift : 0);
    c.location.y = offset.y + (!shiftHorizontal ? shift : 0);
    shift += BLOCK_IO_SIZE + (BLOCK_IO_SIZE >> 1);
  });

  return io;
};

const alignedInputOutputs = computed((): InputOutputElement[] => {
  const io = [];

  io.push(...transformConnectors(BlockSide.Left));
  io.push(...transformConnectors(BlockSide.Top));
  io.push(...transformConnectors(BlockSide.Right));
  io.push(...transformConnectors(BlockSide.Bottom));

  return io;
});

const { theme } = useThemeStore();
</script>
