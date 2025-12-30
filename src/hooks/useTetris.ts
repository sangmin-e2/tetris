
import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  GRID_WIDTH, 
  GRID_HEIGHT, 
  TETROMINOS, 
  INITIAL_LEVEL_SPEED, 
  MIN_LEVEL_SPEED, 
  SPEED_INCREMENT, 
  SCORING 
} from '../constants';
import { GameState, PieceState, TetrominoType, Position } from '../types';

const createEmptyGrid = () => 
  Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(null));

const getRandomPiece = (): PieceState => {
  const keys = Object.keys(TETROMINOS) as TetrominoType[];
  const type = keys[Math.floor(Math.random() * keys.length)];
  const tetromino = TETROMINOS[type];
  return {
    type,
    shape: tetromino.shape,
    color: tetromino.color,
    position: { x: Math.floor(GRID_WIDTH / 2) - Math.floor(tetromino.shape[0].length / 2), y: 0 },
  };
};

export const useTetris = () => {
  const [gameState, setGameState] = useState<GameState>({
    grid: createEmptyGrid(),
    activePiece: null,
    nextPiece: getRandomPiece(),
    holdPiece: null,
    score: 0,
    lines: 0,
    level: 1,
    gameOver: false,
    isPaused: false,
    canHold: true,
  });

  const gameLoopRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const checkCollision = useCallback((shape: number[][], position: Position, grid: (string | null)[][]) => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const newX = position.x + x;
          const newY = position.y + y;
          if (
            newX < 0 || 
            newX >= GRID_WIDTH || 
            newY >= GRID_HEIGHT ||
            (newY >= 0 && grid[newY][newX])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  const spawnPiece = useCallback(() => {
    setGameState(prev => {
      const newPiece = prev.nextPiece;
      if (checkCollision(newPiece.shape, newPiece.position, prev.grid)) {
        return { ...prev, gameOver: true, activePiece: null };
      }
      return {
        ...prev,
        activePiece: newPiece,
        nextPiece: getRandomPiece(),
        canHold: true,
      };
    });
  }, [checkCollision]);

  const rotate = (shape: number[][]) => {
    const newShape = shape[0].map((_, index) =>
      shape.map(col => col[index]).reverse()
    );
    return newShape;
  };

  const clearLines = useCallback((grid: (string | null)[][]) => {
    let linesCleared = 0;
    const newGrid = grid.filter(row => {
      const isFull = row.every(cell => cell !== null);
      if (isFull) linesCleared++;
      return !isFull;
    });

    while (newGrid.length < GRID_HEIGHT) {
      newGrid.unshift(Array(GRID_WIDTH).fill(null));
    }

    return { newGrid, linesCleared };
  }, []);

  const lockPiece = useCallback(() => {
    setGameState(prev => {
      if (!prev.activePiece) return prev;
      
      const newGrid = prev.grid.map(row => [...row]);
      prev.activePiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            const gridY = prev.activePiece!.position.y + y;
            const gridX = prev.activePiece!.position.x + x;
            if (gridY >= 0) {
              newGrid[gridY][gridX] = prev.activePiece!.color;
            }
          }
        });
      });

      const { newGrid: clearedGrid, linesCleared } = clearLines(newGrid);
      const points = [0, SCORING.SINGLE, SCORING.DOUBLE, SCORING.TRIPLE, SCORING.TETRIS][linesCleared] || 0;
      const newTotalLines = prev.lines + linesCleared;
      const newLevel = Math.floor(newTotalLines / 10) + 1;

      return {
        ...prev,
        grid: clearedGrid,
        activePiece: null,
        score: prev.score + points,
        lines: newTotalLines,
        level: newLevel,
      };
    });
  }, [clearLines]);

  const moveDown = useCallback(() => {
    setGameState(prev => {
      if (!prev.activePiece || prev.isPaused || prev.gameOver) return prev;
      
      const nextPos = { ...prev.activePiece.position, y: prev.activePiece.position.y + 1 };
      if (!checkCollision(prev.activePiece.shape, nextPos, prev.grid)) {
        return {
          ...prev,
          activePiece: { ...prev.activePiece, position: nextPos }
        };
      } else {
        // Handle lock logic in the next frame or immediately
        return prev;
      }
    });
  }, [checkCollision]);

  const drop = useCallback(() => {
    setGameState(prev => {
      if (!prev.activePiece || prev.isPaused || prev.gameOver) return prev;
      const nextPos = { ...prev.activePiece.position, y: prev.activePiece.position.y + 1 };
      if (!checkCollision(prev.activePiece.shape, nextPos, prev.grid)) {
        return { ...prev, activePiece: { ...prev.activePiece, position: nextPos } };
      } else {
        // Can't move down, so lock it
        setTimeout(lockPiece, 0);
        return prev;
      }
    });
  }, [checkCollision, lockPiece]);

  const moveHorizontal = useCallback((dir: -1 | 1) => {
    setGameState(prev => {
      if (!prev.activePiece || prev.isPaused || prev.gameOver) return prev;
      const nextPos = { ...prev.activePiece.position, x: prev.activePiece.position.x + dir };
      if (!checkCollision(prev.activePiece.shape, nextPos, prev.grid)) {
        return { ...prev, activePiece: { ...prev.activePiece, position: nextPos } };
      }
      return prev;
    });
  }, [checkCollision]);

  const rotatePiece = useCallback(() => {
    setGameState(prev => {
      if (!prev.activePiece || prev.isPaused || prev.gameOver) return prev;
      const newShape = rotate(prev.activePiece.shape);
      if (!checkCollision(newShape, prev.activePiece.position, prev.grid)) {
        return { ...prev, activePiece: { ...prev.activePiece, shape: newShape } };
      }
      return prev;
    });
  }, [checkCollision]);

  const hardDrop = useCallback(() => {
    setGameState(prev => {
      if (!prev.activePiece || prev.isPaused || prev.gameOver) return prev;
      let finalY = prev.activePiece.position.y;
      while (!checkCollision(prev.activePiece.shape, { x: prev.activePiece.position.x, y: finalY + 1 }, prev.grid)) {
        finalY++;
      }
      const droppedDistance = finalY - prev.activePiece.position.y;
      const newActive = { ...prev.activePiece, position: { ...prev.activePiece.position, y: finalY } };
      
      // Update state and immediately lock
      setTimeout(lockPiece, 0);
      return {
        ...prev,
        score: prev.score + (droppedDistance * SCORING.HARD_DROP),
        activePiece: newActive
      };
    });
  }, [checkCollision, lockPiece]);

  const holdPiece = useCallback(() => {
    setGameState(prev => {
      if (!prev.activePiece || !prev.canHold || prev.isPaused || prev.gameOver) return prev;
      
      const currentType = prev.activePiece.type;
      const resetPiece = (type: TetrominoType): PieceState => ({
        type,
        shape: TETROMINOS[type].shape,
        color: TETROMINOS[type].color,
        position: { x: Math.floor(GRID_WIDTH / 2) - Math.floor(TETROMINOS[type].shape[0].length / 2), y: 0 }
      });

      if (!prev.holdPiece) {
        return {
          ...prev,
          holdPiece: prev.activePiece,
          activePiece: null, // trigger spawn in effect
          canHold: false,
        };
      } else {
        const toHold = prev.activePiece;
        const fromHold = prev.holdPiece;
        return {
          ...prev,
          holdPiece: toHold,
          activePiece: resetPiece(fromHold.type),
          canHold: false,
        };
      }
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      grid: createEmptyGrid(),
      activePiece: null,
      nextPiece: getRandomPiece(),
      holdPiece: null,
      score: 0,
      lines: 0,
      level: 1,
      gameOver: false,
      isPaused: false,
      canHold: true,
    });
  }, []);

  const togglePause = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  // Ghost Position calculation
  const getGhostPosition = useCallback(() => {
    if (!gameState.activePiece) return null;
    let ghostY = gameState.activePiece.position.y;
    while (!checkCollision(gameState.activePiece.shape, { x: gameState.activePiece.position.x, y: ghostY + 1 }, gameState.grid)) {
      ghostY++;
    }
    return { ...gameState.activePiece.position, y: ghostY };
  }, [gameState.activePiece, gameState.grid, checkCollision]);

  // Game Speed logic
  useEffect(() => {
    if (gameState.gameOver || gameState.isPaused) return;

    if (!gameState.activePiece) {
      spawnPiece();
      return;
    }

    const interval = Math.max(MIN_LEVEL_SPEED, INITIAL_LEVEL_SPEED - (gameState.level - 1) * SPEED_INCREMENT);
    
    const timer = setInterval(() => {
      drop();
    }, interval);

    return () => clearInterval(timer);
  }, [gameState.gameOver, gameState.isPaused, gameState.activePiece, gameState.level, spawnPiece, drop]);

  return {
    gameState,
    moveHorizontal,
    moveDown: drop,
    rotatePiece,
    hardDrop,
    holdPiece,
    resetGame,
    togglePause,
    getGhostPosition,
  };
};
