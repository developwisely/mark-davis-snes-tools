import { extendTheme, ThemeConfig, ThemeOverride } from '@chakra-ui/react';
import foundations from './foundations';

const config: ThemeConfig = {
  cssVarPrefix: 'chakra',
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const overrides: ThemeOverride = {
  config,
  ...foundations,
};

export const theme = extendTheme(overrides);
