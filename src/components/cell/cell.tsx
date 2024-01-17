export default function Cell({ size, value }: { size: number; value: number }) {
  const color = (value: number) => {
    switch (value) {
      case 0:
        return "#897aa8";
      case 2:
        return "#402b6b";
      case 4:
        return "#3b2864";
      case 8:
        return "#332355";
      case 16:
        return "#2f204e";
      case 32:
        return "#2a1d47";
      case 64:
        return "#261a40";
      case 128:
        return "#221739";
      case 256:
        return "#1e1432";
      case 512:
        return "#19112b";
      case 2048:
        return "#1b060e";
      default:
        return "#110c1c";
    }
  };

  const calculateFontSize = (value: number) => {
    // Определение размера шрифта в зависимости от количества цифр в числе
    const numDigits = Math.floor(Math.log10(Math.abs(value)) + 1);

    let resultSize;
    switch (numDigits) {
      case 1:
        resultSize = 48;
        break;
      case 2:
        resultSize = 48;
        break;
      case 3:
        resultSize = 42;
        break;
      case 4:
        resultSize = 32;
        break;
      case 5:
        resultSize = 24;
        break;
      default:
        resultSize = 16;
        break;
    }

    return `${resultSize}px`;
  };

  return (
    <div
      className='rounded-md flex items-center justify-center text-center font-[750] select-none'
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color(value),
        fontSize: calculateFontSize(value),
        whiteSpace: 'nowrap',
      }}
    >
      {value !== 0 ? value : ''}
    </div>
  );
}
