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
      :fill="model.fill"
      :stroke="model.stroke"
    ></rect>
    <LabelControl
      :x="model.location.x"
      :y="model.location.y + model.size.height + textGap"
      :text="model.block.label"
    />
    <!-- node markers -->
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
  </g>
</template>

<script setup lang="ts">
import LabelControl from './LabelControl.vue';
import MarkerControl from './MarkerControl.vue';
import { FlowBlockElement, MarkerShape } from '../models/types';
import { computed } from 'vue';
import { MARKER_OFFSET_X, MARKER_OFFSET_Y, MARKER_SIZE } from '../models/constants';

const textGap = 5;

var model = defineModel<FlowBlockElement>();

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
</script>
