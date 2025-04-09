
import React, { useContext, useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { Loader } from '../../Hooks/Loader';
import { WeatherContext } from '../Context/WeatherContext'; // Importar o contexto correto

export const Home = () => {
	const [loader, setLoader] = useState(true);
	const { fetchCity, cityData } = useContext(WeatherContext);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchCity();
	}, []);

	useEffect(() => {
		if (cityData) {
			setTimeout(() => {
				setLoader(false);
				console.log(cityData);
			}, 2000);
		}
	}, [cityData]);

	return (
		<div className='h-screen w-[950px] mx-auto p-10 '>
			<Header />
			<main className='h-[440px] mt-5 rounded-lg shadow-md'>
				{loader ? (
					<Loader loader={loader} />
				) : (
					<div className='relative max-w-full rounded-lg '>
						<div className='absolute flex justify-center items-center gap-2 top-0 left-0 p-3 rounded-tl-lg rounded-br-lg bg-zinc-300/50'>
							<p>{`${cityData.city}, ${cityData.code}`}</p>
							<img
								src={cityData.flag}
								alt=''
								className='size-5'
							/>
						</div>
						<div className='w-full h-70 rounded-lg bg-amber-500 '>
							{' '}
							<br />
						</div>
					</div>
				)}
			</main>
		</div>
	);
};
