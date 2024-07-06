<template>
  <g
    class="icon"
    :transform="`translate(${x},${y})`"
    :width="size"
    :height="size"
  >
    <!-- icon shadow -->
    <path
      class="dither"
      stroke="red"
      :d="`M${r} 0 h${size - r} v${size} h${-(size - r)} a ${r} ${r} 0 0 1 -${r} -${r} v-${size - 2 * r} a ${r} ${r} 0 0 1 ${r} -${r}`"
    >
    </path>

    <!-- icon placeholder -->
    <g ref="icon"></g>

    <!-- icon right border -->
    <path
      :d="`M ${size - 0.5} ${0.5} l 0 ${size - 1}`"
      class="separator"
    >
    </path>
  </g>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

interface Props {
  iconName: string;
  x: number;
  y: number;
  size: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
  r?: number;
}

const props = withDefaults(defineProps<Props>(), {
  fill: 'currentColor',
  stroke: 'currentColor',
  strokeWidth: '2px',
  x: 0,
  y: 0,
  size: 40,
  r: 10
});

const icon = ref(null);

const fetchIcon = async () => {
  const iconUri = `/function-icons/${props.iconName}.svg`;
  fetch(iconUri)
    .then((response) => response.text())
    .then((htmlText) => {
      // Parse the returned HTML
      const svgParsedDom = new DOMParser().parseFromString(htmlText, 'text/html');

      // Get the 'g' tag (inside the SVG tag)
      const g = svgParsedDom.querySelector('svg')!;

      // Set attributes
      g.setAttribute('fill', props.fill);
      g.setAttribute('stroke', props.stroke);
      g.setAttribute('stroke-width', props.strokeWidth);
      g.setAttribute('width', `${props.size}`);
      g.setAttribute('height', `${props.size}`);

      // Get SVG container on the current Vue component
      const svgContainer = icon.value! as SVGGElement;

      // Clear contents
      svgContainer.innerHTML = '';

      // Add the fetched 'g' element as the middle child
      svgContainer.appendChild(g);
    });
};

onMounted(async () => {
  await fetchIcon();
});

watch(
  () => props.iconName,
  async () => {
    await fetchIcon();
  }
);
</script>

<style lang="scss">
.icon {
  .dither {
    fill: green;
    fill-opacity: 100%;
    stroke: none;
  }

  .separator {
    stroke-opacity: 100%;
    stroke: #fff;
    stroke-width: 2;
  }
}
</style>
