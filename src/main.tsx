import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
	white: '#F5ECDC',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
		<MantineProvider theme={theme}>
			<App />
		</MantineProvider>
);
