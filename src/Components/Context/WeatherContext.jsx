import {
	createContext,
	useContext,
	useState,
	useEffect,
} from 'react';
import { getCityByIp } from '../api/api';

export const WeatherContext = createContext();

export const WeatherContextProvider = ({ children }) => {
	const [cityData, setCityData] = useState(null);
	const [weather, setWeather] = useState([]);

	const fetchCity = async () => {
		try {
			const data = await getCityByIp();
			if (data) {
				setCityData(data);
			}
		} catch (error) {
			throw new Error(error);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchCity();
	}, []);

	return (
		<WeatherContext.Provider value={{ fetchCity, cityData }}>
			{children}
		</WeatherContext.Provider>
	);
};
