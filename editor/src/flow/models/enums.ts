// Input output signal type
export enum IoSignalType {
  Analogue = 'Analogue',
  Digital = 'Digital',
  PWM = 'PWM' // Pulse Width Modulated
}

// Input output direction
export enum IoDirection {
  Input = 'Input',
  Output = 'Output'
}

export enum BlockSide {
  Left = 'Left',
  Right = 'Right'
}

export enum FunctionBlockType {
  And = 'And',
  Average = 'Average',
  Calculator = 'Calculator',
  Calendar = 'Calendar',
  Clamp = 'Clamp',
  Comparator = 'Comparator',
  Delay = 'Delay',
  If = 'If',
  Invert = 'Invert',
  Line = 'Line',
  Max = 'Max',
  Min = 'Min',
  Or = 'Or',
  Override = 'Override',
  Pid = 'Pid',
  Pulse = 'Pulse',
  Schedule = 'Schedule',
  Selector = 'Selector',
  Sequence = 'Sequence',
  Split = 'Split',
  Timer = 'Timer',
  Xnor = 'Xnor',
  Xor = 'Xor'
}
