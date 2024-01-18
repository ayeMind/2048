const isMovePossible = (size: number, currentGrid: number[][]) => {
    const checkMove = (
      row: number,
      col: number,
      rowModifier: number,
      colModifier: number
    ) => {
      const currentValue = currentGrid[row][col];
  
      if (currentValue === 0) {
        return true;
      }
  
      if (
        row + rowModifier >= 0 &&
        row + rowModifier < size &&
        col + colModifier >= 0 &&
        col + colModifier < size &&
        currentGrid[row + rowModifier][col + colModifier] === currentValue
      ) {
        return true;
      }
  
      return (
        row + rowModifier >= 0 &&
        row + rowModifier < size &&
        col + colModifier >= 0 &&
        col + colModifier < size &&
        currentGrid[row + rowModifier][col + colModifier] === 0
      );
    };
  
    for (let col = 0; col < size; col++) {
      for (let row = 0; row < size; row++) {
        if (
          checkMove(row, col, -1, 0) ||
          checkMove(row, col, 1, 0) ||
          checkMove(row, col, 0, -1) ||
          checkMove(row, col, 0, 1)
        ) {
          return true;
        }
      }
    }
  
    return false;
  };
  
  export default isMovePossible;