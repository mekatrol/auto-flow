<template>
  <!-- Spline path -->
  <g v-if="show">
    <path
      :d="svg"
      fill="none"
      :stroke="lineColor"
      :stroke-width="lineStrokeWidth"
    />
  </g>

  <!-- Spline start / end points -->
  <g
    fill="black"
    v-if="show"
  >
    <circle
      v-for="(p, i) in controlPoints"
      :key="i"
      :fill="colors[i]"
      :cx="p.x"
      :cy="p.y"
      :r="endPointRadius"
    ></circle>

    <circle
      :fill="startPointColor"
      :cx="spline.start.x"
      :cy="spline.start.y"
      :r="startPointRadius"
      @mousedown="(e) => controlPointMouseDown(e, spline.start)"
      @mouseup="(e) => controlPointMouseUp(e, spline.start)"
      @mousemove="(e) => controlPointMouseMove(e, spline.start)"
    ></circle>

    <circle
      :fill="endPointColor"
      :cx="spline.end.x"
      :cy="spline.end.y"
      :r="endPointRadius"
      @mousedown="(e) => controlPointMouseDown(e, spline.end)"
      @mouseup="(e) => controlPointMouseUp(e, spline.end)"
      @mousemove="(e) => controlPointMouseMove(e, spline.end)"
    ></circle>
  </g>
</template>

<script setup lang="ts">
import { BlockSide, type Connection, type Offset } from '@/models/ui/types';
import { computed } from 'vue';

interface Props {
  show?: boolean;

  spline: Connection;

  lineColor?: string;
  lineStrokeWidth?: number | string;

  startPointColor?: string;
  startPointRadius?: number | string;

  endPointColor?: string;
  endPointRadius?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  show: true,
  lineColor: '#333',
  lineStrokeWidth: 3,
  endPointColor: '#daa520',
  startPointRadius: 5,
  startPointColor: 'green',
  endPointRadius: 5
});

let controlPoints: Offset[] = [];
const colors = ['red', 'green', 'blue', 'purple', 'white', 'yellow', 'brown', 'pink'];

const svg = computed(() => {
  const points = generateCubicBezierPoints(props.spline, BlockSide.Right);

  controlPoints = points;

  return cubicBezierToSvg(points);
});

const emit = defineEmits<{
  (e: 'mousedown', mouseEvent: { e: MouseEvent; p: Offset }): void;
  (e: 'mouseup', mouseEvent: { e: MouseEvent; p: Offset }): void;
  (e: 'mousemove', mouseEvent: { e: MouseEvent; p: Offset }): void;
}>();

const controlPointMouseDown = (e: MouseEvent, p: Offset): void => {
  emit('mousedown', { e: e, p: p });
};

const controlPointMouseUp = (e: MouseEvent, p: Offset): void => {
  emit('mouseup', { e: e, p: p });
};

const controlPointMouseMove = (e: MouseEvent, p: Offset): void => {
  emit('mousemove', { e: e, p: p });
};

// Left To Right and Right To Left direction scaling
const DIRECTION_SCALE_LTR = 0.75;
const DIRECTION_SCALE_RTL = 0.4;

const LINE_CURVE_SCALE = 0.75;

// Bezier control point deflection in X and Y directions
const X_DEFLECTION = 200;
const Y_DEFLECTION = 50;
const Y_DEFLECTION_HALF = Y_DEFLECTION / 2;

// This algorithm assumes that start point is always the right hand side of the block
// and the end point is the left hand side of the block. That is, the start
// control point is to the right of start and the end control point is to the left of end.
const generateCubicBezierPoints = (connection: Connection, blockSide: BlockSide): Offset[] => {
  // Y distance between start and end points
  const dy = connection.end.y - connection.start.y;

  // X distance between start and end points
  const dx = connection.end.x - connection.start.x;

  // Straight line distance (hypotenuse) between start and end points
  const delta = Math.sqrt(dy * dy + dx * dx);

  // The connection flow direction based on input (left === -1) vs output (right === 1)
  const xFlowDirection = blockSide === BlockSide.Right ? 1 : -1;

  // Flag to indicate direction of spline mid line (the mid line between the two spline curves):
  //  * -dx, right side: Control point X is to 'right' of start X
  //  * -dx, left  side: Control point X is to 'left'  of start X
  //  * +dx, right side: Control point X is to 'right' of start X
  //  * +dx, left  side: Control point X is to 'left'  of start X
  if (dx * xFlowDirection > 0) {
    return generateSingleCubicBezierPoints(connection, delta, xFlowDirection);
  }

  // The connection mid line flows from right to left so we need a chained bezier
  return generateChainedCubicBezierPoints(connection, dx, dy, xFlowDirection);
};

const generateSingleCubicBezierPoints = (connection: Connection, delta: number, flowDirection: number): Offset[] => {
  let scale = LINE_CURVE_SCALE;

  if (delta < X_DEFLECTION) {
    scale = DIRECTION_SCALE_LTR - DIRECTION_SCALE_LTR * ((X_DEFLECTION - delta) / X_DEFLECTION);
  }

  const controlPoints: Offset[] = [
    // Start point
    connection.start,

    // Control point 1
    { x: connection.start.x + flowDirection * (X_DEFLECTION * scale), y: connection.start.y },

    // Control point 2
    { x: connection.end.x - flowDirection * scale * X_DEFLECTION, y: connection.end.y },

    // End point
    connection.end
  ];

  return controlPoints;
};

const generateChainedCubicBezierPoints = (connection: Connection, dx: number, dy: number, xFlowDirection: number): Offset[] => {
  // Spline is right to left
  let scale = DIRECTION_SCALE_RTL - (DIRECTION_SCALE_RTL / 2) * Math.max(0, (X_DEFLECTION - Math.min(Math.abs(dx), Math.abs(dy))) / X_DEFLECTION);

  // Flow direction top to bottom (1) or bottom to top (-1)
  const yFlowDirection = dy > 0 ? 1 : -1;

  let midX = Math.floor(connection.end.x - dx / 2);
  let midY = Math.floor(connection.end.y - dy / 2);

  if (dy === 0) {
    midY = connection.end.y + Y_DEFLECTION;
  }

  const y1 = (connection.end.y + midY) / 2;
  const topX = connection.start.x + xFlowDirection * X_DEFLECTION * scale;
  const topY = dy > 0 ? Math.min(y1 - dy / 2, connection.start.y + Y_DEFLECTION_HALF) : Math.max(y1 - dy / 2, connection.start.y - Y_DEFLECTION_HALF);
  const bottomX = connection.end.x - xFlowDirection * X_DEFLECTION * scale;
  const bottomY = dy > 0 ? Math.max(y1, connection.end.y - Y_DEFLECTION_HALF) : Math.min(y1, connection.end.y + Y_DEFLECTION_HALF);
  const x1 = (connection.start.x + topX) / 2;

  const controlPoints = [
    // Orig -> Top
    [x1, connection.start.y],
    [topX, dy > 0 ? Math.max(connection.start.y, topY - Y_DEFLECTION_HALF) : Math.min(connection.start.y, topY + Y_DEFLECTION_HALF)],
    // Top -> Mid
    // [Mirror previous cp]
    [x1, dy > 0 ? Math.min(midY, topY + Y_DEFLECTION_HALF) : Math.max(midY, topY - Y_DEFLECTION_HALF)],
    // Mid -> Bottom
    // [Mirror previous cp]
    [bottomX, dy > 0 ? Math.max(midY, bottomY - Y_DEFLECTION_HALF) : Math.min(midY, bottomY + Y_DEFLECTION_HALF)],
    // Bottom -> Dest
    // [Mirror previous cp]
    [(connection.end.x + bottomX) / 2, connection.end.y]
  ];

  if (controlPoints[2][1] === topY + yFlowDirection * Y_DEFLECTION_HALF) {
    if (Math.abs(dy) < Y_DEFLECTION_HALF * 10) {
      controlPoints[1][1] = topY - (yFlowDirection * Y_DEFLECTION_HALF) / 2;
      controlPoints[3][1] = bottomY - (yFlowDirection * Y_DEFLECTION_HALF) / 2;
    }
    controlPoints[2][0] = topX;
  }

  const points: Offset[] = [
    connection.start,
    { x: controlPoints[0][0], y: controlPoints[0][1] },
    { x: controlPoints[1][0], y: controlPoints[1][1] },
    { x: topX, y: topY },
    { x: controlPoints[2][0], y: controlPoints[2][1] },
    { x: midX, y: midY },
    { x: controlPoints[3][0], y: controlPoints[3][1] },
    { x: bottomX, y: bottomY },
    { x: controlPoints[4][0], y: controlPoints[4][1] },
    connection.end
  ];

  return points;
};

const cubicBezierToSvg = (points: Offset[]): string => {
  // 4 points for single bezier and 10 points for chained bezier (4 chained)
  if (points.length != 4 && points.length != 10) {
    // Invalid point count for SVG generation
    return '';
  }

  if (controlPoints.length === 4) {
    return cubicBezierSingleToSvg(controlPoints);
  }

  return cubicBezierChainToSvg(controlPoints);
};

const cubicBezierSingleToSvg = (points: Offset[]): string => {
  // points[0] = start point
  // points[1] = control point 1
  // points[2] = control point 2
  // points[3] = end point
  return `M ${points[0].x} ${points[0].y} C ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y} ${points[3].x} ${points[3].y}`;
};

const cubicBezierChainToSvg = (points: Offset[]): string => {
  const svg =
    `M ${points[0].x} ${points[0].y} ` +
    `C ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y} ${points[3].x} ${points[3].y} ` +
    `S ${points[4].x} ${points[4].y} ${points[5].x} ${points[5].y} ` +
    `S ${points[6].x} ${points[6].y} ${points[7].x} ${points[7].y} ` +
    `S ${points[8].x} ${points[8].y} ${points[9].x} ${points[9].y}`;

  return svg;
};
</script>
