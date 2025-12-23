
import React, { useState, useRef } from 'react';
import { AnalysisResult } from '../types';
import { Download, Sparkles, Flame, CloudFog, AlertCircle } from 'lucide-react';

interface Props {
  data: AnalysisResult;
  onNext: () => void;
}

const PhaseVisualize: React.FC<Props> = ({ data, onNext }) => {
  const [burning, setBurning] = useState(false);
  const [burned, setBurned] = useState(false);
  const pressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [progress, setProgress] = useState(0);

  const handlePointerDown = () => {
    if (burned) return;
    setBurning(true);
    let currentProgress = 0;
    
    // Start the burn timer
    pressTimer.current = setInterval(() => {
      currentProgress += 2; // Burn speed
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        if (pressTimer.current) clearInterval(pressTimer.current);
        setBurned(true);
        setTimeout(onNext, 1500); // Wait for dissolve animation before moving next
      }
    }, 30);
  };

  const handlePointerUp = () => {
    if (burned) return;
    setBurning(false);
    setProgress(0);
    if (pressTimer.current) clearInterval(pressTimer.current);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent burn trigger
    if (data.generatedImage) {
      const link = document.createElement('a');
      link.href = data.generatedImage;
      link.download = `reflecting-light-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-4xl mx-auto min-h-[80vh] flex flex-col justify-center items-center space-y-8 animate-fade-in p-6 relative">
      
      <div className={`text-center space-y-4 transition-opacity duration-1000 ${burned ? 'opacity-0' : 'opacity-100'}`}>
        <h2 className="text-2xl md:text-3xl font-serif text-zen-gold tracking-[0.3em] flex items-center justify-center gap-3">
           <Sparkles className="w-5 h-5 opacity-70" />
           心相 显化
           <Sparkles className="w-5 h-5 opacity-70" />
        </h2>
        <p className="text-zen-paper/60 font-light text-xs md:text-sm tracking-widest">
           此乃尔之心魔。若欲解惑，必先放下。
        </p>
      </div>

      {/* Image Container */}
      <div className="relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(197,160,89,0.15)] border border-zen-gray group select-none bg-zen-black/50">
        {data.generatedImage ? (
          <>
            <div 
                className={`relative w-full h-full transition-all duration-[2000ms] ease-in-out
                ${burned ? 'opacity-0 scale-150 blur-xl brightness-200' : ''}
                ${burning && !burned ? 'filter contrast-150 brightness-110' : ''}
                `}
                style={{
                    // Simulate heat distortion during press
                    transform: burning && !burned ? `scale(${1 + progress/500})` : undefined
                }}
            >
                <img 
                src={data.generatedImage} 
                alt="Visualization of inner state" 
                className="w-full h-full object-cover"
                />
                
                {/* Burn Overlay */}
                <div 
                    className="absolute inset-0 bg-gradient-to-t from-zen-gold via-zen-red to-transparent mix-blend-color-dodge transition-opacity duration-300 pointer-events-none"
                    style={{ opacity: progress / 100 }}
                />
            </div>

            {/* Download Button (Only visible if not burning) */}
            <div className={`absolute top-4 right-4 transition-opacity duration-300 ${burning || burned ? 'opacity-0' : 'opacity-100'}`}>
                 <button 
                    onClick={handleDownload}
                    className="bg-black/40 backdrop-blur-md p-2 rounded-full text-zen-paper/70 hover:text-zen-gold hover:bg-black/60 transition-colors"
                >
                    <Download className="w-5 h-5" />
                </button>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center flex-col space-y-6 p-6 text-center animate-pulse-slow relative">
             <CloudFog className="w-20 h-20 text-zen-gray/30" />
             <div className="space-y-2">
                <p className="text-zen-paper/40 text-sm font-serif tracking-widest">心 雾 过 浓</p>
                <p className="text-zen-paper/20 text-xs font-light">
                    妄念太深，难以成相。<br/>然心诚则灵，亦可直接解脱。
                </p>
             </div>
             
             {/* Error Details for Debugging */}
             {data.imageError && (
                 <div className="absolute bottom-6 left-0 right-0 px-4">
                     <div className="flex items-center justify-center gap-2 text-zen-red/50 text-[10px] bg-zen-black/60 p-2 rounded">
                        <AlertCircle className="w-3 h-3" />
                        <span className="font-mono">{data.imageError}</span>
                     </div>
                 </div>
             )}
          </div>
        )}
      </div>

      {/* The Ritual Button */}
      <div className={`pt-6 transition-all duration-500 ${burned ? 'opacity-0 translate-y-10' : 'opacity-100'}`}>
        <button
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="group relative flex items-center justify-center w-20 h-20 rounded-full border border-zen-gold/30 text-zen-paper hover:border-zen-gold transition-all duration-300 active:scale-95 touch-none"
        >
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
             <circle
               cx="40" cy="40" r="38"
               stroke="currentColor" strokeWidth="2"
               fill="none" className="text-zen-gray/20"
             />
             <circle
               cx="40" cy="40" r="38"
               stroke="#c5a059" strokeWidth="2"
               fill="none" 
               strokeDasharray="239"
               strokeDashoffset={239 - (239 * progress) / 100}
               className="transition-all duration-75 ease-linear"
             />
          </svg>
          
          <div className={`transition-colors duration-300 ${burning ? 'text-zen-red' : 'text-zen-gold'}`}>
             <Flame className={`w-8 h-8 ${burning ? 'animate-pulse' : ''}`} />
          </div>
          
          <div className="absolute -bottom-10 text-[10px] text-zen-paper/40 tracking-[0.3em] whitespace-nowrap uppercase">
             {burning ? "释 放..." : "长按 解脱"}
          </div>
        </button>
      </div>

    </div>
  );
};

export default PhaseVisualize;
