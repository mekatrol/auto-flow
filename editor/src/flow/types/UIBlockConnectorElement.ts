import { BLOCK_CONNECTOR_SIZE } from '../constants';
import type { BlockSide } from './BlockSide';
import { UILabelledElement } from './UILabelledElement';
import { UIElementType } from './UIElementType';
import { FlowFunctionConnector } from './FlowFunctionConnector';

export class UIBlockConnectorElement extends UILabelledElement {
  connector: FlowFunctionConnector;
  side: BlockSide;

  constructor(label: string, description: string, side: BlockSide, connector: FlowFunctionConnector) {
    super(label, description, UIElementType.BlockConnector, { x: 0, y: 0 }, { width: BLOCK_CONNECTOR_SIZE, height: BLOCK_CONNECTOR_SIZE });
    this.connector = connector;
    this.side = side;
  }
}
