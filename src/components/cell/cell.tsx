export default function Cell({size, value} : {size: number, value: number}) {
    return (
      <div className='bg-[#483179] rounded-md flex items-center justify-center text-[44px] font-[750] select-none'
        style={{ width: `${size}px`, height: `${size}px` }}>
        {value !== 0 ? value : ''}
      </div>
    )
  }