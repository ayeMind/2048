import { useState, useEffect } from "react";
import Cell from "../cell/cell";
import { Link } from "react-router-dom";
import isMovePossible from "./isMovePossible";

import { useSwipeable } from 'react-swipeable';

export default function Field({ size }: { size: number }) {

  const defaultArray = Array.from({ length: size }, () =>
  Array.from({ length: size }, () => 0)
);

  const [grid, setGrid] = useState(defaultArray);

  let cellSize = 0;
  let [titleText, setTitleText] = useState('2048');
  

  if (size == 3) {
    cellSize = 200;
  } else if (size == 4) {
    cellSize = 150;
  } else if (size == 5) {
    cellSize = 120;
  } else if (size == 6) {
    cellSize = 90;
  } else if (size == 7) {
    cellSize = 80;
  } else if (size <= 9) {
    cellSize = 70;
  }

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

  const handleSwipe = (direction: string) => {
    const newGrid = moveTiles(direction, [...grid]);
    if (isGridChanged(grid, newGrid)) {
      setGrid(newGrid);
      addRandomTile(newGrid);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('ArrowLeft'),
    onSwipedRight: () => handleSwipe('ArrowRight'),
    onSwipedUp: () => handleSwipe('ArrowUp'),
    onSwipedDown: () => handleSwipe('ArrowDown'),
  });

  const moveTiles = (direction: string, currentGrid: number[][]) => {
    const newGrid = JSON.parse(JSON.stringify(currentGrid)); // Создаем копию сетки

    const move = (
      row: number,
      col: number,
      rowModifier: number,
      colModifier: number
    ) => {
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
        newGrid[newRow + rowModifier][newCol + colModifier] =
          newGrid[newRow][newCol];
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
      case "ArrowUp":
      case "w":
        for (let col = 0; col < size; col++) {
          for (let row = 1; row < size; row++) {
            move(row, col, -1, 0);
          }
        }
        break;
      case "ArrowDown":
      case "s":
        for (let col = 0; col < size; col++) {
          for (let row = size - 2; row >= 0; row--) {
            move(row, col, 1, 0);
          }
        }
        break;
      case "ArrowLeft":
      case "a":
        for (let row = 0; row < size; row++) {
          for (let col = 1; col < size; col++) {
            move(row, col, 0, -1);
          }
        }
        break;
      case "ArrowRight":
      case "d":
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

  const startTiles = (newGrid: number[][]) => {
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    setGrid(newGrid);
  };

  useEffect(() => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    startTiles(newGrid)
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    const checkMovesAfterRender = () => {
      if (!isMovePossible(size, grid)) {
        setTitleText('Game over');  
      }
    };
  
    const timeoutId = setTimeout(checkMovesAfterRender, 0);
  
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [grid]);

  return (
    <div className="relative content" {...swipeHandlers}>
      <div className="flex items-center justify-center w-screen h-screen">
        <div>
          <h1
            className="absolute text-2xl transform -translate-x-1/2 left-1/2 sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ top: `${titleTop}px` }}
          >
            {titleText}
          </h1>

          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#030914] -z-10 rounded-lg shadow-[0_0_35px_3px_#483179] sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80`}
            style={{ width: `${squareSize}px`, height: `${squareSize}px` }}
          ></div>

          <div
            className="grid sm:gap-2 md:gap-3 lg:gap-4"
            style={{
              gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
              gap: `${gap}px`,
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <Cell
                  key={`${rowIndex}-${colIndex}`}
                  size={cellSize}
                  value={cell}
                  fieldSize={size}
                />
              ))
            )}
          </div>

          {titleText == 'Game over' ? (
            <button
              onClick={() => {
                setGrid(defaultArray);
                setTitleText('2048');
                startTiles(defaultArray);
              }}
              className="absolute flex items-center justify-center -translate-x-1/2 bottom-10 left-1/2 text-center bg-[#1e1432] w-72 sm:w-80 md:w-96 h-16 sm:h-20 rounded-xl select-none hover:bg-[#19112b] text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            >
              Restart
            </button>
          ) : (
            <Link
              to="/"
              className="absolute flex items-center justify-center -translate-x-1/2 bottom-8 left-1/2 text-center bg-[#1e1432] w-72 sm:w-80 md:w-96 h-16 sm:h-20 rounded-xl select-none hover:bg-[#19112b] text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            >
              Back
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}