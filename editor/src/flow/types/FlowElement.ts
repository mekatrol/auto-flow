import type { FlowElementType } from './FlowElementType';
import type { Offset } from './Offset';
import type { Size } from './Size';

// A flow element is a visible object that is selectable

export class FlowElement {
  // True if this element is currently selected
  selected: boolean;

  // The location of the flow element relative to top / left of the screen in SVG view units.
  location: Offset;

  // The size of the flow element relative to top / left of the screen in SVG view units.
  size: Size;

  type: FlowElementType;

  parent: FlowElement | undefined;

  // Additional CSS classes that can be applied to element
  cssClasses: string = '';

  constructor(location: Offset, size: Size, type: FlowElementType, parent?: FlowElement) {
    this.selected = false;
    this.location = location;
    this.size = size;
    this.parent = parent;
    this.type = type;
  }

  public getHitElement(offset: Offset): FlowElement | undefined {
    const hitElement = this.containsOffset(offset) ? this : undefined;
    return hitElement;
  }

  public getBoundingRect(): { left: number; top: number; right: number; bottom: number } {
    // Children offsets are relative to parent, so if this element
    // has a parent then offset by parent element bounds top left
    const parentBounds = this.parent?.getBoundingRect() ?? { left: 0, top: 0, right: 0, bottom: 0 };
    const x = parentBounds.left + this.location.x;
    const y = parentBounds.top + this.location.y;

    return {
      left: x, // left
      top: y, // top
      right: x + this.size.width, // right
      bottom: y + this.size.height // bottom
    };
  }

  // Default implementation just tests bounding box
  public containsOffset(offset: Offset): boolean {
    // Calculate left, right, top and bottom
    const bounds = this.getBoundingRect();

    // Check if offset within bounds (including boundary itself)
    return offset.x >= bounds.left && offset.x <= bounds.right && offset.y >= bounds.top && offset.y <= bounds.bottom;
  }
}
