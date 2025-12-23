import React, { useState, useEffect } from 'react';
import { MOOD_CARDS, SUFFERING_OPTIONS } from '../constants';
import { SufferingType, UserInput, MoodCard } from '../types';

interface Props {
  onComplete: (data: UserInput) => void;
}

const PhaseDiagnose: React.FC<Props> = ({ onComplete }) => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [confusionText, setConfusionText] = useState('');
  const [sufferingType, setSufferingType] = useState<SufferingType | null>(null);
  const [displayCards, setDisplayCards] = useState<MoodCard[]>([]);

  // Randomly select 6 cards from the pool of 12 on component mount
  useEffect(() => {
    // Fisher-Yates shuffle algorithm for better randomness
    const shuffled = [...MOOD_CARDS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setDisplayCards(shuffled.slice(0, 6));
  }, []);

  const toggleCard = (id: string) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(prev => prev.filter(c => c !== id));
    } else {
      if (selectedCards.length < 3) {
        setSelectedCards(prev => [...prev, id]);
      }
    }
  };

  const handleNext = () => {
    if (confusionText && sufferingType && selectedCards.length > 0) {
      onComplete({
        selectedCards,
        confusionText,
        sufferingType,
      });
    }
  };

  const isReady = confusionText.length > 2 && sufferingType !== null && selectedCards.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-12 md:space-y-16 animate-fade-in p-4 md:p-6 pb-20">
      <div className="text-center space-y-3 md:space-y-4">
        <h2 className="text-2xl md:text-3xl font-serif text-zen-gold tracking-[0.2em]">观照 心相</h2>
        <div className="flex justify-center">
            {/* Rounded divider */}
            <div className="w-12 h-1 bg-zen-gold/30 rounded-full"></div>
        </div>
        <p className="text-zen-paper/60 font-light text-xs md:text-sm">凭直觉择取一至三张，映照此刻心境。</p>
      </div>

      {/* 1. Card Selection (Rounded Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 px-1 md:px-2">
        {displayCards.map((card) => {
          const isSelected = selectedCards.includes(card.id);
          return (
            <div
              key={card.id}
              onClick={() => toggleCard(card.id)}
              className={`
                group relative cursor-pointer transition-all duration-500 flex flex-col items-center gap-2 md:gap-3
                ${isSelected ? 'scale-95' : 'hover:-translate-y-2'}
              `}
            >
              {/* Card Frame - Changed to rounded-3xl for "Enso" feel */}
              <div className={`
                relative aspect-[2/3] w-full overflow-hidden rounded-3xl border-[2px] md:border-[3px] transition-colors duration-500
                ${isSelected ? 'border-zen-gold shadow-[0_0_15px_rgba(197,160,89,0.3)]' : 'border-zen-gray group-hover:border-zen-paper/30'}
              `}>
                <img 
                  src={card.imageUrl} 
                  alt={card.label} 
                  className={`w-full h-full object-cover transition-all duration-700 ${isSelected ? 'grayscale-0 sepia-[.2]' : 'grayscale contrast-125 brightness-75 group-hover:grayscale-0'}`} 
                />
                
                {/* Overlay for selection */}
                {isSelected && (
                  <div className="absolute inset-0 bg-zen-gold/10 pointer-events-none"></div>
                )}
                
                {/* Back pattern overlay (subtle texture) */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none mix-blend-overlay"></div>
              </div>

              {/* Card Label */}
              <div className={`
                text-[10px] md:text-xs font-serif tracking-[0.3em] md:tracking-[0.5em] uppercase transition-colors duration-300
                ${isSelected ? 'text-zen-gold' : 'text-zen-paper/40 group-hover:text-zen-paper/70'}
              `}>
                [{card.label}]
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Confusion Text - Rounded Input */}
      <div className="space-y-4 md:space-y-6 relative max-w-2xl mx-auto">
        <div className="flex items-center space-x-3 md:space-x-4 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-zen-gold/50"></div>
            <label className="block text-zen-paper/90 font-serif text-base md:text-lg tracking-wide">
            心中何事，久未释怀？
            </label>
        </div>
        <div className="relative group">
            {/* Rounded Textarea */}
            <textarea
            value={confusionText}
            onChange={(e) => setConfusionText(e.target.value)}
            placeholder="以此陈述，不为求人，只为问己……"
            className="w-full bg-zen-black/50 border border-zen-gray rounded-3xl p-6 md:p-8 text-zen-paper placeholder-zen-paper/20 focus:outline-none focus:border-zen-gold/50 transition-all resize-none h-40 md:h-48 leading-relaxed font-serif tracking-wide text-sm md:text-base"
            />
            {/* Rounded gradient line */}
            <div className="absolute bottom-6 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-zen-gold/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
        </div>
      </div>

      {/* 3. Suffering Type - Rounded Buttons */}
      <div className="space-y-4 md:space-y-6 max-w-2xl mx-auto">
        <div className="flex items-center space-x-3 md:space-x-4 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-zen-gold/50"></div>
            <label className="block text-zen-paper/90 font-serif text-base md:text-lg tracking-wide">
            痛之根源
            </label>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {SUFFERING_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSufferingType(opt.value)}
              className={`
                px-4 md:px-6 py-2 md:py-2.5 rounded-full border text-xs md:text-sm transition-all duration-300 font-serif tracking-wider
                ${sufferingType === opt.value 
                  ? 'bg-zen-gold/10 text-zen-gold border-zen-gold shadow-[0_0_10px_rgba(197,160,89,0.1)]' 
                  : 'bg-transparent text-zen-paper/50 border-zen-gray hover:border-zen-paper/40 hover:text-zen-paper/80'}
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action - Fully Rounded Button */}
      <div className="flex justify-center pt-8 md:pt-12">
        <button
          onClick={handleNext}
          disabled={!isReady}
          className={`
            group flex items-center space-x-3 md:space-x-4 px-10 md:px-12 py-3 md:py-4 rounded-full border transition-all duration-700 relative overflow-hidden
            ${isReady 
              ? 'border-zen-gold/60 text-zen-gold hover:border-zen-gold hover:bg-zen-gold/5' 
              : 'border-zen-gray/30 text-zen-gray cursor-not-allowed grayscale'}
          `}
        >
          {/* Subtle glow background */}
          <div className={`absolute inset-0 bg-radial-gradient from-zen-gold/20 to-transparent opacity-0 transition-opacity duration-700 ${isReady ? 'group-hover:opacity-100' : ''}`}></div>
          
          <span className="relative text-lg md:text-xl tracking-[0.4em] font-serif z-10 pl-2">叩 问</span>
          
          {/* Animated icon */}
          <div className={`relative z-10 transition-transform duration-500 ${isReady ? 'group-hover:translate-x-1' : ''}`}>
             {/* Rounded Arrow/Diamond */}
             <div className="w-2 h-2 border-t border-r border-zen-gold rotate-45 rounded-[1px]"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PhaseDiagnose;