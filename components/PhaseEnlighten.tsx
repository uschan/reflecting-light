import React, { useState } from 'react';
import { ArchiveItem } from '../types';
import { Moon, ArrowLeft, Wind } from 'lucide-react';

interface Props {
  history: ArchiveItem[];
  onRestart: () => void;
}

const PhaseEnlighten: React.FC<Props> = ({ history, onRestart }) => {
  const [quietMode, setQuietMode] = useState(false);
  
  if (history.length === 0) return null;

  const currentEntry = history[0]; // Most recent

  if (quietMode) {
    return (
      <div 
        className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-6 md:p-8 cursor-pointer transition-opacity duration-1000"
        onClick={() => setQuietMode(false)}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')]"></div>
        <p className="text-zen-paper/80 font-serif text-2xl md:text-5xl text-center leading-relaxed max-w-4xl animate-fade-in tracking-widest">
          {currentEntry.verse}
        </p>
        <div className="mt-12 md:mt-16 w-12 md:w-16 h-[1px] bg-zen-gray rounded-full"></div>
        <p className="text-zen-gray mt-4 text-[10px] md:text-xs tracking-[0.5em] uppercase">点击 返回</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in p-4 md:p-6 space-y-8 md:space-y-12">
      
      <div className="flex justify-between items-center border-b border-zen-gray/50 pb-4 md:pb-6">
        <button onClick={onRestart} className="flex items-center space-x-2 text-zen-paper/60 hover:text-zen-gold transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase tracking-widest text-xs md:text-sm">重启 观照</span>
        </button>
        <button 
            onClick={() => setQuietMode(true)}
            className="flex items-center space-x-2 text-zen-paper/60 hover:text-zen-gold transition-colors"
        >
            <Moon className="w-4 h-4" />
            <span className="uppercase tracking-widest text-xs md:text-sm">入 寂静</span>
        </button>
      </div>

      <div className="space-y-8 md:space-y-12">
        <div className="flex items-center justify-center space-x-3 md:space-x-4">
            <Wind className="text-zen-gold/50 w-5 h-5" />
            <h2 className="text-xl md:text-2xl font-serif text-zen-paper tracking-widest">枯荣 之庭</h2>
            <Wind className="text-zen-gold/50 w-5 h-5 scale-x-[-1]" />
        </div>
        
        {/* Zen Garden Timeline */}
        <div className="relative py-4">
            {/* The Sand (Line) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-zen-gold/50 via-zen-gray/30 to-transparent"></div>
            
            <div className="space-y-16">
                {history.map((item, idx) => {
                    const isLeft = idx % 2 === 0;
                    return (
                        <div key={item.id} className={`flex items-center w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'} group relative`}>
                            
                            {/* The Stone (Node) */}
                            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${idx === 0 ? 'bg-zen-gold border-zen-gold shadow-[0_0_15px_rgba(197,160,89,0.5)]' : 'bg-zen-black border-zen-gray group-hover:border-zen-gold/50'}`}></div>
                            </div>

                            {/* Content */}
                            <div className={`w-1/2 ${isLeft ? 'pr-8 md:pr-12 text-right' : 'pl-8 md:pl-12 text-left'}`}>
                                <div className={`inline-block transition-transform duration-500 group-hover:scale-105`}>
                                    <span className="block text-[10px] text-zen-paper/30 font-mono tracking-widest mb-2">
                                        {new Date(item.timestamp).toLocaleDateString()}
                                    </span>
                                    
                                    <div className={`bg-zen-gray/5 p-5 md:p-6 rounded-3xl border border-zen-gray/20 hover:border-zen-gold/30 hover:bg-zen-gray/10 transition-all duration-500 backdrop-blur-sm relative overflow-hidden
                                        ${idx > 2 ? 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100' : ''}
                                    `}>
                                        {idx === 0 && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent"></div>}
                                        
                                        <h3 className="text-base md:text-lg font-serif text-zen-paper mb-2 tracking-wide">{item.verse}</h3>
                                        <p className="text-zen-paper/40 text-xs line-clamp-2">
                                            {JSON.parse(item.originalInput).confusionText}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Empty space for the other side */}
                            <div className="w-1/2"></div>
                        </div>
                    );
                })}
                
                {/* End of garden */}
                <div className="flex justify-center pt-8 opacity-30">
                     <div className="w-2 h-2 rounded-full bg-zen-gray"></div>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default PhaseEnlighten;