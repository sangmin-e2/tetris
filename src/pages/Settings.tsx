
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [bgmVolume, setBgmVolume] = useState(80);
  const [sfxVolume, setSfxVolume] = useState(50);
  const [controlType, setControlType] = useState<'buttons' | 'swipe'>('buttons');
  const [theme, setTheme] = useState('classic');

  return (
    <div className="relative flex h-full w-full flex-col bg-background-dark pb-10 overflow-y-auto scrollbar-hide">
      <header className="flex items-center justify-between p-4 pb-2 sticky top-0 z-20 bg-background-dark/95 backdrop-blur-sm">
        <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-wide flex-1 text-center pr-10 uppercase font-display">설정</h2>
      </header>

      <div className="h-4"></div>

      <section className="flex flex-col gap-2 px-4">
        <h3 className="text-slate-400 text-sm font-bold tracking-widest uppercase mb-1 ml-1">오디오</h3>
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">music_note</span>
              <p className="text-white text-base font-medium">배경 음악</p>
            </div>
            <span className="text-slate-400 text-sm font-mono">{bgmVolume}%</span>
          </div>
          <input 
            type="range" 
            value={bgmVolume} 
            onChange={(e) => setBgmVolume(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary"
          />
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 shadow-sm mt-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">graphic_eq</span>
              <p className="text-white text-base font-medium">효과음</p>
            </div>
            <span className="text-slate-400 text-sm font-mono">{sfxVolume}%</span>
          </div>
          <input 
            type="range" 
            value={sfxVolume} 
            onChange={(e) => setSfxVolume(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary"
          />
        </div>
      </section>

      <div className="h-8"></div>

      <section className="flex flex-col gap-2 px-4">
        <h3 className="text-slate-400 text-sm font-bold tracking-widest uppercase mb-1 ml-1">컨트롤</h3>
        <div className="grid grid-cols-2 gap-3 mb-2">
          <button 
            onClick={() => setControlType('buttons')}
            className={`relative group flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${controlType === 'buttons' ? 'border-primary bg-primary/10' : 'border-slate-700 bg-slate-800/50 hover:border-primary/50'}`}
          >
            {controlType === 'buttons' && (
              <div className="absolute top-2 right-2 text-primary">
                <span className="material-symbols-outlined text-xl">check_circle</span>
              </div>
            )}
            <div className={`p-3 rounded-full transition-colors ${controlType === 'buttons' ? 'bg-primary/20 text-primary' : 'bg-slate-700 text-slate-400 group-hover:text-primary'}`}>
              <span className="material-symbols-outlined text-3xl">joystick</span>
            </div>
            <span className={`font-bold text-sm ${controlType === 'buttons' ? 'text-white' : 'text-slate-300'}`}>버튼</span>
          </button>
          <button 
            onClick={() => setControlType('swipe')}
            className={`relative group flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${controlType === 'swipe' ? 'border-primary bg-primary/10' : 'border-slate-700 bg-slate-800/50 hover:border-primary/50'}`}
          >
            {controlType === 'swipe' && (
              <div className="absolute top-2 right-2 text-primary">
                <span className="material-symbols-outlined text-xl">check_circle</span>
              </div>
            )}
            <div className={`p-3 rounded-full transition-colors ${controlType === 'swipe' ? 'bg-primary/20 text-primary' : 'bg-slate-700 text-slate-400 group-hover:text-primary'}`}>
              <span className="material-symbols-outlined text-3xl">swipe</span>
            </div>
            <span className={`font-medium text-sm ${controlType === 'swipe' ? 'text-white' : 'text-slate-300'}`}>스와이프</span>
          </button>
        </div>
        <div className="flex items-center justify-between bg-slate-800/50 rounded-2xl p-4 border border-slate-700 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-500">vibration</span>
            <p className="text-white text-base font-medium">진동</p>
          </div>
          <div className="relative inline-flex items-center cursor-pointer">
            <input defaultChecked type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </div>
        </div>
      </section>

      <div className="h-8"></div>

      <section className="flex flex-col gap-2 px-4">
        <h3 className="text-slate-400 text-sm font-bold tracking-widest uppercase mb-1 ml-1">테마</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {['classic', 'neon', 'flat'].map((t) => (
            <div key={t} className="snap-start flex-shrink-0 flex flex-col gap-2 group cursor-pointer" onClick={() => setTheme(t)}>
              <div className={`w-28 h-36 rounded-2xl bg-slate-800 relative overflow-hidden border-2 transition-all ${theme === t ? 'border-primary shadow-neon' : 'border-transparent'}`}>
                <img alt={t} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" src={`https://picsum.photos/seed/${t}/200/300`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-4 h-4 bg-primary/40 rounded-sm"></div><div className="w-4 h-4 bg-primary/40 rounded-sm"></div>
                    <div className="w-4 h-4 bg-primary/40 rounded-sm"></div><div className="w-4 h-4 bg-primary/40 rounded-sm"></div>
                  </div>
                </div>
                {theme === t && (
                  <div className="absolute top-2 right-2 bg-primary text-background-dark rounded-full p-0.5">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                )}
              </div>
              <span className={`text-center text-sm font-medium uppercase tracking-wider ${theme === t ? 'text-primary' : 'text-slate-500'}`}>{t}</span>
            </div>
          ))}
        </div>
      </section>
      
      <div className="mt-8 px-4 pb-8 flex justify-center">
        <button className="text-slate-500 text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-slate-800">
          <span className="material-symbols-outlined text-lg">restart_alt</span>
          기본값으로 초기화
        </button>
      </div>
    </div>
  );
};

export default Settings;
