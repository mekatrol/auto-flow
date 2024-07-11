import { defineStore } from 'pinia';

const flowElements: Record<string, any> = {};

const clearElements = (): void => {
  for (const key in flowElements) {
    delete flowElements[key];
  }
};

export const useFlowStore = defineStore('flow', () => {
  return { elements: flowElements, clearElements };
});
