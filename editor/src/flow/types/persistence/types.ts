import type { FunctionType } from '../function/FunctionType';
import type { InputOutputDirection } from '../function/InputOutputDirection';
import type { InputOutputSignalType } from '../function/InputOutputSignalType';
import type { Offset } from '../ui/Offset';
import type { Size } from '../ui/Size';

export interface IFlowInputOutput {
  // The unique ID of this input/output
  id: string;

  // The input/output label (if defined)
  label: string | null;

  // The input/output description (if defined)
  description: string | null;

  // The type of signal for this input/output
  signalType: InputOutputSignalType;

  // The direction for this input/output relative to the block it belongs to
  direction: InputOutputDirection;
}

export interface IFlowBlock {
  // The unique ID of this block
  id: string;

  // The block label (if defined)
  label: string | null;

  // The block description (if defined)
  description: string;

  // The block function type
  type: FunctionType;

  // The input / outputs for this block
  io: IFlowInputOutput[];
}

export interface IFlowConnection {
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

export interface IFlowBlockElement {
  // The ID of the flow function that this block represents
  functionId: string;
  location: Offset;
  size: Size;
}

export interface IFlowConnectionElement {
  // The ID of the flow connection that this block represents
  connectionId: string;
}

export interface IFlowFunctionality {
  blocks: IFlowBlock[];
  connections: IFlowConnection[];
}

export interface IFlowElements {
  blocks: IFlowBlockElement[];
  connections: IFlowConnectionElement[];
}

// For every flow there are two aspects:
// - the functionality, e.g. flow function, input/output, connection
// - the elements for the visual representation of that functionality, e.g. location, size, theme, etc
//
// The functionality of a flow can be used independent of the UI aspects of the flow, e.g.
// can be uploaded to a controller (esp32, Raspberry PI pico, arduino, etc)
export interface IFlow {
  functionality: IFlowFunctionality;
  elements: IFlowElements;
}
