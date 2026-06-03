import { UIProvider } from '@/context/UIContext';
import AppRouter from '@/router';
import '@/styles/main.scss';

const App = () => (
  <UIProvider>
    <AppRouter />
  </UIProvider>
);

export default App;
