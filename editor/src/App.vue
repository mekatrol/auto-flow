<template>
  <div style="height: 50%">
    <h1>Heading</h1>
  </div>
  <main style="height: 50%">
    <FlowEditor />
    <BusyOverlay :show="appStore.isBusy" full-screen />
  </main>
</template>

<script setup lang="ts">
import FlowEditor from '@/components/FlowEditor.vue';
import { BusyOverlay } from 'vue-boosted';
import { useAppStore } from './stores/app';
import { useIntervalTimer } from 'vue-boosted';

const appStore = useAppStore();

appStore.incrementBusy();

useIntervalTimer(async () => {
  appStore.decrementBusy();

  // Return false to stop timer, else true to continue running.
  return false;
}, 3000);
</script>
