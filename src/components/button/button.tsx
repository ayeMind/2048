import { Link } from 'react-router-dom';

const Button = ({ size }: {size: number} ) => {
  return (
    <Link to={`/game/${size}`}>
      <div className='text-[36px] flex justify-center text-center items-center bg-[#1e1432] p-4 sm:px-8 md:px-16 lg:px-32 lg:py-12 lg:h-20 rounded-xl select-none hover:bg-[#19112b] lg:text-[48px]'>
        {`${size}x${size}`}
      </div>
    </Link>
  );
};

export default Button;
