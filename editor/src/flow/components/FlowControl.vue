<template>
  <GridControl
    :width="width"
    :height="height"
    :grid-size="gridSize"
  />

  <ConnectionControl
    v-for="(connection, i) in flowController.flow.connections"
    :key="i"
    :flow-key="flowKey"
    :connection="connection"
  />
  <BlockControl
    v-for="(block, i) in flowController.flow.blocks"
    :key="i"
    :flow-key="flowKey"
    :block="block"
  />
  <ConnectingControl
    v-if="flowController.drawingConnection.value"
    :connecting="flowController.drawingConnection.value!"
    :flow-key="flowKey"
  />
  <BlockControl
    v-if="flowController.dragBlock.value && flowController.dragBlock.value.draggingAsNew"
    :block="flowController.dragBlock.value"
    :flow-key="flowKey"
  />
</template>

<script setup lang="ts">
import GridControl from './GridControl.vue';
import ConnectionControl from './ConnectionControl.vue';
import ConnectingControl from './ConnectingControl.vue';
import BlockControl from './BlockControl.vue';
import { useFlowController } from '../types/FlowController';

interface Props {
  width: number;
  height: number;
  gridSize: number;
  flowKey: string;
}

const props = defineProps<Props>();

const flowController = useFlowController(props.flowKey);
</script>
