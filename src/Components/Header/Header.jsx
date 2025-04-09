import { useEffect, useState } from 'react';
import { Logo } from '../../assets/logo';
import SplitText from '../Effects/SplitText';

export const Header = () => {
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
		<div className='flex justify-between'>
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
			<div>
				<Logo />
			</div>
		</div>
	);
};
