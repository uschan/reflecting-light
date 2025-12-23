import React, { useState, useEffect, useRef } from 'react';
import { AnalysisResult } from '../types';
import { Eye, ChevronDown, Volume2, VolumeX } from 'lucide-react';

interface Props {
  data: AnalysisResult;
  onNext: () => void;
}

const PhaseInterpret: React.FC<Props> = ({ data, onNext }) => {
  const [activeMirror, setActiveMirror] = useState<'essence' | 'circumstance' | 'action'>('essence');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play audio on mount
  useEffect(() => {
    if (data.verseAudio) {
      // Decode base64
      const audioUrl = `data:audio/mp3;base64,${data.verseAudio}`;
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => setIsPlaying(false);
      
      // Attempt autoplay with a slight delay for effect
      const timer = setTimeout(() => {
          audio.play().then(() => {
              setIsPlaying(true);
          }).catch(e => {
              console.log("Autoplay blocked, user interaction needed", e);
          });
      }, 1000);
      
      return () => {
          clearTimeout(timer);
          audio.pause();
      };
    }
  }, [data.verseAudio]);

  const toggleAudio = () => {
      if (audioRef.current) {
          if (isPlaying) {
              audioRef.current.pause();
              setIsPlaying(false);
          } else {
              audioRef.current.play();
              setIsPlaying(true);
          }
      }
  };

  return (
    <div className="max-w-4xl mx-auto min-h-[80vh] flex flex-col justify-center space-y-12 md:space-y-16 animate-fade-in p-4 md:p-6 relative">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 text-[6rem] md:text-[10rem] opacity-5 font-serif select-none pointer-events-none text-zen-gold">解</div>

      {/* Activated Verse - Capsule Shape */}
      <div className="text-center space-y-4 md:space-y-6 flex flex-col items-center">
        <div className="relative inline-block">
             <div className="border border-zen-gold/30 py-6 px-8 md:py-8 md:px-16 bg-zen-black/50 backdrop-blur-sm rounded-3xl md:rounded-full max-w-full">
                <h2 className="text-2xl md:text-4xl font-serif text-zen-paper leading-relaxed md:leading-tight tracking-widest break-words">
                {data.verse}
                </h2>
            </div>
            {/* Audio Control */}
            {data.verseAudio && (
                <button 
                    onClick={toggleAudio}
                    className="absolute -right-4 -bottom-4 bg-zen-gray/80 p-2 rounded-full border border-zen-gold/20 text-zen-gold/70 hover:text-zen-gold hover:scale-110 transition-all"
                >
                    {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
            )}
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-zen-red">
             <div className="h-[1px] w-6 md:w-8 bg-zen-red/40 rounded-full"></div>
             <p className="text-[10px] md:text-xs uppercase tracking-[0.5em]">偈语 显现</p>
             <div className="h-[1px] w-6 md:w-8 bg-zen-red/40 rounded-full"></div>
        </div>
      </div>

      {/* Three Mirrors */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-4 md:space-y-6">
            {/* Rounded Tabs/Pills */}
            <div className="flex space-x-2 md:space-x-4 pb-2 overflow-x-auto">
                {(['essence', 'circumstance', 'action'] as const).map((key) => (
                    <button
                        key={key}
                        onClick={() => setActiveMirror(key)}
                        className={`px-4 py-1.5 md:py-2 text-sm md:text-lg transition-all duration-300 font-serif tracking-widest rounded-full whitespace-nowrap ${activeMirror === key ? 'bg-zen-gray/20 text-zen-gold scale-105' : 'text-zen-paper/40 hover:text-zen-paper/60 hover:bg-zen-gray/10'}`}
                    >
                        {key === 'essence' ? '自性' : key === 'circumstance' ? '境遇' : '回首'}
                    </button>
                ))}
            </div>
            <div className="min-h-[120px] md:min-h-[150px] flex items-center relative pl-2">
                 <div className="absolute -left-2 md:-left-4 top-0 text-4xl md:text-6xl text-zen-gold/10 font-serif">“</div>
                 <p className="text-base md:text-xl text-zen-paper/90 font-light leading-loose animate-fade-in key={activeMirror} pl-4 pr-2 text-justify">
                    {data.threeMirrors[activeMirror]}
                 </p>
            </div>
        </div>

        {/* The Sticking Point Question - Rounded Box */}
        <div className="bg-zen-gray/10 border border-zen-red/20 p-6 md:p-10 rounded-3xl relative overflow-hidden group hover:border-zen-red/40 transition-colors duration-500 mt-4 md:mt-0">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Eye className="w-16 h-16 md:w-24 md:h-24 text-zen-red" />
            </div>
            <h3 className="text-zen-red font-serif text-xs md:text-sm mb-3 md:mb-4 tracking-widest uppercase flex items-center gap-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-zen-red"></div>
                不肯回头之问
            </h3>
            <p className="text-lg md:text-2xl font-serif text-zen-paper leading-relaxed">
                "{data.stickingPointQuestion}"
            </p>
        </div>
      </div>

      {/* Philosopher's Note - Rounded Container */}
      <div className="bg-zen-paper/5 p-6 md:p-8 max-w-2xl mx-auto w-full rounded-3xl relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-zen-gold rounded-full"></div>
        <div className="pl-4 md:pl-6">
            <p className="text-base md:text-lg italic text-zen-paper/70 font-serif leading-loose text-justify">
                {data.philosopherNote}
            </p>
            <p className="text-right text-[10px] md:text-xs text-zen-paper/30 mt-4 tracking-widest">—— 先贤 旁注</p>
        </div>
      </div>

      <div className="flex justify-center pt-4 md:pt-8">
        <button 
            onClick={onNext}
            className="animate-bounce text-zen-paper/50 hover:text-zen-gold transition-colors flex flex-col items-center gap-2"
        >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em]">观 歧路</span>
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

    </div>
  );
};

export default PhaseInterpret;