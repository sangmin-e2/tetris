
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTetris } from '../hooks/useTetris';
import { GRID_WIDTH, GRID_HEIGHT } from '../constants';

const Game: React.FC = () => {
  const navigate = useNavigate();
  const { 
    gameState, 
    moveHorizontal, 
    moveDown, 
    rotatePiece, 
    hardDrop, 
    holdPiece, 
    togglePause,
    getGhostPosition,
    resetGame
  } = useTetris();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.gameOver) return;
      switch (e.key) {
        case 'ArrowLeft': moveHorizontal(-1); break;
        case 'ArrowRight': moveHorizontal(1); break;
        case 'ArrowDown': moveDown(); break;
        case 'ArrowUp': rotatePiece(); break;
        case ' ': hardDrop(); break;
        case 'c': case 'C': holdPiece(); break;
        case 'Escape': togglePause(); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.gameOver, moveHorizontal, moveDown, rotatePiece, hardDrop, holdPiece, togglePause]);

  const ghostPos = getGhostPosition();

  // Combine grid with active piece and ghost piece for rendering
  const renderGrid = () => {
    const displayGrid = gameState.grid.map(row => [...row]);

    // Draw ghost
    if (ghostPos && gameState.activePiece && !gameState.gameOver && !gameState.isPaused) {
      gameState.activePiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            const gy = ghostPos.y + y;
            const gx = ghostPos.x + x;
            if (gy >= 0 && gy < GRID_HEIGHT && gx >= 0 && gx < GRID_WIDTH) {
              if (!displayGrid[gy][gx]) {
                displayGrid[gy][gx] = 'ghost';
              }
            }
          }
        });
      });
    }

    // Draw active piece
    if (gameState.activePiece && !gameState.gameOver && !gameState.isPaused) {
      gameState.activePiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            const gy = gameState.activePiece!.position.y + y;
            const gx = gameState.activePiece!.position.x + x;
            if (gy >= 0 && gy < GRID_HEIGHT && gx >= 0 && gx < GRID_WIDTH) {
              displayGrid[gy][gx] = gameState.activePiece!.color;
            }
          }
        });
      });
    }

    return displayGrid;
  };

  const displayGrid = renderGrid();

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-dark overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 z-10 shrink-0">
        <div className="flex flex-col">
          <span className="text-primary/60 text-[9px] font-bold tracking-widest uppercase">Level</span>
          <h2 className="text-white text-lg font-bold leading-tight neon-text">{gameState.level.toString().padStart(2, '0')}</h2>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={resetGame}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-dark border border-white/10 text-white"
          >
            <span className="material-symbols-outlined text-lg">restart_alt</span>
          </button>
          <button 
            onClick={togglePause}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-dark border border-primary/20 text-white"
          >
            <span className="material-symbols-outlined text-primary text-xl">
              {gameState.isPaused ? 'play_arrow' : 'pause'}
            </span>
          </button>
          <button 
            onClick={() => navigate('/')}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-dark border border-white/10 text-white"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      </header>

      {/* Game Info Bar */}
      <div className="flex gap-2 px-4 h-14 shrink-0 items-stretch">
        <div className="flex-1 flex items-center justify-between rounded-xl bg-surface-dark/80 border border-white/5 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 rounded-bl-full -mr-4 -mt-4"></div>
          <div className="flex flex-col justify-center">
            <p className="text-primary/80 text-[10px] font-bold tracking-widest uppercase">Score</p>
            <p className="text-white text-xl font-bold tracking-wider tabular-nums leading-none">
              {gameState.score.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col items-end justify-center border-l border-white/5 pl-4">
            <p className="text-white/40 text-[9px] font-medium uppercase">Lines</p>
            <p className="text-white/80 text-lg font-bold tabular-nums leading-none">{gameState.lines}</p>
          </div>
        </div>

        {/* Next Piece */}
        <div className="w-20 flex flex-col items-center rounded-xl bg-surface-dark/80 border border-white/5 p-1 relative">
          <p className="text-primary/80 text-[8px] font-bold tracking-widest uppercase mb-1 w-full text-center border-b border-white/5 pb-1">Next</p>
          <div className="flex-1 w-full flex items-center justify-center scale-75">
            <div className="grid" style={{ gridTemplateColumns: `repeat(${gameState.nextPiece.shape[0].length}, 12px)` }}>
              {gameState.nextPiece.shape.map((row, y) => 
                row.map((val, x) => (
                  <div 
                    key={`${y}-${x}`} 
                    className="w-3 h-3 m-[0.5px] rounded-[1px]" 
                    style={{ backgroundColor: val ? gameState.nextPiece.color : 'transparent' }}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="flex-1 relative w-full flex justify-center items-center px-4 py-2 overflow-hidden">
        {/* Hold Area */}
        <div className="absolute left-2 top-4 flex flex-col items-center gap-1 opacity-80 z-20">
          <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Hold</span>
          <div className="w-14 h-14 rounded-xl border border-white/10 bg-surface-dark/50 flex items-center justify-center p-1">
            {gameState.holdPiece && (
              <div className="scale-75 grid" style={{ gridTemplateColumns: `repeat(${gameState.holdPiece.shape[0].length}, 12px)` }}>
                {gameState.holdPiece.shape.map((row, y) => 
                  row.map((val, x) => (
                    <div 
                      key={`hold-${y}-${x}`} 
                      className="w-3 h-3 m-[0.5px] rounded-[1px]" 
                      style={{ backgroundColor: val ? gameState.holdPiece!.color : 'transparent' }}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="relative h-[90%] w-auto aspect-[1/2] bg-grid-dark rounded-xl border-2 border-primary/30 shadow-neon overflow-hidden tetris-grid">
          <div className="grid h-full w-full" style={{ gridTemplateRows: `repeat(${GRID_HEIGHT}, 1fr)`, gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}>
            {displayGrid.map((row, y) => 
              row.map((cell, x) => (
                <div 
                  key={`${y}-${x}`} 
                  className={`border-[0.5px] border-white/5 relative transition-all duration-75`}
                  style={{ 
                    backgroundColor: cell === 'ghost' ? 'transparent' : (cell || 'transparent'),
                    borderColor: cell === 'ghost' ? 'rgba(13, 185, 242, 0.3)' : 'rgba(255,255,255,0.05)',
                  }}
                >
                  {cell === 'ghost' && (
                    <div className="absolute inset-1 border border-primary/40 rounded-sm opacity-50 bg-primary/5"></div>
                  )}
                  {cell && cell !== 'ghost' && (
                    <div className="absolute inset-[1px] border border-white/20 rounded-sm shadow-[inset_0_0_8px_rgba(255,255,255,0.2)]"></div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Overlays */}
          {gameState.gameOver && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-30 p-6 text-center">
              <h3 className="text-3xl font-bold text-red-500 mb-2 uppercase tracking-widest">Game Over</h3>
              <p className="text-white/60 mb-6">최고 기록을 경신해보세요!</p>
              <div className="bg-surface-dark border border-white/10 p-4 rounded-2xl w-full mb-8">
                <p className="text-[10px] text-primary uppercase font-bold mb-1">Final Score</p>
                <p className="text-3xl font-bold tabular-nums">{gameState.score.toLocaleString()}</p>
              </div>
              <button 
                onClick={resetGame}
                className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all"
              >
                다시 시작
              </button>
            </div>
          )}

          {gameState.isPaused && !gameState.gameOver && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-30">
              <h3 className="text-3xl font-bold text-white mb-8 uppercase tracking-widest">Paused</h3>
              <button 
                onClick={togglePause}
                className="size-20 bg-primary text-background-dark rounded-full flex items-center justify-center shadow-neon animate-pulse-neon"
              >
                <span className="material-symbols-outlined text-4xl">play_arrow</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Controls */}
      <footer className="p-4 bg-background-dark relative shrink-0">
        <div className="relative w-full h-52 max-w-[360px] mx-auto select-none">
          {/* Rotate */}
          <button 
            onPointerDown={rotatePiece}
            className="absolute top-0 right-16 w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/50 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(13,185,242,0.3)] active:bg-primary/40 active:scale-95 transition-all z-10"
          >
            <span className="material-symbols-outlined text-primary text-3xl">rotate_right</span>
            <span className="text-primary text-[9px] font-bold uppercase tracking-wider mt-0.5">Rotate</span>
          </button>

          {/* Hard Drop */}
          <button 
            onPointerDown={hardDrop}
            className="absolute top-4 left-16 w-14 h-14 rounded-2xl bg-surface-dark border border-red-500/30 flex flex-col items-center justify-center shadow-lg active:border-red-500 active:bg-red-500/10 active:scale-95 transition-all group"
          >
            <span className="material-symbols-outlined text-red-400 text-xl group-active:text-red-500">keyboard_double_arrow_down</span>
            <span className="text-red-400/80 text-[8px] font-bold uppercase tracking-wide mt-0.5">Drop</span>
          </button>

          {/* Left */}
          <button 
            onPointerDown={() => moveHorizontal(-1)}
            className="absolute bottom-12 left-0 w-16 h-16 bg-surface-dark border border-white/10 rounded-2xl flex items-center justify-center shadow-lg active:border-primary/50 active:scale-95 transition-all group"
          >
            <span className="material-symbols-outlined text-white/80 text-3xl group-active:text-primary">arrow_back</span>
          </button>

          {/* Right */}
          <button 
            onPointerDown={() => moveHorizontal(1)}
            className="absolute bottom-12 right-0 w-16 h-16 bg-surface-dark border border-white/10 rounded-2xl flex items-center justify-center shadow-lg active:border-primary/50 active:scale-95 transition-all group"
          >
            <span className="material-symbols-outlined text-white/80 text-3xl group-active:text-primary">arrow_forward</span>
          </button>

          {/* Down */}
          <button 
            onPointerDown={moveDown}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-surface-dark border border-white/10 rounded-2xl flex items-center justify-center shadow-lg active:border-primary/50 active:scale-95 transition-all group"
          >
            <span className="material-symbols-outlined text-white/80 text-3xl group-active:text-primary">arrow_downward</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Game;
