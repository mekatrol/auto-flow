export interface FlowConnection {
  // The unique ID of this connection
  id: string;

  // The connection label (if defined)
  label: string | null;

  // The connection description (if defined)
  description: string | null;

  // The ID of the input/output that this connection starts from
  startInputOutputId: string;

  // The ID of the input/output that this connection ends at
  endInputOutputId: string;
}
