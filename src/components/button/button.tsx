import { Link } from 'react-router-dom';

const Button = ({ size }: {size: number} ) => {
  return (
    <Link to={`/game/${size}`}>
      <div className='flex justify-center text-center items-center bg-[#1e1432] sm:p-2 lg:w-96 lg:h-20 rounded-xl select-none hover:bg-[#19112b] text-[48px]'>
        {`${size}x${size}`}
      </div>
    </Link>
  );
};

export default Button;
