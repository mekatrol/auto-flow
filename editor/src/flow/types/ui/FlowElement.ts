import type { ElementType } from './ElementType';
import type { Offset } from './Offset';
import type { Size } from './Size';
import { useEmitter } from '../../utils/event-emitter';
import { ELEMENT_CHANGED } from '../../constants';

export abstract class FlowElement {
  public _type: ElementType;
  public _parent: FlowElement | undefined;
  public _selected: boolean;
  public _location: Offset;
  public _size: Size;
  public _cssClasses: string;

  constructor(type: ElementType, location: Offset, size: Size, parent: FlowElement | undefined = undefined) {
    this._type = type;
    this._parent = parent;
    this._selected = false;
    this._location = location;
    this._size = size;
    this._cssClasses = '';
  }

  public get type() {
    return this._type;
  }

  public get parent() {
    return this._parent;
  }

  public set parent(parent: FlowElement | undefined) {
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

  // Tell the designer that this UI element has updated
  public fireUpdate() {
    const emitter = useEmitter();
    emitter.emit(ELEMENT_CHANGED, { element: this });
  }
}
