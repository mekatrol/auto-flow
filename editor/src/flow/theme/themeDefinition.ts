import { FunctionType } from '../types/FunctionType';

export interface ElementStyles {
  color: string;
  fill: string;
  fillOpacity: string;
  stroke: string;
  strokeWidth: string;
  radius: number;
}

export interface IconBackgroundStyle {
  fill: string;
  opacity: string;
}

export interface IconSvgStyle {
  fill: string;
  opacity: string;
  stroke: string;
  strokeWidth: string;
}

export interface IconStyle {
  background: IconBackgroundStyle;
  svg: IconSvgStyle;
}

export type ThemeDefinition = {
  blockStyles: ElementStyles;
  blockIconStyles: IconStyle;
  blockFunctionLabelStyles: ElementStyles;
  blockLabelStyles: ElementStyles;
  blockConnectorStyles: ElementStyles;
  connectionStyles: ElementStyles;
};

export const defaultTheme: ThemeDefinition = {
  blockStyles: {
    color: '#eee',
    fill: '#333',
    fillOpacity: '100%',
    stroke: '#a0a0a0',
    strokeWidth: '2px',
    radius: 3
  },
  blockIconStyles: {
    background: {
      fill: '#3333ff',
      opacity: '70%'
    },

    svg: {
      fill: '#fff',
      opacity: '100%',
      stroke: '#ddd',
      strokeWidth: '10px'
    }
  },
  blockFunctionLabelStyles: {
    color: '#eee',
    fill: '#333',
    fillOpacity: '100%',
    stroke: '#aa1010',
    strokeWidth: '3px',
    radius: 3
  },
  blockLabelStyles: {
    color: '#eee',
    fill: '#333',
    fillOpacity: '100%',
    stroke: '#aa1010',
    strokeWidth: '3px',
    radius: 3
  },
  blockConnectorStyles: {
    color: '#eee',
    fill: '#333',
    fillOpacity: '100%',
    stroke: '#fff',
    strokeWidth: '1px',
    radius: 3
  },
  connectionStyles: {
    color: '#eee',
    fill: 'none',
    fillOpacity: '100%',
    stroke: '#eeeeee',
    strokeWidth: '3px',
    radius: 1
  }
};

export const getBlockTheme = (type: FunctionType): ThemeDefinition => {
  switch (type) {
    case FunctionType.And:
      return defaultTheme;
    case FunctionType.Average:
      return defaultTheme;
    case FunctionType.Calculator:
      return defaultTheme;
    case FunctionType.Calendar:
      return defaultTheme;
    case FunctionType.Clamp:
      return defaultTheme;
    case FunctionType.Comparator:
      return defaultTheme;
    case FunctionType.Delay:
      return defaultTheme;
    case FunctionType.If:
      return defaultTheme;
    case FunctionType.Invert:
      return defaultTheme;
    case FunctionType.Max:
      return defaultTheme;
    case FunctionType.Min:
      return defaultTheme;
    case FunctionType.Or:
      return defaultTheme;
    case FunctionType.Override:
      return defaultTheme;
    case FunctionType.Pid:
      return defaultTheme;
    case FunctionType.Pulse:
      return defaultTheme;
    case FunctionType.Schedule:
      return defaultTheme;
    case FunctionType.Selector:
      return defaultTheme;
    case FunctionType.Sequence:
      return defaultTheme;
    case FunctionType.Span:
      return defaultTheme;
    case FunctionType.Split:
      return defaultTheme;
    case FunctionType.Timer:
      return defaultTheme;
    case FunctionType.Xnor:
      return defaultTheme;
    case FunctionType.Xor:
      return defaultTheme;
    default:
      return defaultTheme;
  }
};
