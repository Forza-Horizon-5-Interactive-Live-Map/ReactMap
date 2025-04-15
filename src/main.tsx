import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { MantineProvider } from '@mantine/core';
import { SidebarLayout } from './components/sidebar/Sidebar.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SidebarLayout>
    <MantineProvider>
      <App />
    </MantineProvider>
  </SidebarLayout>,
);
