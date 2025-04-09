import { useContext, useEffect } from 'react';
import { Home } from './Components/Home/Home';
import { WeatherContextProvider } from './Components/Context/WeatherContext';

function App() {
	return (
		<WeatherContextProvider>
			<div className='bg-[#dadada]'>
				<Home />
			</div>
		</WeatherContextProvider>
	);
}

export default App;
