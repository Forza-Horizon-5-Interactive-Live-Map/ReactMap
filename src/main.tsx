import 'leaflet/dist/leaflet.css';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { Toaster } from '@/components/ui/sonner';
import { MantineProvider } from '@mantine/core';
import { SidebarLayout } from './components/sidebar/Sidebar.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SidebarLayout>
    <MantineProvider>
      <Toaster />
      <App />
    </MantineProvider>
  </SidebarLayout>,
);
