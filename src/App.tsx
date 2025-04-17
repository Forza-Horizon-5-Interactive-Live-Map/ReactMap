import '@mantine/core/styles.css';
import './App.css';
import useMapSocket from './Hook/useMapSocket';
import WelcomeModal from './components/WelcomeModal/WelcomeModal';
import { MapComponent } from './components/map/MapComponent';
function App() {
  useMapSocket();

  return (
    <>
      <WelcomeModal />
      <MapComponent />
    </>
  );
}

export default App;
