import React, { useState, useRef } from 'react';
import { AnalysisResult } from '../types';
import { Download, Sparkles, Flame, CloudFog, AlertTriangle } from 'lucide-react';

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
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 relative bg-zen-black">
             {/* Abstract Fallback Visual - "The Void" */}
             <div className={`absolute inset-0 opacity-20 transition-all duration-500 ${burning ? 'scale-110 brightness-150' : 'animate-pulse-slow'}`}>
                 <svg viewBox="0 0 100 160" className="w-full h-full fill-zen-gray">
                    <circle cx="50" cy="80" r="40" filter="blur(20px)" />
                 </svg>
             </div>
             
             {/* Content */}
             <div className="relative z-10 space-y-4">
                 <CloudFog className="w-16 h-16 text-zen-gray/50 mx-auto" />
                 
                 <div className="space-y-1">
                    <p className="text-zen-paper/60 text-lg font-serif tracking-widest">无 相 之 相</p>
                    <p className="text-zen-paper/30 text-xs font-light max-w-[200px] mx-auto leading-relaxed">
                        心念过重，或缘法未到（额度耗尽）。<br/>
                        虽无图像，但执念仍在。<br/>
                        <span className="text-zen-gold/50">亦可直接长按，以此空相修心。</span>
                    </p>
                 </div>

                 {/* Error Hint */}
                 {data.imageError && (
                     <div className="mt-4 pt-4 border-t border-zen-gray/20 flex items-center justify-center gap-2 text-zen-red/40 text-[10px]">
                        <AlertTriangle className="w-3 h-3" />
                        <span className="font-mono max-w-[220px] truncate">{data.imageError}</span>
                     </div>
                 )}
             </div>

             {/* Burn Overlay for Fallback */}
             <div 
                className="absolute inset-0 bg-gradient-to-t from-zen-gold/20 via-zen-red/20 to-transparent transition-opacity duration-300 pointer-events-none"
                style={{ opacity: progress / 100 }}
            />
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