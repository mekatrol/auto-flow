import type { FlowBlock } from '@/services/api-generated';
import type { Offset } from './Offset';

export interface FlowConnecting {
  // ID of the block the connection starts from
  startBlock: FlowBlock;

  // The pin number of the input/output that this connection starts from
  startPin: number;

  // The current pointer offset which is the end of the connector
  endLocation: Offset;

  // Used to style connection while in 'connecting' mode
  cssClasses: string;
}
