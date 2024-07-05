import { FunctionType } from '../models/FunctionType';
import { BlockSide } from '../models/BlockSide';
import { InputOutputDirection } from '../models/InputOutputDirection';
import { InputOutputSignalType } from '../models/InputOutputSignalType';
import { InputOutput } from '../models/InputOutput';
import { FlowBlockConnector } from '../models/FlowBlockConnector';
import { FlowFunction } from '../models/FlowFunction';
import { v4 as uuidv4 } from 'uuid';

export interface BlockConfiguration {
  attributes: Record<string, any>;
}

export const generateFunctionBlock = (type: FunctionType, data?: BlockConfiguration | undefined): FlowFunction => {
  switch (type) {
    case FunctionType.And:
      return generateAndBlock(data);
    case FunctionType.Average:
      return generateAverageBlock(data);
    case FunctionType.Calculator:
      return generateCalculatorBlock(data);
    case FunctionType.Calendar:
      return generateCalendarBlock(data);
    case FunctionType.Clamp:
      return generateClampBlock(data);
    case FunctionType.Comparator:
      return generateComparatorBlock(data);
    case FunctionType.Delay:
      return generateDelayBlock(data);
    case FunctionType.If:
      return generateIfBlock(data);
    case FunctionType.Invert:
      return generateInvertBlock(data);
    case FunctionType.Line:
      return generateLineBlock(data);
    case FunctionType.Max:
      return generateMaxBlock(data);
    case FunctionType.Min:
      return generateMinBlock(data);
    case FunctionType.Or:
      return generateOrBlock(data);
    case FunctionType.Override:
      return generateOverrideBlock(data);
    case FunctionType.Pid:
      return generatePidBlock(data);
    case FunctionType.Pulse:
      return generatePulseBlock(data);
    case FunctionType.Schedule:
      return generateScheduleBlock(data);
    case FunctionType.Selector:
      return generateSelectorBlock(data);
    case FunctionType.Sequence:
      return generateSequenceBlock(data);
    case FunctionType.Split:
      return generateSplitBlock(data);
    case FunctionType.Timer:
      return generateTimerBlock(data);
    case FunctionType.Xnor:
      return generateXnorBlock(data);
    case FunctionType.Xor:
      return generateXorBlock(data);
    default:
      throw new Error(`Unknown block type '${type}'`);
  }
};

const generateAndBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return generate2InputBinaryBlock(FunctionType.And, _data);
};

const generateAverageBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return {} as FlowFunction;
};

const generateCalculatorBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return {} as FlowFunction;
};

const generateCalendarBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return {} as FlowFunction;
};

const generateClampBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return {} as FlowFunction;
};

const generateComparatorBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return {} as FlowFunction;
};

const generateDelayBlock = (data: BlockConfiguration | undefined): FlowFunction => {
  return generate1InputBinaryBlock(FunctionType.Delay, data);
};

const generateIfBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return {} as FlowFunction;
};

const generateInvertBlock = (data: BlockConfiguration | undefined): FlowFunction => {
  return generate1InputBinaryBlock(FunctionType.Invert, data);
};

const generateLineBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return {} as FlowFunction;
};

const generateMaxBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return {} as FlowFunction;
};

const generateMinBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return {} as FlowFunction;
};

const generateOrBlock = (data: BlockConfiguration | undefined): FlowFunction => {
  return generate2InputBinaryBlock(FunctionType.Or, data);
};

const generateOverrideBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return {} as FlowFunction;
};

const generatePidBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return {} as FlowFunction;
};

const generatePulseBlock = (data: BlockConfiguration | undefined): FlowFunction => {
  return generate1InputBinaryBlock(FunctionType.Pulse, data);
};

const generateScheduleBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return {} as FlowFunction;
};

const generateSelectorBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return {} as FlowFunction;
};

const generateSequenceBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return {} as FlowFunction;
};

const generateSplitBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return {} as FlowFunction;
};

const generateTimerBlock = (_data: BlockConfiguration | undefined): FlowFunction => {
  return {} as FlowFunction;
};

const generateXnorBlock = (data: BlockConfiguration | undefined): FlowFunction => {
  return generate1InputBinaryBlock(FunctionType.Xnor, data);
};

const generateXorBlock = (data: BlockConfiguration | undefined): FlowFunction => {
  return generate1InputBinaryBlock(FunctionType.Xor, data);
};

const generate1InputBinaryBlock = (type: FunctionType, data: BlockConfiguration | undefined): FlowFunction => {
  const typeUpper = type.toString().toUpperCase();

  return {
    id: data?.attributes['id'] ?? uuidv4(),
    label: data?.attributes['label'] ?? '',
    description: data?.attributes['description'] ?? '',
    type: type,
    connectors: [
      new FlowBlockConnector(
        uuidv4(),
        'Input 1',
        `Binary input of ${typeUpper} gate`,
        BlockSide.Left,
        new InputOutput(InputOutputSignalType.Digital, InputOutputDirection.Input)
      ),
      new FlowBlockConnector(
        uuidv4(),
        'Output',
        `Binary output of ${typeUpper} gate`,
        BlockSide.Left,
        new InputOutput(InputOutputSignalType.Digital, InputOutputDirection.Output)
      )
    ]
  } as FlowFunction;
};

const generate2InputBinaryBlock = (type: FunctionType, data: BlockConfiguration | undefined): FlowFunction => {
  const typeUpper = type.toString().toUpperCase();

  return {
    id: data?.attributes['id'] ?? uuidv4(),
    label: data?.attributes['label'] ?? typeUpper,
    description: data?.attributes['description'] ?? '',
    type: type,
    connectors: [
      new FlowBlockConnector(
        uuidv4(),
        'Input 1',
        `Binary input 1 of ${typeUpper} gate`,
        BlockSide.Left,
        new InputOutput(InputOutputSignalType.Digital, InputOutputDirection.Input)
      ),
      new FlowBlockConnector(
        uuidv4(),
        'Input 2',
        `Binary input 2 of ${typeUpper} gate`,
        BlockSide.Left,
        new InputOutput(InputOutputSignalType.Digital, InputOutputDirection.Input)
      ),
      new FlowBlockConnector(
        uuidv4(),
        'Output',
        `Binary output of ${typeUpper} gate`,
        BlockSide.Right,
        new InputOutput(InputOutputSignalType.Digital, InputOutputDirection.Output)
      )
    ]
  } as FlowFunction;
};
