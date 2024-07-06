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
      :rx="`${block.cornerRadius}px`"
      :ry="`${block.cornerRadius}px`"
      :fill="block.fillColor"
      :fill-opacity="block.fillOpacity"
      :stroke="block.strokeColor"
      :stroke-width="`${strokeWidth}px`"
      @mousemove="(e) => emit(BLOCK_MOUSE_MOVE, e)"
      @mouseover="(e) => emit(BLOCK_MOUSE_OVER, e)"
      @mouseenter="(e) => emit(BLOCK_MOUSE_ENTER, e)"
      @mouseleave="(e) => emit(BLOCK_MOUSE_LEAVE, e)"
      @mousedown="(e) => emit(BLOCK_MOUSE_DOWN, e)"
      @mouseup="(e) => emit(BLOCK_MOUSE_UP, e)"
    ></rect>

    <!-- Block icon -->
    <SvgIcon
      icon-name="and"
      :x="strokeWidth"
      :y="strokeWidth"
      :r="block.cornerRadius"
      :icon="props.block.icon"
      :size="iconSize"
      :fill="block.iconFillColor"
      :stroke="block.iconStrokeColor"
      :strokeWidth="block.iconStrokeWidth"
    />

    <!-- Label inside block -->
    <LabelControl
      :x="iconSize + textGapX"
      :y="block.size.height / 2"
      :text="block.flowFunction.label"
      vertical-alignment="middle"
      :color="block.functionColor"
    />

    <!-- Label below block -->
    <LabelControl
      :x="0"
      :y="block.size.height + textGapY"
      :text="block.label"
      :color="block.labelColor"
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

    <!-- block connectors -->
    <ConnectorControl
      v-for="connector in alignedConnectors"
      :key="connector.id"
      :block="block"
      :connector="connector"
      :fill-color="connector.fillColor"
      :stroke-color="connector.strokeColor"
    />
  </g>
</template>

<script setup lang="ts">
import LabelControl from './LabelControl.vue';
import MarkerControl from './MarkerControl.vue';
import ConnectorControl from './ConnectorControl.vue';
import SvgIcon from './SvgIcon.vue';
import { type EnumDictionary } from '../types/EnumDictionary';
import { FlowBlock } from '../types/FlowBlock';
import { MarkerShape } from '../types/MarkerShape';
import { FlowBlockConnector } from '../types/FlowBlockConnector';
import { computed } from 'vue';
import { BlockSide } from '../types/BlockSide';
import { useEmitter, type FlowEvents } from '../utils/event-emitter';
import {
  BLOCK_CONNECTOR_OFFSET,
  BLOCK_CONNECTOR_SIZE,
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

const textGapX = 10;
const textGapY = 5;

interface Props {
  block: FlowBlock;
}

const props = defineProps<Props>();

// Standard border (stroke) width for block
const strokeWidth = 2;

// Make the icon size same as block height (less border size) so that it is displayed as a square.
// Using height works because the aspect ratio of the block is always width > height
const iconSize = computed(() => props.block.size.height - 2 * strokeWidth);

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

const getConnectorOffsets = (block: FlowBlock, offset: number): EnumDictionary<BlockSide, { x: number; y: number }> => {
  const connectorOffsets: EnumDictionary<BlockSide, { x: number; y: number }> = {
    [BlockSide.Left]: { x: -(BLOCK_CONNECTOR_SIZE - BLOCK_CONNECTOR_OFFSET), y: offset },
    [BlockSide.Top]: { x: offset, y: -BLOCK_CONNECTOR_OFFSET },
    [BlockSide.Right]: { x: block.size.width - BLOCK_CONNECTOR_OFFSET, y: offset },
    [BlockSide.Bottom]: { x: offset, y: block.size.height - BLOCK_CONNECTOR_OFFSET }
  };

  return connectorOffsets;
};

const transformConnectors = (side: BlockSide): FlowBlockConnector[] => {
  if (!props.block) {
    return [];
  }

  const connectors = props.block.flowFunction.connectors.filter((x) => x.side === side);

  let shift = 0;
  const connectorOffsets = getConnectorOffsets(props.block, 5);

  connectors.forEach((c) => {
    const shiftHorizontal = c.side === BlockSide.Top || c.side === BlockSide.Bottom;
    const offset = connectorOffsets[side];
    c.location.x = offset.x + (shiftHorizontal ? shift : 0);
    c.location.y = offset.y + (!shiftHorizontal ? shift : 0);
    shift += BLOCK_CONNECTOR_SIZE + (BLOCK_CONNECTOR_SIZE >> 1);
  });

  return connectors;
};

const alignedConnectors = computed((): FlowBlockConnector[] => {
  const connectors = [];

  connectors.push(...transformConnectors(BlockSide.Left));
  connectors.push(...transformConnectors(BlockSide.Top));
  connectors.push(...transformConnectors(BlockSide.Right));
  connectors.push(...transformConnectors(BlockSide.Bottom));

  return connectors;
});
</script>
