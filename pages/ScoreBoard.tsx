
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ScoreBoard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-dark overflow-hidden">
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-4 bg-background-dark/90 backdrop-blur-md border-b border-slate-800">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center size-10 rounded-full hover:bg-slate-800 transition-colors group">
          <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">arrow_back_ios_new</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight text-center flex-1 pr-10 font-body uppercase">내 기록</h1>
      </header>
      
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-28 space-y-6 scrollbar-hide">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-dark to-background-dark border border-slate-700 shadow-lg group p-8">
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 size-32 rounded-full bg-purple-500/5 blur-3xl"></div>
          
          <div className="relative flex flex-col items-center justify-center gap-1 z-10">
            <span className="text-primary/80 text-xs font-bold uppercase tracking-widest mb-2">Best Score</span>
            <h2 className="text-5xl font-bold text-white tracking-tight neon-text tabular-nums">1,240,500</h2>
            
            <div className="grid grid-cols-3 gap-3 w-full mt-10 pt-8 border-t border-slate-700">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl font-bold text-white tabular-nums">482</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Games</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-x border-slate-700 px-2">
                <span className="text-xl font-bold text-white tabular-nums">29</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Level</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl font-bold text-white tabular-nums">45m</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Avg Time</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">상세 통계</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Cleared Lines', value: '15,402', icon: 'menu' },
              { label: 'Max Combo', value: '14', icon: 'bolt' },
              { label: 'T-Spins', value: '845', icon: 'rotate_right' },
              { label: 'Tetris Rate', value: '45%', icon: 'percent' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface-dark/50 p-5 rounded-2xl shadow-sm border border-slate-700 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="material-symbols-outlined text-lg">{stat.icon}</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-white tabular-nums">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-dark/50 p-6 rounded-2xl shadow-sm border border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-bold text-white">최근 트렌드</h4>
            <span className="text-xs text-slate-500">마지막 10 게임</span>
          </div>
          <div className="flex items-end justify-between h-24 gap-2 px-1">
            {[40, 60, 30, 70, 50, 80, 65, 90, 100, 85].map((h, i) => (
              <div 
                key={i} 
                className={`w-full rounded-t-md transition-all duration-500 ${i === 8 ? 'bg-primary shadow-neon' : 'bg-primary/30'}`} 
                style={{ height: `${h}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-dark via-background-dark/95 to-transparent z-30 max-w-md mx-auto">
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/game')} 
            className="flex-1 bg-primary hover:bg-primary-dark text-background-dark font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <span className="material-symbols-outlined group-active:animate-bounce">play_arrow</span>
            게임하기
          </button>
          <button className="bg-surface-dark hover:bg-slate-700 text-white p-4 rounded-2xl border border-slate-700 transition-colors flex items-center justify-center aspect-square">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
