import type { Ref } from 'vue';
import type { UIBlockElement } from './UIBlockElement';

export class ZOrder {
  private _blocks: Ref<UIBlockElement[]>;

  constructor(blocks: Ref<UIBlockElement[]>) {
    this._blocks = blocks;
  }

  private sequenceZOrder = (): void => {
    let nextZOrder = 1;
    this._blocks.value.forEach((block) => {
      block.zOrder = nextZOrder;
      nextZOrder += 1;
    });
  };

  public sort = (): void => {
    this._blocks.value.sort((a: UIBlockElement, b: UIBlockElement) => a.z + a.zBoost - (b.z + b.zBoost));
    this.sequenceZOrder();
  };

  private moveToFront = (selected: UIBlockElement): void => {
    if (!selected || !this._blocks || !this._blocks.value) {
      return;
    }

    let maxZ = 0;
    this._blocks.value.forEach((block) => {
      if (block.z > maxZ) {
        maxZ = block.z;
      }
    });

    selected.zOrder = maxZ + 1;

    this.sort();
  };

  private moveForward = (selected: UIBlockElement): void => {
    if (!selected || !this._blocks || !this._blocks.value) {
      return;
    }

    // Make sure z-order sequential
    this.sort();

    const swapWith = this._blocks.value.find((block) => block.z == selected.z + 1);
    if (swapWith) {
      swapWith.zOrder--;
      selected.zOrder++;
    }
  };

  private moveBackward = (selected: UIBlockElement): void => {
    if (!selected || !this._blocks || !this._blocks.value) {
      return;
    }

    // Make sure z-order sequential
    this.sort();

    const swapWith = this._blocks.value.find((block) => block.z == selected.z - 1);
    if (swapWith) {
      swapWith.zOrder++;
      selected.zOrder--;
    }
  };

  private moveToBack = (selected: UIBlockElement): void => {
    if (!selected || !this._blocks || !this._blocks.value) {
      return;
    }

    let minZ = 0;
    this._blocks.value.forEach((block) => {
      if (block.z < minZ) {
        minZ = block.z;
      }
    });

    selected.zOrder = minZ - 1;

    this.sort();
  };

  public moveBlockZOrder = (action: string, selected: UIBlockElement): void => {
    switch (action) {
      case 'moveToFront':
        this.moveToFront(selected);
        break;

      case 'moveForward':
        this.moveForward(selected);
        break;

      case 'moveBackward':
        this.moveBackward(selected);
        break;

      case 'moveToBack':
        this.moveToBack(selected);
        break;

      default:
        return;
    }
  };
}
