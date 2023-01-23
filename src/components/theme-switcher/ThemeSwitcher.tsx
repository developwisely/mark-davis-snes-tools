import { FC } from 'react';
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export type ThemeSwitcherProps = Omit<IconButtonProps, 'aria-label'>;

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (rest) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      aria-label={`Switch to ${text} mode`}
      color="current"
      fontSize="lg"
      icon={<SwitchIcon />}
      marginLeft="2"
      onClick={toggleColorMode}
      size="md"
      variant="ghost"
      {...rest}
    />
  );
};
