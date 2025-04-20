import '@mantine/core/styles.css';
import { useEffect } from 'react';
import './App.css';
import WelcomeModal from './components/WelcomeModal/WelcomeModal';
import { MapComponent } from './components/map/MapComponent';
import { getPlayerList } from './components/map/PlayerList';
import { useGlobalStore } from './lib/store/globalStore';
function App() {
  const setPlayerList = useGlobalStore(s => s.setPlayerList);
  const playerListDto = getPlayerList();

  useEffect(() => {
    setPlayerList(playerListDto);
  }, [playerListDto, setPlayerList]);

  // useMapSocket();

  return (
    <>
      <WelcomeModal />
      <MapComponent />
    </>
  );
}

export default App;
