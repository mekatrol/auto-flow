import { defineStore } from 'pinia';
import type { FlowElement } from '../types/ui/FlowElement';

const flowElements: Record<string, FlowElement> = {};

const clearElements = (): void => {
  for (const key in flowElements) {
    delete flowElements[key];
  }
};

export const useFlowStore = defineStore('flow', () => {
  return { elements: flowElements, clearElements };
});
