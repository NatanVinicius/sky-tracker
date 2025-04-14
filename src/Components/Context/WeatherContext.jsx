import {
	createContext,
	useContext,
	useState,
	useEffect,
} from 'react';
import { getCityByIp, weatherData } from '../api/api';

export const WeatherContext = createContext();

export const WeatherContextProvider = ({ children }) => {
	const [cityData, setCityData] = useState(null);
	const [weather, setWeather] = useState([]);
	const [loader, setLoader] = useState(true);

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

	const fetchWeatherData = async (city) => {
		setLoader(true);
		try {
			const data = await weatherData(city);
			if (data) {
				setWeather(data);
				setTimeout(() => {
					setLoader(false);
				}, 1000);
			}
		} catch (error) {
			setTimeout(() => {
				setLoader(false);
				setWeather(null);
			}, 1000);
			throw new Error(error);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchCity();
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (cityData) {
			const city = cityData.city;
			fetchWeatherData(city);
		}
	}, [cityData]);

	return (
		<WeatherContext.Provider
			value={{
				fetchCity,
				cityData,
				fetchWeatherData,
				weather,
				loader,
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
};
