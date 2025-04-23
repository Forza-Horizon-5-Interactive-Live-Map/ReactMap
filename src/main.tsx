import 'leaflet/dist/leaflet.css';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { Toaster } from '@/components/ui/sonner';
import { SidebarLayout } from './components/sidebar/Sidebar.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SidebarLayout>
    <Toaster />
    <App />
  </SidebarLayout>,
);
