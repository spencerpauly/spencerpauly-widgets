import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
	height: number;
	bgClassName: string;
	children: React.ReactNode;
}

const MagicBackground = ({ height, bgClassName, children }: Props) => {
	const backgroundClasses = twMerge('bg-gray-800', bgClassName);
	return (
		<div className='relative'>
			<div style={{ height: `${height}px` }} className={backgroundClasses}></div>
			<div style={{ marginTop: `-${height}px` }} className='relative w-full mx-auto'>
				{children}
			</div>
		</div>
	);
};

export default MagicBackground;
