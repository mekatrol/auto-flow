export interface FlowConnection {
  // The unique ID of this connection
  id: string;

  // The connection label (if defined)
  label: string | null;

  // The connection description (if defined)
  description: string | null;

  // ID of the block the connection starts from
  startBlockId: string;

  // The pin number of the input/output that this connection starts from
  startPin: number;

  // ID of the block the connection ends at
  endBlockId: string;

  // The pin number of the input/output that this connection ends at
  endPin: number;
}
