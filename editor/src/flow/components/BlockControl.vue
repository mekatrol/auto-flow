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
      :text="block.flowFunction.label"
      vertical-alignment="middle"
      :color="theme.blockFunctionLabelStyles.color"
    />

    <!-- Label below block -->
    <LabelControl
      :x="0"
      :y="block.size.height + textGapY"
      :text="block.label"
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

    <!-- block connectors -->
    <ConnectorControl
      v-for="connector in alignedConnectors"
      :key="connector.id"
      :block="block"
      :connector="connector"
      :fill-color="theme.blockConnectorStyles.fill"
      :stroke-color="theme.blockConnectorStyles.stroke"
      :stroke-width="theme.blockConnectorStyles.strokeWidth"
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
import { useThemeStore } from '../store/themeStore';
import type { Offset } from '../types/Offset';

const textGapX = 10;
const textGapY = 5;

interface Props {
  block: FlowBlock;
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

const getConnectorOffsets = (block: FlowBlock, offset: number): EnumDictionary<BlockSide, Offset> => {
  const connectorOffsets: EnumDictionary<BlockSide, Offset> = {
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

  const connectorOffsets = getConnectorOffsets(props.block, 5);

  let shift = 0;
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

const { theme } = useThemeStore();
</script>
