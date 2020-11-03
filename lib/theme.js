import { theme as chakraTheme } from '@chakra-ui/core';

const fonts = {
  ...chakraTheme.fonts,
  heading: 'var(--f-Chivo)',
  mono: `'Menlo', monospace`,
};

const breakpoints = [
  '20rem',
  '23.375rem',
  '25rem',
  '36rem',
  '48rem',
  '62rem',
  '75rem',
  '87.5rem',
  '90.063rem',
];

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    black: '#16161D',
  },
  fonts,
  breakpoints,
};

export default theme;
