import React from 'react';
import { AnalysisResult } from '../types';
import { Footprints, Mountain } from 'lucide-react';

interface Props {
  data: AnalysisResult;
  onNext: () => void;
}

const PhaseJudge: React.FC<Props> = ({ data, onNext }) => {
  return (
    <div className="max-w-5xl mx-auto min-h-[80vh] space-y-12 md:space-y-16 animate-fade-in p-4 md:p-6 pb-24 relative">
      
      <div className="absolute top-20 left-4 md:left-10 text-[6rem] md:text-[8rem] opacity-5 font-serif select-none pointer-events-none text-zen-gold rotate-12">判</div>

      <div className="text-center space-y-3 md:space-y-4">
        <h2 className="text-xl md:text-2xl font-serif text-zen-paper/60 uppercase tracking-[0.5em]">未来 沙盘</h2>
        <p className="text-zen-paper/40 text-xs md:text-sm font-light">若不回头，歧路生三苦。</p>
      </div>

      {/* Future Scenarios - Rounded Cards */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {data.futureScenarios.map((scenario, idx) => (
            <div key={idx} className="bg-zen-gray/10 p-6 md:p-8 border border-zen-gray/50 hover:border-zen-red/50 hover:bg-zen-gray/20 transition-all duration-500 group relative rounded-3xl">
                <div className="absolute top-4 right-6 text-3xl md:text-4xl text-zen-gray/20 font-serif group-hover:text-zen-red/10">{idx + 1}</div>
                <h3 className="text-lg md:text-xl font-serif text-zen-gold mb-3 md:mb-4 group-hover:text-zen-red transition-colors tracking-wide">{scenario.name}</h3>
                <p className="text-zen-paper/70 text-sm leading-loose text-justify">{scenario.description}</p>
            </div>
        ))}
      </div>

      {/* The God's Sigh */}
      <div className="relative py-12 md:py-16 text-center">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Mountain className="w-64 h-64 md:w-96 md:h-96 text-zen-paper" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-4 md:space-y-6">
            <div className="w-12 md:w-16 h-1 bg-zen-gold mx-auto mb-4 md:mb-8 rounded-full"></div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif text-zen-paper leading-relaxed md:leading-tight drop-shadow-lg tracking-wider px-2">
                {data.godsSigh}
            </h1>
            <p className="text-zen-red text-[10px] md:text-xs uppercase tracking-[0.8em] pt-4">背坐 之叹</p>
        </div>
      </div>

      {/* Awakening Stone - Capsule */}
      <div className="bg-gradient-to-r from-transparent via-zen-gold/20 to-transparent p-[1px] rounded-full max-w-xl mx-auto">
        <div className="bg-zen-black rounded-full px-6 md:px-8 py-4 md:py-5 flex items-center justify-between group cursor-pointer border border-zen-gray/30 hover:border-zen-gold/50 transition-colors" onClick={onNext}>
            <div className="flex items-center space-x-4 md:space-x-6">
                <div className="bg-zen-gold/10 p-2 md:p-3 rounded-full text-zen-gold group-hover:bg-zen-gold group-hover:text-zen-black transition-colors duration-500">
                    <Footprints className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="text-left">
                    <p className="text-[10px] md:text-xs text-zen-paper/40 uppercase tracking-widest mb-0.5 md:mb-1">觉醒之石 · 微行</p>
                    <p className="text-sm md:text-base text-zen-paper font-medium tracking-wide">{data.awakeningStone}</p>
                </div>
            </div>
            <span className="text-zen-paper/30 text-xs md:text-sm group-hover:text-zen-gold transition-colors tracking-widest whitespace-nowrap pl-2">领受 &rarr;</span>
        </div>
      </div>

    </div>
  );
};

export default PhaseJudge;