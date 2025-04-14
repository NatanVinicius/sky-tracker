import { useEffect, useState } from 'react';
import { Logo } from '../../assets/logo';
import SplitText from '../Effects/SplitText';

export const Header = ({
	handleClick,
	handleChange,
	handleKeyDown,
	value,
}) => {
	const GREETINGS = [
		{
			start: 0,
			end: 6,
			message: { first: 'Good', second: 'Night' },
		},
		{
			start: 7,
			end: 11,
			message: { first: 'Good', second: 'Morning' },
		},
		{
			start: 12,
			end: 17,
			message: { first: 'Good', second: 'Afertnoon' },
		},
		{
			start: 18,
			end: 23,
			message: { first: 'Good', second: 'Evening' },
		},
	];
	const [greeting, setGreeting] = useState({});

	useEffect(() => {
		const getGreeting = () => {
			const hour = new Date().getHours();
			const range = GREETINGS.find(
				({ start, end }) => hour >= start && hour <= end,
			);
			return range?.message ?? 'Invalid hour';
		};
		const range = getGreeting();

		setGreeting(range);
	}, []);

	return (
		<div className='h-[90px] flex justify-between'>
			<div className='flex flex-col items-start'>
				<SplitText
					text={greeting?.first || 'Ola'}
					className='text-[#042848] text-4xl tracking-widest font-extrabold text-center'
					delay={150}
					animationFrom={{
						opacity: 0,
						transform: 'translate3d(0,50px,0)',
					}}
					animationTo={{
						opacity: 1,
						transform: 'translate3d(0,0,0)',
					}}
					easing='easeOutCubic'
					threshold={0.2}
					rootMargin='-50px'
					// onLetterAnimationComplete={handleAnimationComplete}
				/>
				<SplitText
					text={greeting?.second || 'Tudo bem?'}
					className='text-[#042848] text-4xl pb-1 tracking-widest font-extrabold text-center'
					delay={150}
					animationFrom={{
						opacity: 0,
						transform: 'translate3d(0,50px,0)',
					}}
					animationTo={{
						opacity: 1,
						transform: 'translate3d(0,0,0)',
					}}
					easing='easeOutCubic'
					threshold={0.2}
					rootMargin='-50px'
					// onLetterAnimationComplete={handleAnimationComplete}
				/>
			</div>
			<div className='h-full w-[40%] flex items-end'>
				<form className='w-full'>
					<label
						htmlFor='search'
						className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
					>
						Search
					</label>
					<div className='relative'>
						<div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
							<svg
								className='w-4 h-4 text-gray-500 dark:text-gray-400'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 20 20'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
								/>
							</svg>
						</div>
						<input
							type='text'
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							className='block w-full p-3 ps-10 text-sm text-gray-900 border border-[#c2c2c5] rounded-lg bg-[##D4D4D8] outline-0'
							placeholder='Search'
							value={value}
							required
						/>
						<button
							type='button'
							onClick={handleClick}
							className='text-white absolute end-2.5 bottom-2.5 bg-[#398FBD] hover:bg-[#276281] rounded-lg text-sm px-2.5 py-1 cursor-pointer transition-all delay-50'
						>
							Search
						</button>
					</div>
				</form>
			</div>
			<div>
				<Logo />
			</div>
		</div>
	);
};
