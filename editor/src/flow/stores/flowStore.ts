import { defineStore } from 'pinia';
import type { FunctionConfiguration } from '../types/FunctionConfiguration';
import { InputOutputSignalType } from '../types/InputOutputSignalType';
import { InputOutputDirection } from '../types/InputOutputDirection';
import { BlockSide } from '../types/ui/BlockSide';

const functionConfigurations: FunctionConfiguration[] = [
  {
    type: 'AND',
    label: 'AND',
    description: 'An boolean logic AND gate',
    io: [
      {
        pin: 1,
        label: 'AND Input 1',
        description: 'AND gate input number 1',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: 'AND Input 2',
        description: 'AND gate input number 2',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: 'AND Output',
        description: 'AND gate output',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: 'AND Output (Inverted)',
        description: 'The inverted AND gate output',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'AVERAGE',
    label: 'Average',
    description: 'Calculates the average of the two input values',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'CALCULATOR',
    label: 'Calculator',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'CALENDAR',
    label: 'Calendar',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'CLAMP',
    label: 'Clamp',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'COMPARATOR',
    label: 'Comparator',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'DELAY',
    label: 'Delay',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'IF',
    label: 'If',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'LATCH',
    label: 'Latch',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'MAX',
    label: 'Max',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'MIN',
    label: 'Min',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'NOT',
    label: 'NOT',
    description: 'Inverts the input boolean value, 0 -> 1 and 1 -> 0',
    io: [
      {
        pin: 1,
        label: 'Input',
        description: 'The NOT gate input',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: 'Output',
        description: 'The inverted output',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'OR',
    label: 'OR',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'OVERRIDE',
    label: 'Override',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'PID',
    label: 'PID',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'PULSE',
    label: 'Pulse',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'SCHEDULE',
    label: 'Schedule',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'SELECTOR',
    label: 'Selector',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'SEQUENCE',
    label: 'Sequence',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'SPAN',
    label: 'Span',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'SPLIT',
    label: 'Split',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'TIMER',
    label: 'Timer',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'XNOR',
    label: 'XNOR',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      }
    ]
  },
  {
    type: 'XOR',
    label: 'XOR',
    description: '',
    io: [
      {
        pin: 1,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 2,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Input,
        side: BlockSide.Left
      },
      {
        pin: 3,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
      },
      {
        pin: 4,
        label: '',
        description: '',
        type: InputOutputSignalType.Digital,
        direction: InputOutputDirection.Output,
        side: BlockSide.Right
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
