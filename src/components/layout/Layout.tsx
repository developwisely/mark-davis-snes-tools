import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Flex, HStack, Text } from '@chakra-ui/react';
import { ThemeSwitcher } from '../theme-switcher';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => (
  <Flex direction="column" h="100hv">
    <Box>
      <Text>Header</Text>
      <HStack>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/fish-finder">Fish Finder</RouterLink>
        <RouterLink to="/guides">Guides</RouterLink>
        <RouterLink to="/credits">Credits</RouterLink>
        <ThemeSwitcher />
      </HStack>
    </Box>
    <Container px={4} py={6} maxW={['full', 'container.sm']}>
      {children}
    </Container>
    <Box>Footer</Box>
  </Flex>
);
