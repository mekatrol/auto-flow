import type { Entity } from './entity';

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

export interface IoDefinition extends Entity {
  signalType: IoSignalType;
  signalDirection: IoDirection;
}
