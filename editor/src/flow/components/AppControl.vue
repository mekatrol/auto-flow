<template>
  <nav><MenuControl /></nav>
  <main>
    <div v-if="appStore.activeFlowKey.length > 0">
      <EditorControl :flow-key="appStore.activeFlowKey" />
    </div>
    <div>
      <FlowInformationControl />
    </div>
  </main>
  <BusyOverlay
    :show="appStore.isBusy"
    full-screen
  />
</template>

<script setup lang="ts">
import MenuControl from './MenuControl.vue';
import EditorControl from './EditorControl.vue';
import FlowInformationControl from './FlowInformationControl.vue';
import { BusyOverlay } from 'vue-boosted';
import { useAppStore } from '../stores/app-store';
import { useIntervalTimer } from 'vue-boosted';
import { useMockStore } from '../stores/mock-store';
import { useFlowStore } from '../stores/flow-store';

const appStore = useAppStore();
const flowStore = useFlowStore();

appStore.activeFlowKey = 'flow-1';

// Use mock store for now
const { createMockFlow } = useMockStore();
const flow = createMockFlow();

// Add to flow store
flowStore.addFlow(appStore.activeFlowKey, flow);

appStore.incrementBusy();

// TODO: This is just for development to see delay, remove when really loading from server
useIntervalTimer(async () => {
  appStore.decrementBusy();

  // Return false to stop timer, else true to continue running.
  return false;
}, 500);
</script>

<style scoped lang="scss">
main {
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;

  > div {
    width: 80%;
    max-width: 80%;
  }

  > div:last-child {
    max-width: 20%;
  }
}
</style>
