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

	return (
		<div className='h-screen w-[950px] mx-auto p-10 '>
			<Header
				handleClick={handleClickInput}
				handleChange={handleChangeInput}
				handleKeyDown={handleKeyDown}
				value={inputText}
			/>
			<main className='h-[440px] mt-5 rounded-lg shadow-md'>
				{loader ? (
					<Loader loader={loader} />
				) : (
					<>
						{weather ? (
							<div className='relative max-w-full rounded-lg '>
								<div className='absolute flex justify-center items-center gap-2 top-0 left-0 p-3 rounded-tl-lg rounded-br-lg bg-zinc-300/50'>
									<p>{`${cityData.city}, ${cityData.code}`}</p>
									<img
										src={cityData.flag}
										alt=''
										className='size-5'
									/>
								</div>
								<div className='w-full h-70 rounded-lg bg-zinc-300 '>
									<ApexChart id={0} preciptation={true} />
									<br />
								</div>
							</div>
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
				<div>
					<p>kasdkaskd</p>
				</div>
			</main>
		</div>
	);
};
