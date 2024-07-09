import type { UIElementType } from './UIElementType';
import type { Offset } from './Offset';
import type { Size } from './Size';

export abstract class UIElement {
  public _id: string; // A GUID
  public _type: UIElementType;
  public _parent: UIElement | undefined;
  public _selected: boolean;
  public _location: Offset;
  public _size: Size;
  public _cssClasses: string;

  constructor(id: string, type: UIElementType, location: Offset, size: Size, parent: UIElement | undefined = undefined) {
    this._id = id;
    this._type = type;
    this._parent = parent;
    this._selected = false;
    this._location = location;
    this._size = size;
    this._cssClasses = '';
  }

  public get id() {
    return this._id;
  }

  public get type() {
    return this._type;
  }

  public get parent() {
    return this._parent;
  }

  public set parent(parent: UIElement | undefined) {
    this._parent = parent;
    this.fireUpdate();
  }

  public get cssClasses() {
    return this._cssClasses;
  }

  public set cssClasses(cssClasses: string) {
    this._cssClasses = cssClasses;
    this.fireUpdate();
  }

  public get selected() {
    return this._selected;
  }

  public set selected(selected: boolean) {
    this._selected = selected;
    this.fireUpdate();
  }

  public get location() {
    return this._location;
  }

  public set location(location: Offset) {
    this._location = location;
    this.fireUpdate();
  }

  public get size() {
    return this._size;
  }

  public set size(size: Size) {
    this._size = size;
    this.fireUpdate();
  }

  public getHitElement(offset: Offset): UIElement | undefined {
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

  // Tell the designer that this UI element has updated
  public fireUpdate() {
    // useFlowDesigner().update(this);
  }
}
