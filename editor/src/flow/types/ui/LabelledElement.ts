import { FlowElement } from './FlowElement';
import type { ElementType } from './ElementType';
import type { Offset } from './Offset';
import type { Size } from './Size';

export abstract class LabelledElement extends FlowElement {
  public label: string | null;
  public description: string | null;

  constructor(
    label: string | null,
    description: string | null,
    type: ElementType,
    location: Offset,
    size: Size,
    parent: FlowElement | undefined = undefined
  ) {
    super(type, location, size, parent);
    this.label = label;
    this.description = description;
  }
}
