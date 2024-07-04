import { BlockSide, FunctionBlockType, IoDirection, IoSignalType } from '../models/enums';
import { FlowBlockConnector, FunctionBlock, InputOutput } from '../models/types';
import { v4 as uuidv4 } from 'uuid';

export interface BlockConfiguration {
  attributes: Record<string, any>;
}

export const generateFunctionBlock = (type: FunctionBlockType, data?: BlockConfiguration | undefined): FunctionBlock => {
  switch (type) {
    case FunctionBlockType.And:
      return generateAndBlock(data);
    case FunctionBlockType.Average:
      return generateAverageBlock(data);
    case FunctionBlockType.Calculator:
      return generateCalculatorBlock(data);
    case FunctionBlockType.Calendar:
      return generateCalendarBlock(data);
    case FunctionBlockType.Clamp:
      return generateClampBlock(data);
    case FunctionBlockType.Comparator:
      return generateComparatorBlock(data);
    case FunctionBlockType.Delay:
      return generateDelayBlock(data);
    case FunctionBlockType.If:
      return generateIfBlock(data);
    case FunctionBlockType.Invert:
      return generateInvertBlock(data);
    case FunctionBlockType.Line:
      return generateLineBlock(data);
    case FunctionBlockType.Max:
      return generateMaxBlock(data);
    case FunctionBlockType.Min:
      return generateMinBlock(data);
    case FunctionBlockType.Or:
      return generateOrBlock(data);
    case FunctionBlockType.Override:
      return generateOverrideBlock(data);
    case FunctionBlockType.Pid:
      return generatePidBlock(data);
    case FunctionBlockType.Pulse:
      return generatePulseBlock(data);
    case FunctionBlockType.Schedule:
      return generateScheduleBlock(data);
    case FunctionBlockType.Selector:
      return generateSelectorBlock(data);
    case FunctionBlockType.Sequence:
      return generateSequenceBlock(data);
    case FunctionBlockType.Split:
      return generateSplitBlock(data);
    case FunctionBlockType.Timer:
      return generateTimerBlock(data);
    case FunctionBlockType.Xnor:
      return generateXnorBlock(data);
    case FunctionBlockType.Xor:
      return generateXorBlock(data);
    default:
      throw new Error(`Unknown block type '${type}'`);
  }
};

const generateAndBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return generate2InputBinaryBlock(FunctionBlockType.And, _data);
};

const generateAverageBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return {} as FunctionBlock;
};

const generateCalculatorBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return {} as FunctionBlock;
};

const generateCalendarBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return {} as FunctionBlock;
};

const generateClampBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return {} as FunctionBlock;
};

const generateComparatorBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return {} as FunctionBlock;
};

const generateDelayBlock = (data: BlockConfiguration | undefined): FunctionBlock => {
  return generate1InputBinaryBlock(FunctionBlockType.Delay, data);
};

const generateIfBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return {} as FunctionBlock;
};

const generateInvertBlock = (data: BlockConfiguration | undefined): FunctionBlock => {
  return generate1InputBinaryBlock(FunctionBlockType.Invert, data);
};

const generateLineBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return {} as FunctionBlock;
};

const generateMaxBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return {} as FunctionBlock;
};

const generateMinBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return {} as FunctionBlock;
};

const generateOrBlock = (data: BlockConfiguration | undefined): FunctionBlock => {
  return generate2InputBinaryBlock(FunctionBlockType.Or, data);
};

const generateOverrideBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return {} as FunctionBlock;
};

const generatePidBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return {} as FunctionBlock;
};

const generatePulseBlock = (data: BlockConfiguration | undefined): FunctionBlock => {
  return generate1InputBinaryBlock(FunctionBlockType.Pulse, data);
};

const generateScheduleBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return {} as FunctionBlock;
};

const generateSelectorBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return {} as FunctionBlock;
};

const generateSequenceBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return {} as FunctionBlock;
};

const generateSplitBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return {} as FunctionBlock;
};

const generateTimerBlock = (_data: BlockConfiguration | undefined): FunctionBlock => {
  return {} as FunctionBlock;
};

const generateXnorBlock = (data: BlockConfiguration | undefined): FunctionBlock => {
  return generate1InputBinaryBlock(FunctionBlockType.Xnor, data);
};

const generateXorBlock = (data: BlockConfiguration | undefined): FunctionBlock => {
  return generate1InputBinaryBlock(FunctionBlockType.Xor, data);
};

const generate1InputBinaryBlock = (type: FunctionBlockType, data: BlockConfiguration | undefined): FunctionBlock => {
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
        new InputOutput(IoSignalType.Digital, IoDirection.Input)
      ),
      new FlowBlockConnector(
        uuidv4(),
        'Output',
        `Binary output of ${typeUpper} gate`,
        BlockSide.Left,
        new InputOutput(IoSignalType.Digital, IoDirection.Output)
      )
    ]
  } as FunctionBlock;
};

const generate2InputBinaryBlock = (type: FunctionBlockType, data: BlockConfiguration | undefined): FunctionBlock => {
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
        `Binary input 1 of ${typeUpper} gate`,
        BlockSide.Left,
        new InputOutput(IoSignalType.Digital, IoDirection.Input)
      ),
      new FlowBlockConnector(
        uuidv4(),
        'Input 2',
        `Binary input 2 of ${typeUpper} gate`,
        BlockSide.Left,
        new InputOutput(IoSignalType.Digital, IoDirection.Input)
      ),
      new FlowBlockConnector(
        uuidv4(),
        'Output',
        `Binary output of ${typeUpper} gate`,
        BlockSide.Left,
        new InputOutput(IoSignalType.Digital, IoDirection.Output)
      )
    ]
  } as FunctionBlock;
};
