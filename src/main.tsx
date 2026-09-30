import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MaxUI } from '@maxhub/max-ui';
import 'normalize.css';
import '@maxhub/max-ui/dist/styles.css';
import App from './App.tsx'

import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	<MaxUI>
	  <App />
	</MaxUI>
  </StrictMode>,
)
