import { UIFlowElement } from './UIFlowElement';
import type { UIElementType } from './UIElementType';
import type { Offset } from './Offset';
import type { Size } from './Size';

export abstract class UILabelledElement extends UIFlowElement {
  public label: string;
  public description: string;

  constructor(
    id: string,
    label: string,
    description: string,
    type: UIElementType,
    location: Offset,
    size: Size,
    parent: UIFlowElement | undefined = undefined
  ) {
    super(id, type, location, size, parent);
    this.label = label;
    this.description = description;
  }
}
