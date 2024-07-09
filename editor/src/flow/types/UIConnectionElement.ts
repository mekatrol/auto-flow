import type { BlockSide } from './BlockSide';
import { type Offset } from './Offset';
import { UIBlockElement } from './UIBlockElement';
import { UIBlockConnectorElement } from './UIBlockConnectorElement';
import { UILabelledElement } from './UILabelledElement';
import { UIElementType } from './UIElementType';

export class UIConnectionElement extends UILabelledElement {
  _startBlock: UIBlockElement;
  _startBlockConnectorId: string;
  _endBlock: UIBlockElement | undefined;
  _endBlockConnectorId: string | undefined;

  constructor(
    id: string,
    label: string,
    description: string,
    startBlock: UIBlockElement,
    startBlockConnectorId: string,
    endBlock?: UIBlockElement | undefined,
    endBlockConnectorId?: string
  ) {
    super(id, label, description, UIElementType.Connection, { x: 0, y: 0 }, { width: 0, height: 0 }); // Start with no size, will calculate later

    this._startBlock = startBlock;
    this._startBlockConnectorId = startBlockConnectorId;

    this._endBlock = endBlock;
    this._endBlockConnectorId = endBlockConnectorId;
  }

  public get startBlock(): UIBlockElement {
    return this._startBlock;
  }

  public get startBlockConnectorId(): string {
    return this._startBlockConnectorId;
  }

  public getStartOffset(): Offset {
    const startConnector = this._startBlock.flowFunction.connectors.find((c) => c.id == this.startBlockConnectorId)!;
    return {
      x: this._startBlock.location.x + startConnector.location.x,
      y: this._startBlock.location.y + startConnector.location.y + startConnector.size.height / 2
    };
  }

  public getStartSide(): BlockSide {
    const startConnector = this._startBlock.flowFunction.connectors.find((c) => c.id == this.startBlockConnectorId)!;
    return startConnector.side;
  }

  public getStartConnector(): UIBlockConnectorElement {
    return this._startBlock.flowFunction.connectors.find((c) => c.id === this.startBlockConnectorId)!;
  }

  public getEndConnector(): UIBlockConnectorElement | undefined {
    // If no end block then no end block offset
    if (!this._endBlock) {
      return undefined;
    }

    return this._endBlock.flowFunction.connectors.find((c) => c.id === this.endBlockConnectorId)!;
  }

  public get endBlock(): UIBlockElement | undefined {
    // If no end block then no end block offset
    if (!this._endBlock) {
      return undefined;
    }

    return this._endBlock;
  }

  public get endBlockConnectorId(): string | undefined {
    // If no end block then no end block offset
    if (!this._endBlock) {
      return undefined;
    }

    return this._endBlockConnectorId;
  }

  public getEndOffset(): Offset | undefined {
    // If no end block then no end block offset
    if (!this._endBlock) {
      // If no end block then we must be creating a connector so return
      // location (which is set to end off connection offset)
      return this.location;
    }

    const endConnector = this._endBlock.flowFunction.connectors.find((c) => c.id == this.endBlockConnectorId)!;
    return {
      x: this._endBlock.location.x + endConnector.location.x,
      y: this._endBlock.location.y + endConnector.location.y + endConnector.size.height / 2
    };
  }

  public getEndSide(): BlockSide | undefined {
    const endConnector = this.endBlock?.flowFunction.connectors.find((c) => c.id == this.endBlockConnectorId);
    return endConnector?.side;
  }
}
