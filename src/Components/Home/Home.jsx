import React, { useContext, useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { Loader } from '../../Hooks/Loader';
import { WeatherContext } from '../Context/WeatherContext'; // Importar o contexto correto
import ApexChart from '../CharTemp.jsx/ApexChart';

export const Home = () => {
	const {
		fetchCity,
		cityData,
		fetchWeatherData,
		weather,
		loader,
	} = useContext(WeatherContext);
	const [inputText, setInputText] = useState('');
	const [weatherPreciptation, setWeatherPreciptation] =
		useState(false);
	const [idWeatherArray, setIdWeatherArray] = useState(0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchCity();
	}, []);

	const handleClickInput = () => {
		try {
			fetchWeatherData(inputText);
		} catch (error) {
			console.log('error');
		}
	};

	const handleChangeInput = (e) => {
		e.preventDefault();
		const value = e.target.value;
		setInputText(value);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			try {
				fetchWeatherData(inputText);
			} catch (error) {
				console.log('error');
			}
		}
	};

	const getDayOfWeek = (dateStr) => {
		const date = new Date(dateStr);
		const day = date.toLocaleDateString('en-US', {
			weekday: 'long',
		});
		return day;
	};

	return (
		<div className='h-screen w-[950px] mx-auto p-10 '>
			<Header
				handleClick={handleClickInput}
				handleChange={handleChangeInput}
				handleKeyDown={handleKeyDown}
				value={inputText}
			/>
			<main className='h-[440px] flex flex-col mt-5 rounded-b-2xl shadow-md'>
				{loader ? (
					<Loader loader={loader} />
				) : (
					<>
						{weather ? (
							<>
								<div
									className={
										weatherPreciptation
											? 'relative max-w-full rounded-t-lg bg-black p-4'
											: 'relative max-w-full rounded-t-lg bg-zinc-300/50 p-4'
									}
								>
									{!inputText && (
										<div
											className={
												weatherPreciptation
													? 'absolute flex justify-center items-center gap-2 top-0 left-0 p-3 rounded-tl-lg rounded-br-lg bg-black/80 text-white'
													: 'absolute flex justify-center items-center gap-2 top-0 left-0 p-3 rounded-tl-lg rounded-br-lg bg-zinc-300/50'
											}
										>
											<p>{`${cityData.city}, ${cityData.code}`}</p>
											<img
												src={cityData.flag}
												alt=''
												className='size-5'
											/>
										</div>
									)}
									<div className='w-full'>
										<ApexChart
											id={idWeatherArray}
											preciptation={weatherPreciptation}
										/>
										<br />
									</div>
									<div className='w-full flex items-center justify-center gap-6'>
										<button
											onClick={() =>
												setWeatherPreciptation(false)
											}
											type='button'
											className='text-white bg-[#F8A43A] hover:bg-[#ff9009] rounded-lg text-sm px-2.5 py-2 cursor-pointer transition-all delay-50'
										>
											Temperature
										</button>
										<button
											onClick={() =>
												setWeatherPreciptation(true)
											}
											type='button'
											className='text-white bg-[#052747] hover:bg-[#051a47] rounded-lg text-sm px-2.5 py-2 cursor-pointer transition-all delay-50'
										>
											Precipitation
										</button>
									</div>
								</div>
								<div className=' flex-1 flex gap-1 rounded-b-2xl bg-[#042848]'>
									{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
									<div
										onClick={() => setIdWeatherArray(0)}
										className='h-full flex-1 flex items-center justify-center gap-4 rounded-bl-2xl bg-[#398FBD] cursor-pointer'
									>
										<div className='flex flex-col gap-2.5'>
											<p className='mt-[-20px] text-center text-white text-8xl'>
												{Math.floor(
													weather.forecast.forecastday[0].day
														.avgtemp_c,
												)}
												°
											</p>
											<div className=' py-1 bg-black/10 rounded-md'>
												<p className='text-center text-white'>
													{getDayOfWeek(
														weather.forecast.forecastday[0].date,
													)}
												</p>
											</div>
										</div>
										<img
											className='size-25'
											src={
												weather.forecast.forecastday[0].day
													.condition.icon
											}
											alt='weather-condition-icon'
										/>
									</div>
									<div className='w-[300px] flex gap-1'>
										{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
										<div
											onClick={() => setIdWeatherArray(1)}
											className='flex-1 h-full p-2.5 flex flex-col items-center justify-between bg-[#F8A33A] cursor-pointer'
										>
											<div className=' px-2 py-1 bg-white/10 rounded-md'>
												<p className='text-center text-white'>
													{getDayOfWeek(
														weather.forecast.forecastday[1].date,
													)}
												</p>
											</div>

											<img
												className='size-15 mt-[-20px]'
												src={
													weather.forecast.forecastday[1].day
														.condition.icon
												}
												alt='weather-condition-icon'
											/>
											<p className='mt-[-20px] text-center text-white text-2xl'>
												{Math.floor(
													weather.forecast.forecastday[1].day
														.avgtemp_c,
												)}
												°
											</p>
										</div>
										{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
										<div
											onClick={() => setIdWeatherArray(2)}
											className='flex-1 h-full p-2.5 flex flex-col items-center justify-between rounded-br-2xl bg-[#398FBD] cursor-pointer'
										>
											<div className=' px-2 py-1 bg-white/10 rounded-md'>
												<p className='text-center text-white'>
													{getDayOfWeek(
														weather.forecast.forecastday[2].date,
													)}
												</p>
											</div>

											<img
												className='size-15 mt-[-20px]'
												src={
													weather.forecast.forecastday[2].day
														.condition.icon
												}
												alt='weather-condition-icon'
											/>
											<p className='mt-[-20px] text-center text-white text-2xl'>
												{Math.floor(
													weather.forecast.forecastday[2].day
														.avgtemp_c,
												)}
												°
											</p>
										</div>
									</div>
								</div>
							</>
						) : (
							<div className='relative max-w-full h-full flex flex-col items-center justify-center gap-6 rounded-lg'>
								<p className='text-6xl text-[#042848] font-extrabold'>
									Ooops
								</p>
								<p className='text-[#042848]'>
									City not found, please check and try again!
								</p>
							</div>
						)}
					</>
				)}
			</main>
		</div>
	);
};
