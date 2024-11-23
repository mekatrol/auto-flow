<template>
  <AppControl />
</template>

<script setup lang="ts">
import AppControl from '@/flow/components/AppControl.vue';

import { Api } from '@/services/api-generated';
import { onMounted } from 'vue';

const api = new Api({
  baseURL: 'https://localhost:7058'
});

onMounted(async () => {
  try {
    console.log('this is getting flows');
    const flows = await api.flows.flowsList();
    console.log('done', flows);
  } catch (e) {
    console.error(e);
  }
});
</script>
