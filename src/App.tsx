import './App.css';
import useMapSocket from './Hook/useMapSocket';
import { WelcomeDialog } from './components/WelcomDialog/welcomeDialog';
import { MapComponent } from './components/map/MapComponent';
function App() {
  // const setPlayerList = useGlobalStore(s => s.setPlayerList);
  // const playerListDto = getPlayerList();

  // useEffect(() => {
  //   setPlayerList(playerListDto);
  // }, [playerListDto, setPlayerList]);

  useMapSocket();

  return (
    <>
      <WelcomeDialog />
      <MapComponent />
    </>
  );
}

export default App;
