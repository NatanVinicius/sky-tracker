import React, { useState } from 'react';
import { Header } from '../Header/Header';
import { Loader } from '../../Hooks/Loader';

export const Home = () => {
	const [loader, setLoader] = useState(false);

	return (
		<div className='h-screen w-[950px] mx-auto p-10 '>
			<Header />
			<main className='h-[440px] mt-5 rounded-lg shadow-md'>
				{loader ? (
					<Loader loader={loader} />
				) : (
					<div className='relative max-w-full rounded-lg '>
						<div className='absolute top-0 left-0 p-3 rounded-tl-lg rounded-br-lg bg-zinc-300 opacity-50'>
							<p>Auckland, NZ</p>
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
