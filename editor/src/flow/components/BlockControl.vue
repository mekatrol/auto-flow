<template>
  <g v-if="block">
    <rect
      class="flow-block"
      :x="block.location.x"
      :y="block.location.y"
      :width="block.size.width"
      :height="block.size.height"
      :rx="`${block.cornerRadius}px`"
      :ry="`${block.cornerRadius}px`"
      :fill="block.fillColor"
      :stroke="block.strokeColor"
      @mousemove="(e) => emit(BLOCK_MOUSE_MOVE, e)"
      @mouseover="(e) => emit(BLOCK_MOUSE_OVER, e)"
      @mouseenter="(e) => emit(BLOCK_MOUSE_ENTER, e)"
      @mouseleave="(e) => emit(BLOCK_MOUSE_LEAVE, e)"
      @mousedown="(e) => emit(BLOCK_MOUSE_DOWN, e)"
      @mouseup="(e) => emit(BLOCK_MOUSE_UP, e)"
    ></rect>

    <!-- Label inside block -->
    <LabelControl
      :x="block.location.x + textGapX"
      :y="block.location.y + block.size.height / 2"
      :text="block.function.label"
      vertical-alignment="middle"
    />

    <!-- Label below block -->
    <LabelControl
      :x="block.location.x"
      :y="block.location.y + block.size.height + textGapY"
      :text="block.label"
    />
    <!-- block markers -->
    <MarkerControl
      v-for="(marker, i) in markers"
      :key="i"
      :x="block.location.x + marker.location.x"
      :y="block?.location.y + marker.location.y"
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

  const connectors = props.block.function.connectors.filter((x) => x.side === side);

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
