<template>
  <g class="scrollbar">
    <!-- The scroll bar -->
    <rect
      :x="x"
      :y="y"
      :width="width"
      :height="height"
      :fill="fill"
      ref="scrollbar"
      @pointerdown="dragSliderStart"
      @pointerup="dragSliderEnd"
      @pointermove="dragSliderMove"
    ></rect>
    <!-- The slider -->
    <rect
      style="pointer-events: none"
      :x="x"
      :y="triangleHeight + scroll * sliderHeight"
      :width="width"
      :height="Math.max(0, sliderHeight)"
      :fill="sliderDragging ? '#bbb' : '#fff'"
      stroke="black"
      stroke-width="1px"
    ></rect>
    <!-- The decrement value triangle -->
    <path
      :transform="`translate(${x}, ${y})`"
      :d="`M ${width / 2} 0 l ${width / 2} ${triangleHeight} l ${-width} 0 z`"
      fill="white"
      stroke="black"
      stroke-width="1px"
      @pointerdown="(e) => emit('scrollUp', e)"
    ></path>
    <!-- The increment value triangle -->
    <path
      :transform="`translate(${x}, ${y})`"
      :d="`M 0 ${height - triangleHeight} l ${width} 0 l ${-width / 2} ${triangleHeight} z`"
      fill="white"
      stroke="black"
      stroke-width="1px"
      @pointerdown="(e) => emit('scrollDown', e)"
    ></path>
  </g>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  x: number;
  y: number;
  scroll: number;
  width: number;
  height: number;
  count: number;
  fill: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['scrollUp', 'scrollDown', 'scroll']);

const scrollbar = ref();

const triangleHeight = ref(15);

// How much of the height is the scroll height
const scrollHeight = computed(() => props.height - 2 * triangleHeight.value);

// How large a step size if for (max - min) items
const sliderHeight = computed(() => scrollHeight.value / props.count);

const sliderDragging = ref(false);

const dragSliderStart = (e: PointerEvent) => {
  sliderDragging.value = true;

  (scrollbar.value as SVGTextElement).setPointerCapture(e.pointerId);

  dragSliderMove(e);
};

const dragSliderEnd = (e: PointerEvent) => {
  (scrollbar.value as SVGTextElement).releasePointerCapture(e.pointerId);
  sliderDragging.value = false;
};

const dragSliderMove = (e: PointerEvent) => {
  if (sliderDragging.value) {
    const scrollValue = Math.min(props.count - 1, Math.max(0, Math.floor((e.offsetY - triangleHeight.value) / sliderHeight.value)));
    emit('scroll', scrollValue);
  }
};
</script>

<style scoped lang="css">
.scrollbar {
  cursor: pointer;
}
</style>
