<template>
  <GridControl
    :width="width"
    :height="height"
    :grid-size="gridSize"
  />

  <ConnectionControl
    v-for="(connection, i) in flowDesigner.connections.value"
    :key="i"
    :connection="connection"
  />
  <BlockControl
    v-for="(block, i) in flowDesigner.blocks.value"
    :key="i"
    :block="block"
  />
  <ConnectingControl
    v-if="flowDesigner.drawingConnection.value"
    :connecting="flowDesigner.drawingConnection.value!"
  />
  <BlockControl
    v-if="flowDesigner.dragBlock.value && flowDesigner.dragBlock.value.draggingAsNew"
    :block="flowDesigner.dragBlock.value"
  />
</template>

<script setup lang="ts">
import GridControl from './GridControl.vue';
import ConnectionControl from './ConnectionControl.vue';
import ConnectingControl from './ConnectingControl.vue';
import BlockControl from './BlockControl.vue';
import { useFlowDesigner } from '../types/FlowDesigner';

const flowDesigner = useFlowDesigner();

interface Props {
  width: number;
  height: number;
  gridSize: number;
}

const props = defineProps<Props>();
</script>
