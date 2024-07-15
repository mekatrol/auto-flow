<template>
  <g
    class="block-template-palette"
    @pointermove="(e) => flowController.pointerMove(e)"
    @pointerup="(e) => flowController.pointerUp(e)"
    @mousewheel="mouseWheel"
    @focusin="(e) => focus(e)"
  >
    <!-- We need a rect covering the full palette view so that mouse wheel events are captured when the mouse is over areas that are not a block -->
    <rect
      x="0"
      y="0"
      :width="width"
      :height="height"
      fill="transparent"
      @mousewheel="mouseWheel"
    ></rect>

    <!-- Block templates -->
    <BlockTemplateControl
      v-for="(blockTemplate, i) in visibleBlockTemplates"
      :key="i"
      :blockConfiguration="blockTemplate"
      :x="gap"
      :y="gap + i * (BLOCK_HEIGHT + gap)"
      @pointerdown="(e) => pointerDown(e, blockTemplate, gap, gap + i * (BLOCK_HEIGHT + gap))"
      @pointerup="pointerUp"
    />

    <!-- Right scrollbar -->
    <SvgScrollbar
      :x="width - scrollbarWidth"
      :y="0"
      :scroll="yScroll"
      :width="scrollbarWidth"
      :height="height"
      :count="blockTemplates.length - visibleBlocks + 1"
      fill="#333"
      @scroll-down="scrollDown"
      @scroll-up="scrollUp"
      @scroll="scroll"
    />
  </g>
</template>

<script setup lang="ts">
import BlockTemplateControl from './BlockTemplateControl.vue';
import SvgScrollbar from './SvgScrollbar.vue';
import { useFlowStore } from '../stores/flow-store';
import { BLOCK_HEIGHT, BLOCK_POINTER_DOWN, BLOCK_POINTER_UP } from '../constants';
import type { BlockTemplate } from '../types/BlockTemplate';
import { v4 as uuidv4 } from 'uuid';
import { useFlowController } from '../types/FlowController';
import type { FlowBlock } from '../types/FlowBlock';
import { useEmitter, type FlowEvents } from '../utils/event-emitter';
import { computed, ref } from 'vue';

interface Props {
  width: number;
  height: number;
  scrollbarWidth: number;
  gap: number;
  flowKey: string;
}

const props = defineProps<Props>();

const { blockTemplates } = useFlowStore();
const flowController = useFlowController(props.flowKey);

// This is the number of blocks that have been scrolled up
const yScroll = ref(0);

const scrollUp = () => {
  if (yScroll.value < 0) {
    // This should never happen, but just in cas there is a bug in the scrolling logic
    yScroll.value = 0;
  }

  if (yScroll.value === 0) {
    return;
  }

  yScroll.value -= 1;
};

const visibleBlocks = computed(() => {
  return Math.floor(props.height / (props.gap + BLOCK_HEIGHT));
});

const scrollDown = () => {
  // Always display at least height number
  const visibleBlocksHeight = Math.floor(props.height / (props.gap + BLOCK_HEIGHT));

  if (yScroll.value >= blockTemplates.length - visibleBlocksHeight) {
    return;
  }

  yScroll.value += 1;
};

const scroll = (scroll: number) => {
  yScroll.value = scroll;
};

const mouseWheel = (e: WheelEvent) => {
  const delta = e.deltaY / 100;
  yScroll.value = Math.min(blockTemplates.length - visibleBlocks.value, Math.max(0, yScroll.value + delta));
};

const visibleBlockTemplates = computed(() => {
  const visible: BlockTemplate[] = [];

  for (let i = yScroll.value; i < blockTemplates.length; i++) {
    visible.push(blockTemplates[i]);
  }

  return visible;
});

const pointerDown = (e: PointerEvent, blockTemplate: BlockTemplate, x: number, y: number): void => {
  const block: FlowBlock = {
    location: { x: x - props.width, y: y },
    functionType: blockTemplate.type,
    size: { ...blockTemplate.size },
    id: uuidv4(),
    io: blockTemplate.io.map((io) => ({ ...io })),
    selected: true,
    z: 1,
    zBoost: 0,
    zOrder: 1,
    label: 'New block',
    draggingAsNew: true
  };

  flowController.layoutInputOutputs(blockTemplate.size, block.io);

  emit(BLOCK_POINTER_DOWN, e, block);
};

const pointerUp = (e: PointerEvent) => {
  emit(BLOCK_POINTER_UP, e, flowController.dragBlock.value!);
};

const focus = (_e: FocusEvent): void => {
  // Do nothing, and SVG element won't raise keyboard events unless it has
  // a focus event handler
};

const emitter = useEmitter();

const emit = (event: keyof FlowEvents, e: PointerEvent, block: FlowBlock): boolean => {
  emitter.emit(event, {
    data: block,
    pointerEvent: e
  });

  e.preventDefault();
  return false;
};
</script>
