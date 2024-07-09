import { UIElement } from './UIElement';
import type { UIElementType } from './UIElementType';
import type { Offset } from './Offset';
import type { Size } from './Size';

export abstract class UILabelledElement extends UIElement {
  public label: string;
  public description: string;

  constructor(label: string, description: string, type: UIElementType, location: Offset, size: Size, parent: UIElement | undefined = undefined) {
    super(type, location, size, parent);
    this.label = label;
    this.description = description;
  }
}
