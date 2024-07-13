<template>
  <g
    class="block-pallette"
    :width="width"
    :height="height"
    overflow="scroll"
    @mousemove="(e) => flowDesigner.mouseMove(e)"
    @mouseup="(e) => flowDesigner.mouseUp(e)"
    @focusin="(e) => focus(e)"
  >
    <BlockConfigurationControl
      v-for="(functionConfiguration, i) in functionConfigurations"
      :key="i"
      :blockConfiguration="functionConfiguration"
      :x="gapX"
      :y="gapY + i * BLOCK_HEIGHT + gapY"
      @mousedown="(e) => mouseDown(e, functionConfiguration, gapX, gapY + i * BLOCK_HEIGHT + gapY)"
    />

    <!-- Right border -->
    <path
      :d="`M ${width - 1} ${0} l 0 ${height - 1}`"
      stroke="lightgrey"
      stroke-width="3px"
    >
    </path>
  </g>
</template>

<script setup lang="ts">
import BlockConfigurationControl from './BlockConfigurationControl.vue';
import { useFlowStore } from '../stores/flowStore';
import { BLOCK_HEIGHT, BLOCK_MOUSE_DOWN } from '../constants';
import type { BlockTemplate } from '../types/BlockTemplate';
import { v4 as uuidv4 } from 'uuid';
import { useFlowDesigner } from '../types/FlowDesigner';
import type { FlowBlockElement } from '../types/FlowBlockElement';
import { useEmitter, type FlowEvents } from '../utils/event-emitter';

interface Props {
  width: number;
  height: number;
}

defineProps<Props>();

const { functionConfigurations } = useFlowStore();
const flowDesigner = useFlowDesigner();

const gapX = 8;
const gapY = 5;

const mouseDown = (e: MouseEvent, functionConfiguration: BlockTemplate, x: number, y: number): void => {
  const block: FlowBlockElement = {
    location: { x: x, y: y },
    functionType: functionConfiguration.type,
    size: { ...functionConfiguration.size },
    id: uuidv4(),
    io: functionConfiguration.io.map((io) => ({ ...io })),
    selected: true,
    z: 1,
    zBoost: 0,
    zOrder: 1,
    label: 'New block',
    draggingAsNew: true
  };

  flowDesigner.layoutInputOutputs(functionConfiguration.size, block.io);

  emit(BLOCK_MOUSE_DOWN, e, block);
};

const focus = (_e: FocusEvent): void => {
  // Do nothing, and SVG element won't raise keyboard events unless it has
  // a focus event handler
};

const emitter = useEmitter();

const emit = (event: keyof FlowEvents, e: MouseEvent, block: FlowBlockElement): boolean => {
  emitter.emit(event, {
    data: block,
    mouseEvent: e
  });

  e.preventDefault();
  return false;
};
</script>

<style scoped lang="css">
.block-pallette {
  overflow: scroll;
  border-right: 1px solid red;
}
</style>
