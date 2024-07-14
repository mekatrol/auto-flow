<template>
  <GridControl
    :width="width"
    :height="height"
    :grid-size="gridSize"
  />

  <ConnectionControl
    v-for="(connection, i) in flowController.connections.value"
    :key="i"
    :connection="connection"
  />
  <BlockControl
    v-for="(block, i) in flowController.blocks.value"
    :key="i"
    :block="block"
  />
  <ConnectingControl
    v-if="flowController.drawingConnection.value"
    :connecting="flowController.drawingConnection.value!"
  />
  <BlockControl
    v-if="flowController.dragBlock.value && flowController.dragBlock.value.draggingAsNew"
    :block="flowController.dragBlock.value"
  />
</template>

<script setup lang="ts">
import GridControl from './GridControl.vue';
import ConnectionControl from './ConnectionControl.vue';
import ConnectingControl from './ConnectingControl.vue';
import BlockControl from './BlockControl.vue';
import { useFlowController } from '../types/FlowController';

const flowController = useFlowController();

interface Props {
  width: number;
  height: number;
  gridSize: number;
}

const props = defineProps<Props>();
</script>
