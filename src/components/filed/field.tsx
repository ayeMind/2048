import React, { useState, useEffect } from 'react';
import Cell from "../cell/cell";

export default function Field({ size }: { size: number }) {
  const [grid, setGrid] = useState(() => {
    return Array.from({ length: size }, () =>
      Array.from({ length: size }, () => 0)
    );
  });

  const cellSize = 96;
  const gap = 15;

  const squareSize = size * cellSize + gap * (size - 1) + gap;
  const titleTop = window.innerHeight / 2 - squareSize / 2 - 85;

  const handleKeyPress = (event: KeyboardEvent) => {
    const newGrid = moveTiles(event.key, [...grid]);
    if (isGridChanged(grid, newGrid)) {
      setGrid(newGrid);
      addRandomTile(newGrid);
    }
  };

  const moveTiles = (direction: string, currentGrid: number[][]) => {
    const newGrid = JSON.parse(JSON.stringify(currentGrid)); // Создаем копию сетки
  
    const move = (row: number, col: number, rowModifier: number, colModifier: number) => {
      const currentValue = newGrid[row][col];
  
      if (currentValue === 0) {
        return; // Ничего не делаем, если клетка пуста
      }
  
      let newRow = row;
      let newCol = col;
  
      while (
        newRow + rowModifier >= 0 &&
        newRow + rowModifier < size &&
        newCol + colModifier >= 0 &&
        newCol + colModifier < size &&
        newGrid[newRow + rowModifier][newCol + colModifier] === 0
      ) {
        // Перемещаем клетку в направлении, пока не достигнем границы или другой клетки
        newGrid[newRow + rowModifier][newCol + colModifier] = newGrid[newRow][newCol];
        newGrid[newRow][newCol] = 0;
        newRow += rowModifier;
        newCol += colModifier;
      }
  
      if (
        newRow + rowModifier >= 0 &&
        newRow + rowModifier < size &&
        newCol + colModifier >= 0 &&
        newCol + colModifier < size &&
        newGrid[newRow + rowModifier][newCol + colModifier] === currentValue
      ) {
        // Слияние, если достигнута клетка с тем же значением
        newGrid[newRow + rowModifier][newCol + colModifier] += currentValue;
        newGrid[newRow][newCol] = 0;
      }
    };
  
    switch (direction) {
      case 'ArrowUp':
      case 'w':
        for (let col = 0; col < size; col++) {
          for (let row = 1; row < size; row++) {
            move(row, col, -1, 0);
          }
        }
        break;
      case 'ArrowDown':
      case 's':
        for (let col = 0; col < size; col++) {
          for (let row = size - 2; row >= 0; row--) {
            move(row, col, 1, 0);
          }
        }
        break;
      case 'ArrowLeft':
      case 'a':
        for (let row = 0; row < size; row++) {
          for (let col = 1; col < size; col++) {
            move(row, col, 0, -1);
          }
        }
        break;
      case 'ArrowRight':
      case 'd':
        for (let row = 0; row < size; row++) {
          for (let col = size - 2; col >= 0; col--) {
            move(row, col, 0, 1);
          }
        }
        break;
      default:
        break;
    }
  
    return newGrid;
  };
  

  const isGridChanged = (oldGrid: number[][], newGrid: number[][]) => {
    // Проверка, изменилась ли сетка после перемещения
    return JSON.stringify(oldGrid) !== JSON.stringify(newGrid);
  };

  const addRandomTile = (grid: number[][]) => {
    const emptyCells = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (grid[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const { row, col } = emptyCells[randomIndex];
      grid[row][col] = Math.random() < 0.7 ? 2 : 4; // 70% шанс на 2, 30% на 4
    }
  };


  useEffect(() => {
    
    const newGrid = JSON.parse(JSON.stringify(grid));
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    setGrid(newGrid);
    
  }, []);


  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    const moveTiles = (direction: string, currentGrid: number[][]) => {
  const newGrid = JSON.parse(JSON.stringify(currentGrid)); // Создаем копию сетки

  const move = (row: number, col: number, rowModifier: number, colModifier: number) => {
    const currentValue = newGrid[row][col];

    if (currentValue === 0) {
      return; // Ничего не делаем, если клетка пуста
    }

    let newRow = row;
    let newCol = col;

    while (
      newRow + rowModifier >= 0 &&
      newRow + rowModifier < size &&
      newCol + colModifier >= 0 &&
      newCol + colModifier < size &&
      newGrid[newRow + rowModifier][newCol + colModifier] === 0
    ) {
      // Перемещаем клетку в направлении, пока не достигнем границы или другой клетки
      newGrid[newRow + rowModifier][newCol + colModifier] = newGrid[newRow][newCol];
      newGrid[newRow][newCol] = 0;
      newRow += rowModifier;
      newCol += colModifier;
    }

    if (
      newRow + rowModifier >= 0 &&
      newRow + rowModifier < size &&
      newCol + colModifier >= 0 &&
      newCol + colModifier < size &&
      newGrid[newRow + rowModifier][newCol + colModifier] === currentValue
    ) {
      // Слияние, если достигнута клетка с тем же значением
      newGrid[newRow + rowModifier][newCol + colModifier] += currentValue;
      newGrid[newRow][newCol] = 0;
    }
  };

  switch (direction) {
    case 'ArrowUp':
    case 'w':
      for (let col = 0; col < size; col++) {
        for (let row = 1; row < size; row++) {
          move(row, col, -1, 0);
        }
      }
      break;
    case 'ArrowDown':
    case 's':
      for (let col = 0; col < size; col++) {
        for (let row = size - 2; row >= 0; row--) {
          move(row, col, 1, 0);
        }
      }
      break;
    case 'ArrowLeft':
    case 'a':
      for (let row = 0; row < size; row++) {
        for (let col = 1; col < size; col++) {
          move(row, col, 0, -1);
        }
      }
      break;
    case 'ArrowRight':
    case 'd':
      for (let row = 0; row < size; row++) {
        for (let col = size - 2; col >= 0; col--) {
          move(row, col, 0, 1);
        }
      }
      break;
    default:
      break;
  }

  return newGrid;
};


    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [grid]);

  return (
    <div>
      <h1 className="absolute transform -translate-x-1/2 left-1/2" style={{ top: `${titleTop}px` }}>
        2048
      </h1>

      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#030914] -z-10 rounded-lg shadow-[0_0_35px_3px_#483179]`}
        style={{ width: `${squareSize}px`, height: `${squareSize}px` }}
      ></div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          gap: `${gap}px`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell key={`${rowIndex}-${colIndex}`} size={cellSize} value={cell}/>
          ))
        )}
      </div>
    </div>
  );
}
