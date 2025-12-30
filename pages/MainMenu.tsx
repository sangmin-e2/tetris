
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-dark select-none">
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-[80px] z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] z-0"></div>
      
      <div className="relative z-10 flex items-center justify-center p-6 pt-16">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 text-3xl font-bold leading-tight tracking-widest text-center flex-1 drop-shadow-sm uppercase">
          SANGMIN TETRIS
        </h2>
      </div>
      
      <div className="relative z-10 flex flex-col px-6 py-4 flex-1 justify-center items-center">
        <div className="w-full flex justify-center">
          <div className="relative w-full aspect-square max-w-[300px] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(13,185,242,0.25)] border border-primary/30 bg-surface-dark group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-10 pointer-events-none"></div>
            <img 
              alt="Tetris Banner" 
              className="w-full h-full object-cover" 
              src="https://play-lh.googleusercontent.com/NRnHPbEC0nFX2ZQAyJnBvmCxv4W9Q_-FyFKlerOt6Ofu_vhS4X4D2rK4MoLFZPnCQHmd" 
            />
            <div className="absolute bottom-4 left-4 z-20 flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-primary/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-primary/30"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 flex justify-center pb-12">
        <div className="flex flex-1 gap-4 max-w-[480px] flex-col items-stretch px-6">
          <button 
            onClick={() => navigate('/game')} 
            className="group flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-16 px-6 bg-primary text-background-dark text-xl font-bold leading-normal tracking-wide w-full shadow-[0_4px_20px_rgba(13,185,242,0.4)] hover:shadow-[0_4px_25px_rgba(13,185,242,0.6)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined mr-2 text-[28px] group-hover:rotate-12 transition-transform">play_arrow</span>
            <span>게임 시작</span>
          </button>
          
          <div className="flex gap-4 w-full">
            <button 
              onClick={() => navigate('/score')} 
              className="flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-surface-dark border border-slate-700/50 hover:border-primary/50 hover:bg-slate-800 text-white text-base font-medium transition-all"
            >
              <span className="material-symbols-outlined text-primary mr-2 text-[20px]">emoji_events</span>
              <span>기록</span>
            </button>
            <button 
              onClick={() => navigate('/settings')} 
              className="flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-surface-dark border border-slate-700/50 hover:border-primary/50 hover:bg-slate-800 text-white text-base font-medium transition-all"
            >
              <span className="material-symbols-outlined text-primary mr-2 text-[20px]">settings</span>
              <span>설정</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 pb-6">
        <p className="text-slate-500 text-xs font-normal text-center tracking-widest opacity-60">VER 1.2.0</p>
      </div>
    </div>
  );
};

export default MainMenu;
