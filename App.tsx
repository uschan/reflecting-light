import React, { useState, useEffect } from 'react';
import { AppPhase, UserInput, AnalysisResult, ArchiveItem } from './types';
import PhaseDiagnose from './components/PhaseDiagnose';
import PhaseInterpret from './components/PhaseInterpret';
import PhaseJudge from './components/PhaseJudge';
import PhaseEnlighten from './components/PhaseEnlighten';
import PhaseVisualize from './components/PhaseVisualize';
import { analyzeConfusion, generateMindImage, generateVerseAudio } from './services/geminiService';
import { Loader2 } from 'lucide-react';

// Use a simple local storage key
const STORAGE_KEY = 'reflecting_light_archive';

// SVG Component for the Back-Turned God - Redesigned for more detail
const BackTurnedGodSVG = () => (
  <svg width="240" height="240" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90 drop-shadow-2xl">
    <defs>
      <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c5a059" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#8a6e30" stopOpacity="0.6" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* Abstract Halo / Light Wheel */}
    <g className="animate-spin-slow origin-center opacity-40">
        <circle cx="100" cy="90" r="70" stroke="url(#gold-grad)" strokeWidth="0.5" strokeDasharray="2 4" />
        <circle cx="100" cy="90" r="60" stroke="url(#gold-grad)" strokeWidth="0.5" strokeDasharray="10 10" />
    </g>
    
    {/* The Statue Figure (Back View) */}
    <g transform="translate(0, 10)">
        {/* Base/Lotus Hint */}
        <path d="M40 160 Q 100 175 160 160" stroke="#c5a059" strokeWidth="1" fill="none" opacity="0.3" />

        {/* Robes/Body - More organic drapery */}
        <path 
          d="M100 55 
             C 115 55, 128 62, 135 75 
             C 145 90, 155 120, 160 150 
             L 40 150 
             C 45 120, 55 90, 65 75 
             C 72 62, 85 55, 100 55 Z" 
          fill="#1a1a1a" 
          stroke="#c5a059" 
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Robe Folds (Detail lines for texture) */}
        <path d="M135 75 C 130 90, 120 120, 115 140" stroke="#c5a059" strokeWidth="0.5" fill="none" opacity="0.4" />
        <path d="M65 75 C 70 90, 80 120, 85 140" stroke="#c5a059" strokeWidth="0.5" fill="none" opacity="0.4" />
        <path d="M100 60 C 120 80, 140 85, 135 75" stroke="#c5a059" strokeWidth="0.5" fill="none" opacity="0.3" />
        <path d="M100 150 L 100 130" stroke="#c5a059" strokeWidth="0.5" fill="none" opacity="0.3" />

        {/* Head & Usnisha (Bun) */}
        <circle cx="100" cy="45" r="14" fill="#1a1a1a" stroke="#c5a059" strokeWidth="1.5" />
        {/* Hair texture hint */}
        <path d="M90 40 Q 100 35 110 40" stroke="#c5a059" strokeWidth="0.5" fill="none" opacity="0.5" />
        {/* The Bun */}
        <path d="M94 33 C 94 29, 106 29, 106 33" fill="#1a1a1a" stroke="#c5a059" strokeWidth="1.5" />
    </g>
  </svg>
);

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.Start);
  const [loading, setLoading] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [archive, setArchive] = useState<ArchiveItem[]>([]);

  // Load archive on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setArchive(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load archive", e);
      }
    }
  }, []);

  const handleDiagnosisComplete = async (input: UserInput) => {
    setLoading(true);
    try {
      // 1. Start Analysis (Text)
      const analysisPromise = analyzeConfusion(input);
      // 2. Start Image Generation
      const imagePromise = generateMindImage(input);
      
      // Wait for analysis first to get the verse, so we can generate audio
      const analysisResult = await analysisPromise;
      
      // 3. Start Audio Generation based on the verse
      const audioPromise = generateVerseAudio(analysisResult.verse);

      // Wait for Image and Audio
      const [imageUrl, audioBase64] = await Promise.all([imagePromise, audioPromise]);
      
      const fullResult: AnalysisResult = {
        ...analysisResult,
        generatedImage: imageUrl,
        verseAudio: audioBase64,
      };

      setCurrentAnalysis(fullResult);
      
      // Save to archive immediately upon generation
      const newItem: ArchiveItem = {
        ...fullResult,
        id: crypto.randomUUID(),
        originalInput: JSON.stringify(input),
      };
      
      const newArchive = [newItem, ...archive];
      setArchive(newArchive);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newArchive));

      // Go to Visualize phase first
      setPhase(AppPhase.Visualize);
    } catch (error) {
      alert("尘缘未了，连接中断。请重试。");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-fade-in px-4">
            <div className="relative">
                <div className="absolute inset-0 border-t-2 border-zen-gold rounded-full animate-spin"></div>
                <div className="w-16 h-16 border-2 border-zen-gray rounded-full opacity-20"></div>
            </div>
            <p className="text-zen-paper/60 font-serif tracking-[0.3em] text-base md:text-lg animate-pulse">
                凝 视 深 渊 ...
            </p>
        </div>
      );
    }

    switch (phase) {
      case AppPhase.Start:
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 md:space-y-12 animate-fade-in p-6 z-10 relative">
            <div className="animate-fade-in mb-2 md:mb-6 transform scale-90 md:scale-100">
                <BackTurnedGodSVG />
            </div>
            
            <div className="space-y-3 md:space-y-4">
                <h1 className="text-5xl md:text-8xl font-serif text-zen-paper tracking-tighter drop-shadow-lg">
                    回 <span className="text-zen-gold">光</span>
                </h1>
                <h2 className="text-base md:text-2xl text-zen-paper/60 font-light tracking-[0.4em] uppercase border-t border-b border-zen-paper/10 py-2 inline-block">
                    Reflecting Light
                </h2>
            </div>

            <div className="w-0.5 h-12 md:h-16 bg-gradient-to-b from-zen-gold to-transparent opacity-50 rounded-full"></div>
            
            <p className="max-w-xs md:max-w-md text-zen-paper/70 font-serif leading-loose text-base md:text-lg">
                “神像背坐，<br/>叹众生不肯回头。”
            </p>
            
            <button
                onClick={() => setPhase(AppPhase.Diagnose)}
                className="mt-8 md:mt-12 px-10 md:px-12 py-3 md:py-4 border border-zen-gold/50 text-zen-gold hover:bg-zen-gold hover:text-zen-black transition-all duration-700 rounded-full tracking-[0.3em] relative overflow-hidden group text-sm md:text-base"
            >
                <span className="relative z-10">以此 入空门</span>
            </button>
            
            {archive.length > 0 && (
                 <button
                    onClick={() => setPhase(AppPhase.Enlighten)}
                    className="text-xs text-zen-gray hover:text-zen-paper/50 tracking-[0.2em] mt-4 underline decoration-zen-gray underline-offset-4 transition-colors"
                >
                    阅 往昔
                </button>
            )}
          </div>
        );

      case AppPhase.Diagnose:
        return <PhaseDiagnose onComplete={handleDiagnosisComplete} />;

      case AppPhase.Visualize:
        return currentAnalysis ? (
            <PhaseVisualize 
                data={currentAnalysis}
                onNext={() => setPhase(AppPhase.Interpret)}
            />
        ) : null;

      case AppPhase.Interpret:
        return currentAnalysis ? (
          <PhaseInterpret 
            data={currentAnalysis} 
            onNext={() => setPhase(AppPhase.Judge)} 
          />
        ) : null;

      case AppPhase.Judge:
        return currentAnalysis ? (
            <PhaseJudge 
                data={currentAnalysis} 
                onNext={() => setPhase(AppPhase.Enlighten)} 
            />
        ) : null;

      case AppPhase.Enlighten:
        return <PhaseEnlighten history={archive} onRestart={() => setPhase(AppPhase.Diagnose)} />;
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zen-black text-zen-paper font-sans selection:bg-zen-gold/30 selection:text-white overflow-x-hidden relative">
      {/* Global CSS Pattern */}
      <style>{`
        .bg-pattern {
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5a059' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>

      {/* Background Layers */}
      <div className="fixed inset-0 bg-pattern pointer-events-none z-0"></div>
      
      <nav className="p-6 md:p-8 flex justify-between items-center fixed top-0 w-full z-40 bg-gradient-to-b from-zen-black via-zen-black/80 to-transparent pointer-events-none">
         <div className="pointer-events-auto cursor-pointer group" onClick={() => setPhase(AppPhase.Start)}>
            <div className="w-8 h-8 md:w-10 md:h-10 border border-zen-gold/30 rounded-full flex items-center justify-center group-hover:border-zen-gold transition-colors duration-500">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-zen-gold rounded-full group-hover:scale-125 transition-transform"></div>
            </div>
         </div>
      </nav>

      <main className="pt-20 md:pt-24 pb-12 relative z-10">
         {renderContent()}
      </main>

      {/* Ambient background effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-30">
         <div className="absolute top-[-20%] right-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-zen-gold/5 rounded-full blur-[80px] md:blur-[120px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-zen-gray/10 rounded-full blur-[100px] md:blur-[150px]"></div>
      </div>
    </div>
  );
};

export default App;