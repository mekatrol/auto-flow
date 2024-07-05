<template>
  <g v-if="model">
    <rect
      class="flow-block"
      :x="model.location.x"
      :y="model.location.y"
      :width="model.size.width"
      :height="model.size.height"
      :rx="`${model.cornerRadius}px`"
      :ry="`${model.cornerRadius}px`"
      :fill="model.fillColor"
      :stroke="model.strokeColor"
      @mousemove="(e) => emit(BLOCK_MOUSE_MOVE, e)"
      @mouseover="(e) => emit(BLOCK_MOUSE_OVER, e)"
      @mouseenter="(e) => emit(BLOCK_MOUSE_ENTER, e)"
      @mouseleave="(e) => emit(BLOCK_MOUSE_LEAVE, e)"
      @mousedown="(e) => emit(BLOCK_MOUSE_DOWN, e)"
      @mouseup="(e) => emit(BLOCK_MOUSE_UP, e)"
    ></rect>
    <LabelControl
      :x="model.location.x"
      :y="model.location.y + model.size.height + textGap"
      :text="model.block.label"
    />
    <!-- block markers -->
    <MarkerControl
      v-for="(marker, i) in markers"
      :key="i"
      :x="model.location.x + marker.location.x"
      :y="model?.location.y + marker.location.y"
      :shape="marker.shape"
      :size="MARKER_SIZE"
      :fill-color="marker.fillColor"
      :stroke-color="marker.strokeColor"
    />

    <!-- block connectors -->
    <ConnectorControl
      v-for="connector in alignedConnectors"
      :key="connector.id"
      :block="model"
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
import { type EnumDictionary } from '../models/EnumDictionary';
import { FlowBlockElement } from '../models/FlowBlockElement';
import { MarkerShape } from '../models/MarkerShape';
import { FlowBlockConnector } from '../models/FlowBlockConnector';
import { computed } from 'vue';
import { BlockSide } from '../models/BlockSide';
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

const textGap = 5;

var model = defineModel<FlowBlockElement>();

const emitter = useEmitter();

const emit = (event: keyof FlowEvents, e: MouseEvent): boolean => {
  if (model.value) {
    emitter.emit(event, {
      data: model.value,
      mouseEvent: e
    });
  }

  e.preventDefault();
  return false;
};

const markers = computed(() => {
  if (!model.value) {
    return [];
  }

  return [
    new MarkerShape('circle', model.value.size.width - (MARKER_SIZE + MARKER_OFFSET_X) * 1, MARKER_OFFSET_Y, model.value, 'black', 'yellow'),
    new MarkerShape('triangle', model.value.size.width - (MARKER_SIZE + MARKER_OFFSET_X) * 2, MARKER_OFFSET_Y, model.value, 'darkred', 'coral'),
    new MarkerShape('square', model.value.size.width - (MARKER_SIZE + MARKER_OFFSET_X) * 3, MARKER_OFFSET_Y, model.value, 'green', 'white')
  ];
});

const getConnectorOffsets = (block: FlowBlockElement, offset: number): EnumDictionary<BlockSide, { x: number; y: number }> => {
  const connectorOffsets: EnumDictionary<BlockSide, { x: number; y: number }> = {
    [BlockSide.Left]: { x: -(BLOCK_CONNECTOR_SIZE - BLOCK_CONNECTOR_OFFSET), y: offset },
    [BlockSide.Top]: { x: offset, y: -BLOCK_CONNECTOR_OFFSET },
    [BlockSide.Right]: { x: block.size.width - BLOCK_CONNECTOR_OFFSET, y: offset },
    [BlockSide.Bottom]: { x: offset, y: block.size.height - BLOCK_CONNECTOR_OFFSET }
  };

  return connectorOffsets;
};

const transformConnectors = (side: BlockSide): FlowBlockConnector[] => {
  if (!model.value) {
    return [];
  }

  const connectors = model.value.block.connectors.filter((x) => x.side === side);

  let shift = 0;
  const connectorOffsets = getConnectorOffsets(model.value, 5);

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
