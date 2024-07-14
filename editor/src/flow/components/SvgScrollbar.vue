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
      :y="sliderY"
      :width="width"
      :height="Math.max(0, sliderHeight)"
      :fill="sliderDragging ? '#dff' : '#aaa'"
      stroke="black"
      stroke-width="1px"
    ></rect>
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
const sliderPointerEvent = ref<PointerEvent | undefined>(undefined);

// How much of the height is the scroll height
const scrollHeight = computed(() => props.height);

// How large a step size if for (max - min) items
const sliderHeight = computed(() => scrollHeight.value / props.count);

const sliderDragging = ref(false);

const dragSliderStart = (e: PointerEvent) => {
  sliderDragging.value = true;
  sliderPointerEvent.value = e;

  (scrollbar.value as SVGTextElement).setPointerCapture(e.pointerId);

  dragSliderMove(e);
};

const dragSliderEnd = (e: PointerEvent) => {
  (scrollbar.value as SVGTextElement).releasePointerCapture(e.pointerId);
  sliderDragging.value = false;
  sliderPointerEvent.value = undefined;
};

const dragSliderMove = (e: PointerEvent) => {
  if (sliderDragging.value) {
    sliderPointerEvent.value = e;
    const scrollValue = Math.min(props.count - 1, Math.max(0, Math.floor(e.offsetY / sliderHeight.value)));
    emit('scroll', scrollValue);
  }
};

const sliderY = computed(() => {
  return sliderDragging.value && sliderPointerEvent.value
    ? // relative to mouse position (to make slide smooth)
      Math.min(props.height - sliderHeight.value, Math.max(0, sliderPointerEvent.value.offsetY - sliderHeight.value / 2))
    : // based on scroll value
      props.scroll * sliderHeight.value;
});
</script>

<style scoped lang="css">
.scrollbar {
  cursor: pointer;
}
</style>
