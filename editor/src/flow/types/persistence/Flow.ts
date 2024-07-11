import type { FlowElements } from './FlowElements';
import type { FlowFunctionality } from './FlowFunctionality';

// For every flow there are two aspects:
// - the functionality, e.g. flow function, input/output, connection
// - the elements for the visual representation of that functionality, e.g. location, size, theme, etc
//
// The functionality of a flow can be used independent of the UI aspects of the flow, e.g.
// can be uploaded to a controller (esp32, Raspberry PI pico, arduino, etc)

export interface Flow {
  functionality: FlowFunctionality;
  elements: FlowElements;
}
