<template>
  <g
    class="block-template-pallette"
    @pointermove="(e) => flowDesigner.pointerMove(e)"
    @pointerup="(e) => flowDesigner.pointerUp(e)"
    @focusin="(e) => focus(e)"
  >
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
      :count="blockTemplates.length"
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
import { useFlowStore } from '../stores/flowStore';
import { BLOCK_HEIGHT, BLOCK_POINTER_DOWN, BLOCK_POINTER_UP } from '../constants';
import type { BlockTemplate } from '../types/BlockTemplate';
import { v4 as uuidv4 } from 'uuid';
import { useFlowDesigner } from '../types/FlowDesigner';
import type { FlowBlockElement } from '../types/FlowBlockElement';
import { useEmitter, type FlowEvents } from '../utils/event-emitter';
import { computed, ref } from 'vue';

interface Props {
  width: number;
  height: number;
  scrollbarWidth: number;
  gap: number;
}

const props = defineProps<Props>();

const { blockTemplates } = useFlowStore();
const flowDesigner = useFlowDesigner();

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

const visibleBlockTemplates = computed(() => {
  const visible: BlockTemplate[] = [];

  for (let i = yScroll.value; i < blockTemplates.length; i++) {
    visible.push(blockTemplates[i]);
  }

  return visible;
});

const pointerDown = (e: PointerEvent, blockTemplate: BlockTemplate, x: number, y: number): void => {
  const block: FlowBlockElement = {
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

  flowDesigner.layoutInputOutputs(blockTemplate.size, block.io);

  emit(BLOCK_POINTER_DOWN, e, block);
};

const pointerUp = (e: PointerEvent) => {
  emit(BLOCK_POINTER_UP, e, flowDesigner.dragBlock.value!);
};

const focus = (_e: FocusEvent): void => {
  // Do nothing, and SVG element won't raise keyboard events unless it has
  // a focus event handler
};

const emitter = useEmitter();

const emit = (event: keyof FlowEvents, e: PointerEvent, block: FlowBlockElement): boolean => {
  emitter.emit(event, {
    data: block,
    pointerEvent: e
  });

  e.preventDefault();
  return false;
};
</script>
