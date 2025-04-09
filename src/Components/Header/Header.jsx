import { Logo } from '../../assets/logo';
import SplitText from '../Effects/SplitText';

export const Header = () => {
	return (
		<div className='flex justify-between'>
			<div className='flex flex-col items-start'>
				<SplitText
					text='GOOD'
					className='text-[#042848] text-6xl font-extrabold text-center'
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
					text='MORNING'
					className='text-[#042848] text-6xl font-extrabold text-center'
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
