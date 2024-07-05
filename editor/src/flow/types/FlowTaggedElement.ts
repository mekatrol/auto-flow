import { FlowElement } from './FlowElement';
import type { FlowElementType } from './FlowElementType';
import type { Offset } from './Offset';
import type { Size } from './Size';

export class FlowTaggedElement extends FlowElement {
  public id: string; // A GUID
  public label: string;
  public description: string;

  constructor(id: string, label: string, description: string, type: FlowElementType, location?: Offset, size?: Size, parent?: FlowElement) {
    super(location ?? { x: 0, y: 0 }, size ?? { width: 0, height: 0 }, type, parent);
    this.id = id;
    this.label = label;
    this.description = description;
  }
}
