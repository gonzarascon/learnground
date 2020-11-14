import { theme as chakraTheme, extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = {
  ...chakraTheme.fonts,
  heading: 'var(--f-Chivo)',
  mono: `'Menlo', monospace`,
};

const breakpoints = createBreakpoints({
  xxxs: '20rem',
  xxs: '23.375rem',
  xs: '25rem',
  sm: '36rem',
  md: '48rem',
  lg: '62rem',
  xl: '75rem',
  xxl: '87.5rem',
  xxxl: '90.063rem',
});

const overrides = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    black: '#16161D',
  },
  fonts,
  breakpoints,
};

export default extendTheme(overrides);
