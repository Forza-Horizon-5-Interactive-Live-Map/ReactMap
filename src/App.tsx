import '@mantine/core/styles.css';
import './App.css';
import WelcomeModal from './components/WelcomeModal/WelcomeModal';
import { MapComponent } from './components/map/MapComponent';

function App() {
  return (
    <>
      <WelcomeModal />
      <MapComponent />
    </>
  );
}

export default App;
