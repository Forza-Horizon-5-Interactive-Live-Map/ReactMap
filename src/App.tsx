import MapPage from './Pages/Map/MapPage';
import './App.css';
import '@mantine/core/styles.css';
import WelcomeModal from './Component/WelcomeModal/WelcomeModal';


function App() {
  return (
		<>
			<WelcomeModal />
			<MapPage />
		</>
	);
}

export default App;
