<template>
  <main>
    <FlowEditor />
  </main>
  <BusyOverlay :show="appStore.isBusy" full-screen />
</template>

<script setup lang="ts">
import FlowEditor from '@/components/FlowEditor.vue';
import { BusyOverlay } from 'vue-boosted';
import { useAppStore } from './stores/app';
import { useIntervalTimer } from 'vue-boosted';

const appStore = useAppStore();

appStore.incrementBusy();

// TODO: This is just for development to see delay, remove when really loading from server
useIntervalTimer(async () => {
  appStore.decrementBusy();

  // Return false to stop timer, else true to continue running.
  return false;
}, 500);
</script>
