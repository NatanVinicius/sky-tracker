import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';

export const Loader = ({ loading }) => {
	return (
		<div className='w-full h-full flex justify-center items-center '>
			<PropagateLoader
				color='#042848'
				loading={loading}
				size={20}
				aria-label='Loading Spinner'
				data-testid='loader'
			/>
		</div>
	);
};
