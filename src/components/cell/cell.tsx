export default function Cell({size, value} : {size: number, value: number}) {

  const color = (value: number) => {
    switch (value) {
      case 0:
        return '#897aa8';
      case 2:
        return '#402b6b';
      case 4:
        return '#3b2864';
      case 8:
        return '#332355';
      case 16:
        return '#2f204e';
      case 32:
        return '#2a1d47';
      case 64:
        return '#261a40';
      case 128:
        return '#221739';
      case 256:
        return '#1e1432';
      case 512:
        return '#19112b';
      default:
        return '#110c1c';
    }
  }

    return (
      <div className='rounded-md flex items-center justify-center text-[44px] font-[750] select-none'
        style={{ width: `${size}px`, height: `${size}px`, backgroundColor: color(value) }}>
        {value !== 0 ? value : ''}
      </div>
    )
  }