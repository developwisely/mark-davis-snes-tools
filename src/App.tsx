import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from './theme';
import { Credits, FishFinder, Guides, Home } from './screens';
import { Layout } from './components';

export const App: FC = () => (
  <ChakraProvider theme={theme}>
    <Layout>
      <Routes>
        <Route path="/fish-finder" element={<FishFinder />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  </ChakraProvider>
);
