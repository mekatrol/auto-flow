<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="flow-editor"
    :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
    ref="svg"
    focusable="true"
    @pointermove="(e) => flowController.pointerMove(e)"
    @pointerleave="(e) => flowController.pointerLeave(e)"
    @pointerdown="(e) => flowController.pointerDown(e)"
    @pointerup="(e) => flowController.pointerUp(e)"
    @keypress="(e) => flowController.keyPress(e)"
    @keydown="(e) => flowController.keyDown(e)"
    @keyup="(e) => flowController.keyUp(e)"
    @focusin="(e) => focus(e)"
  >
    <g :transform="`translate(0, 0)`">
      <ContainerControl
        :width="blockPaletteWidth"
        :height="svgHeight"
      >
        <PaletteControl
          :x="0"
          :y="0"
          :width="blockPaletteWidth"
          :height="svgHeight"
          :gap="PALETTE_GAP"
          :scrollbarWidth="SCROLLBAR_SIZE"
          :flow-key="flowKey"
        />
      </ContainerControl>
    </g>
    <g :transform="`translate(${blockPaletteWidth}, 0)`">
      <ContainerControl
        :width="svgWidth - blockPaletteWidth"
        :height="svgHeight"
      >
        <FlowControl
          :width="svgWidth - blockPaletteWidth"
          :height="svgHeight"
          :grid-size="gridSize"
          :flow-key="flowKey"
        />
      </ContainerControl>
    </g>
  </svg>
</template>

<script setup lang="ts">
import PaletteControl from './PaletteControl.vue';
import FlowControl from './FlowControl.vue';
import { onMounted, ref, watch } from 'vue';
import { useScreenSize } from 'vue-boosted';
import { useFlowController } from '../types/FlowController';
import ContainerControl from './ContainerControl.vue';
import { useAppStore } from '../stores/app-store';
import { PALETTE_GAP, SCROLLBAR_SIZE } from '../constants';

interface Props {
  flowKey: string;
}

const props = defineProps<Props>();

const gridSize = ref(20);
const screenSize = useScreenSize();
const { blockPaletteWidth } = useAppStore();
const svg = ref<SVGAElement>();
const svgWidth = ref(0);
const svgHeight = ref(0);

const calculateSvgHeight = () => {
  // Cast to SVG element
  const svgElement = svg.value!;

  // Get the parent container
  const parentDiv = svgElement.parentElement as HTMLElement;

  // Use the parent height as the height
  svgWidth.value = parentDiv.clientWidth;
  svgHeight.value = parentDiv.clientHeight;
};

// Must be done before constructing any blocks or connections
const flowController = useFlowController(props.flowKey);

onMounted(() => {
  calculateSvgHeight();
});

const focus = (_e: FocusEvent): void => {
  // Do nothing, and SVG element won't raise keyboard events unless it has
  // a focus event handler
};

onMounted(() => {
  // Send all svg element focus events to the SVG
  svg.value!.querySelectorAll('[focusable=true]').forEach((el) => {
    el.addEventListener('focus', (_e) => {
      svg.value!.focus({
        preventScroll: true
      });
    });
  });
});

watch(
  () => screenSize.value,
  (c) => {
    calculateSvgHeight();
  }
);
</script>
