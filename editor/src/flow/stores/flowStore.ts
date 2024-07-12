import { defineStore } from 'pinia';
import type { BlockFunctionConfiguration } from '../types/BlockFunctionConfiguration';
import { InputOutputSignalType } from '../types/InputOutputSignalType';
import { InputOutputDirection } from '../types/InputOutputDirection';
import { BlockSide } from '../types/BlockSide';
import { BLOCK_HEIGHT, BLOCK_IO_SIZE, BLOCK_WIDTH } from '../constants';

const functionConfigurations: BlockFunctionConfiguration[] = [
  {
    type: 'AND',
    label: 'AND',
    description: 'An boolean logic AND gate',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: 'AND Input 1',
        description: 'AND gate input number 1',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: 'AND Input 2',
        description: 'AND gate input number 2',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: 'AND Output',
        description: 'AND gate output',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: 'AND Output (Inverted)',
        description: 'The inverted AND gate output',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'AVERAGE',
    label: 'Average',
    description: 'Calculates the average of the two input values',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'CALCULATOR',
    label: 'Calculator',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'CALENDAR',
    label: 'Calendar',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'CLAMP',
    label: 'Clamp',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'COMPARATOR',
    label: 'Comparator',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'DELAY',
    label: 'Delay',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'IF',
    label: 'If',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'LATCH',
    label: 'Latch',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'MAX',
    label: 'Max',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'MIN',
    label: 'Min',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'NOT',
    label: 'NOT',
    description: 'Inverts the input boolean value, 0 -> 1 and 1 -> 0',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: 'Input',
        description: 'The NOT gate input',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: 'Output',
        description: 'The inverted output',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'OR',
    label: 'OR',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'OVERRIDE',
    label: 'Override',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'PID',
    label: 'PID',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'PULSE',
    label: 'Pulse',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'SCHEDULE',
    label: 'Schedule',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'SELECTOR',
    label: 'Selector',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'SEQUENCE',
    label: 'Sequence',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'SPAN',
    label: 'Span',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'SPLIT',
    label: 'Split',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'TIMER',
    label: 'Timer',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'TRANSITION',
    label: 'Transition',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: 'Transition input',
        description: 'Input to used detect transition',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: 'Transition reset',
        description: 'Used to reset transition state',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: 'Transition output',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: 'Transition output inverted',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'XNOR',
    label: 'XNOR',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  },
  {
    type: 'XOR',
    label: 'XOR',
    description: '',
    size: { width: BLOCK_WIDTH, height: BLOCK_HEIGHT },
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right,
        location: { x: 0, y: 0 },
        size: { width: BLOCK_IO_SIZE, height: BLOCK_IO_SIZE }
      }
    ]
  }
];

const flowElements: Record<string, any> = {};

const clearElements = (): void => {
  for (const key in flowElements) {
    delete flowElements[key];
  }
};

export const useFlowStore = defineStore('flow', () => {
  return { elements: flowElements, clearElements, functionConfigurations };
});
