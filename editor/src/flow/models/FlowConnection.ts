import type { BlockSide } from './BlockSide';
import { FlowElement } from './FlowElement';
import { type Offset } from './Offset';
import { FlowBlockElement } from './FlowBlockElement';
import { FlowBlockConnector } from './FlowBlockConnector';

// A flow connection element is a flow element that has start and end block connectors

export class FlowConnection extends FlowElement {
  public id: string; // A GUID
  public label: string;
  public description: string;

  _startBlock: FlowBlockElement;
  _startBlockConnectorId: string;
  _endBlock: FlowBlockElement | undefined;
  _endBlockConnectorId: string | undefined;

  constructor(
    id: string,
    label: string,
    description: string,
    startBlock: FlowBlockElement,
    startBlockConnectorId: string,
    endBlock?: FlowBlockElement | undefined,
    endBlockConnectorId?: string
  ) {
    super({ x: 0, y: 0 }, { width: 0, height: 0 }); // Start with no size, will calculate later
    this.id = id;
    this.label = label;
    this.description = description;
    this.selected = false;

    this._startBlock = startBlock;
    this._startBlockConnectorId = startBlockConnectorId;

    this._endBlock = endBlock;
    this._endBlockConnectorId = endBlockConnectorId;
  }

  public get startBlock(): FlowBlockElement {
    return this._startBlock;
  }

  public get startBlockConnectorId(): string {
    return this._startBlockConnectorId;
  }

  public getStartOffset(): Offset {
    const startConnector = this._startBlock.function.connectors.find((c) => c.id == this.startBlockConnectorId)!;
    return {
      x: this._startBlock.location.x + startConnector.location.x,
      y: this._startBlock.location.y + startConnector.location.y + startConnector.size.height / 2
    };
  }

  public getStartSide(): BlockSide {
    const startConnector = this._startBlock.function.connectors.find((c) => c.id == this.startBlockConnectorId)!;
    return startConnector.side;
  }

  public getStartConnector(): FlowBlockConnector {
    return this._startBlock.function.connectors.find((c) => c.id === this.startBlockConnectorId)!;
  }

  public getEndConnector(): FlowBlockConnector | undefined {
    // If no end block then no end block offset
    if (!this._endBlock) {
      return undefined;
    }

    return this._endBlock.function.connectors.find((c) => c.id === this.endBlockConnectorId)!;
  }

  public get endBlock(): FlowBlockElement | undefined {
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
      return undefined;
    }

    const endConnector = this._endBlock.function.connectors.find((c) => c.id == this.endBlockConnectorId)!;
    return {
      x: this._endBlock.location.x + endConnector.location.x,
      y: this._endBlock.location.y + endConnector.location.y + endConnector.size.height / 2
    };
  }

  public getEndSide(): BlockSide | undefined {
    const endConnector = this.endBlock?.function.connectors.find((c) => c.id == this.endBlockConnectorId);
    return endConnector?.side;
  }
}
