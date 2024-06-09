export interface BlockConnection {
  start: string; // The entity ID of the I/O the connection was started from.
  end: string; // The entity ID of the I/O the connection was routed to.
}
