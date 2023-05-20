import { NextPageWithLayout } from '@/types/page';
interface Props {}

const Navbar: NextPageWithLayout<Props> = () => {
	return (
		<nav className='w-full bg-green-500 shadow'>
			<div className='flex items-center max-w-7xl px-[40px] py-[24px] mx-auto space-x-[38px]'>
				<a href='https://spencerpauly.com/'>
					<img src='/static/content/spencerpauly-logo.png' className='w-auto h-[42px]' />
				</a>
				<div className=' space-x-[32px] hidden md:flex'>
					<div className='font-medium text-white'>
						<a href='https://spencerpauly.com/manifesto'>Manifesto</a>
					</div>
					<div className='font-medium text-white'>
						<a href='https://spencerpauly.com/launches'>Products</a>
					</div>
					<div className='font-medium text-white'>
						<a href='https://spencerpauly.com/tech'>Tech Blog</a>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
