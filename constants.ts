import { SufferingType, MoodCard } from './types';

export const SUFFERING_OPTIONS = [
  { value: SufferingType.Loss, label: "失去 (哀伤/分离)" },
  { value: SufferingType.Unknown, label: "未知 (焦虑/恐惧)" },
  { value: SufferingType.Desire, label: "欲望 (贪婪/渴求)" },
  { value: SufferingType.Order, label: "秩序 (控制/完美)" },
  { value: SufferingType.Meaning, label: "意义 (空虚/虚无)" },
  { value: SufferingType.Relationship, label: "关系 (冲突/孤独)" },
  { value: SufferingType.Self, label: "自我 (执念/身份)" },
  { value: SufferingType.Past, label: "过去 (悔恨/创伤)" },
  { value: SufferingType.Future, label: "未来 (担忧/期待)" },
];

// Helper to create SVG Data URI
const createSvgUrl = (svgContent: string) => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent.trim())}`;
};

// Colors: Background #1a1a1a, Gold #c5a059, Gray #333333
const bg = '#1a1a1a';
const gold = '#c5a059';
const gray = '#333333';
const paper = '#e8e6e1';

// Expanded to 12 Cards with Deep, Abstract Zen Arts
export const MOOD_CARDS: MoodCard[] = [
  { 
    id: '1', 
    // Tangled: A chaotic, organic knot that looks like roots or unkempt thread.
    imageUrl: createSvgUrl(`
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450' style='background-color:${bg}'>
        <defs>
          <filter id='noise1'><feTurbulence type='fractalNoise' baseFrequency='0.01' numOctaves='3' result='noise'/><feDisplacementMap in='SourceGraphic' in2='noise' scale='20' /></filter>
        </defs>
        <g filter='url(#noise1)' opacity='0.8'>
          <path d='M50,225 C50,100 250,100 250,225 C250,350 50,350 50,225 M80,225 C80,150 220,150 220,225 C220,300 80,300 80,225' stroke='${gray}' stroke-width='2' fill='none'/>
          <path d='M100,200 C150,50 200,400 150,225 C100,50 250,300 120,225' stroke='${gold}' stroke-width='1.5' fill='none' opacity='0.7'/>
          <path d='M60,250 C120,350 180,150 240,250' stroke='${gray}' stroke-width='1' fill='none' opacity='0.5'/>
        </g>
      </svg>
    `), 
    abstractKey: 'Tangled',
    label: '挂 碍' 
  },
  { 
    id: '2', 
    // Solitude: A vast void with a single, tiny vertical element. Minimalist.
    imageUrl: createSvgUrl(`
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450' style='background-color:${bg}'>
        <defs>
          <linearGradient id='grad2' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stop-color='${bg}'/>
            <stop offset='100%' stop-color='#222'/>
          </linearGradient>
        </defs>
        <rect width='100%' height='100%' fill='url(#grad2)'/>
        <line x1='0' y1='380' x2='300' y2='380' stroke='${gray}' stroke-width='0.5' opacity='0.5'/>
        <rect x='148' y='360' width='4' height='20' fill='${gold}' opacity='0.9'/>
        <rect x='148' y='380' width='4' height='40' fill='${gold}' opacity='0.1'/>
      </svg>
    `), 
    abstractKey: 'Solitude',
    label: '独 行' 
  },
  { 
    id: '3', 
    // Fog: Heavy Gaussian blur layers obscuring a shape.
    imageUrl: createSvgUrl(`
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450' style='background-color:${bg}'>
        <defs>
          <filter id='blur3'><feGaussianBlur in='SourceGraphic' stdDeviation='25' /></filter>
        </defs>
        <circle cx='50' cy='100' r='100' fill='${gray}' opacity='0.3' filter='url(#blur3)'/>
        <circle cx='250' cy='350' r='120' fill='${gray}' opacity='0.3' filter='url(#blur3)'/>
        <circle cx='150' cy='225' r='60' fill='${gold}' opacity='0.15' filter='url(#blur3)'/>
        <rect width='100%' height='100%' fill='none' stroke='${bg}' stroke-width='40'/>
      </svg>
    `), 
    abstractKey: 'Fog',
    label: '迷 障' 
  },
  { 
    id: '4', 
    // Ruins: Shattered geometric shards falling.
    imageUrl: createSvgUrl(`
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450' style='background-color:${bg}'>
        <g transform='translate(150,225) rotate(15)'>
           <rect x='-40' y='-40' width='80' height='80' stroke='${gold}' stroke-width='1' fill='none' opacity='0.6'/>
           <rect x='-35' y='-35' width='70' height='70' fill='${bg}' stroke='none'/>
           <path d='M-50,-60 L50,60' stroke='${gray}' stroke-width='1' opacity='0.5'/>
           <path d='M60,-50 L-60,50' stroke='${gray}' stroke-width='1' opacity='0.5'/>
        </g>
        <path d='M100,350 L120,380 L140,360' fill='${gray}' opacity='0.5'/>
        <path d='M200,100 L180,80 L220,70' fill='${gray}' opacity='0.3'/>
      </svg>
    `), 
    abstractKey: 'Ruins',
    label: '无 常' 
  },
  { 
    id: '5', 
    // Cage: Vertical lines that are rigid, but one is bent/warped.
    imageUrl: createSvgUrl(`
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450' style='background-color:${bg}'>
        <defs>
            <linearGradient id='fade5' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stop-color='${gray}' stop-opacity='0'/>
                <stop offset='50%' stop-color='${gray}' stop-opacity='1'/>
                <stop offset='100%' stop-color='${gray}' stop-opacity='0'/>
            </linearGradient>
        </defs>
        <g stroke='url(#fade5)' stroke-width='2'>
            <line x1='60' y1='50' x2='60' y2='400'/>
            <line x1='100' y1='50' x2='100' y2='400'/>
            <path d='M140,50 Q160,225 140,400' stroke='${gold}' stroke-opacity='0.6'/>
            <line x1='180' y1='50' x2='180' y2='400'/>
            <line x1='220' y1='50' x2='220' y2='400'/>
        </g>
      </svg>
    `), 
    abstractKey: 'Cage',
    label: '樊 笼' 
  },
  { 
    id: '6', 
    // Silence: A single ripple in a dark pond.
    imageUrl: createSvgUrl(`
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450' style='background-color:${bg}'>
        <circle cx='150' cy='225' r='120' fill='none' stroke='${gray}' stroke-width='0.5' opacity='0.1'/>
        <circle cx='150' cy='225' r='80' fill='none' stroke='${gray}' stroke-width='0.5' opacity='0.2'/>
        <circle cx='150' cy='225' r='40' fill='none' stroke='${gray}' stroke-width='0.5' opacity='0.4'/>
        <circle cx='150' cy='225' r='2' fill='${gold}' opacity='0.9'/>
      </svg>
    `), 
    abstractKey: 'Silence',
    label: '寂 灭' 
  },
  { 
    id: '7', 
    // Floating: Wavy vertical lines rising like smoke or water plants.
    imageUrl: createSvgUrl(`
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450' style='background-color:${bg}'>
        <path d='M100,450 Q120,350 100,250 T100,50' stroke='${gray}' fill='none' stroke-width='1' opacity='0.3'/>
        <path d='M150,450 Q130,350 150,250 T150,50' stroke='${gold}' fill='none' stroke-width='1' opacity='0.5'/>
        <path d='M200,450 Q220,350 200,250 T200,50' stroke='${gray}' fill='none' stroke-width='1' opacity='0.3'/>
        <circle cx='150' cy='100' r='5' fill='${gold}' opacity='0.2'/>
      </svg>
    `), 
    abstractKey: 'Floating',
    label: '浮 生' 
  },
  { 
    id: '8', 
    // Illusion: Moiré pattern effect (overlapping grids).
    imageUrl: createSvgUrl(`
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450' style='background-color:${bg}'>
        <defs>
            <pattern id='grid8' width='10' height='10' patternUnits='userSpaceOnUse'>
                <path d='M10,0 L0,10' stroke='${gray}' stroke-width='0.5'/>
            </pattern>
        </defs>
        <circle cx='150' cy='200' r='60' fill='url(#grid8)' opacity='0.6'/>
        <circle cx='150' cy='220' r='60' fill='url(#grid8)' opacity='0.6' stroke='${gold}' stroke-width='1'/>
      </svg>
    `), 
    abstractKey: 'Illusion',
    label: '虚 妄' 
  },
  { 
    id: '9', 
    // Dust: Noise texture with a "spotlight" beam.
    imageUrl: createSvgUrl(`
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450' style='background-color:${bg}'>
        <defs>
            <filter id='noise9'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/><feColorMatrix type='saturate' values='0'/></filter>
            <mask id='beam'>
                <path d='M100,0 L200,0 L300,450 L0,450 Z' fill='white' opacity='0.5'/>
            </mask>
        </defs>
        <rect width='100%' height='100%' filter='url(#noise9)' opacity='0.2' mask='url(#beam)'/>
        <circle cx='150' cy='225' r='100' fill='url(#noise9)' opacity='0.1' stroke='${gold}' stroke-width='0.5' stroke-dasharray='2 4'/>
      </svg>
    `), 
    abstractKey: 'Dust',
    label: '尘 埃' 
  },
  { 
    id: '10', 
    // Beyond: A horizon line separating dark and light reflection.
    imageUrl: createSvgUrl(`
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450' style='background-color:${bg}'>
        <defs>
            <linearGradient id='grad10' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stop-color='${gray}' stop-opacity='0'/>
                <stop offset='50%' stop-color='${gold}' stop-opacity='0.2'/>
                <stop offset='50.1%' stop-color='${gold}' stop-opacity='0.8'/>
                <stop offset='100%' stop-color='${bg}' stop-opacity='1'/>
            </linearGradient>
        </defs>
        <rect width='100%' height='100%' fill='url(#grad10)'/>
        <line x1='50' y1='225' x2='250' y2='225' stroke='${paper}' stroke-width='0.5' opacity='0.8'/>
      </svg>
    `), 
    abstractKey: 'Beyond',
    label: '彼 岸' 
  },
  { 
    id: '11', 
    // Stone: A heavy, textured rock suspended in void.
    imageUrl: createSvgUrl(`
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450' style='background-color:${bg}'>
        <path d='M100,200 Q150,150 200,200 Q220,250 180,280 Q150,300 120,280 Q80,250 100,200 Z' fill='${bg}' stroke='${gray}' stroke-width='2'/>
        <path d='M100,200 Q150,150 200,200 Q220,250 180,280 Q150,300 120,280 Q80,250 100,200 Z' fill='none' stroke='${gold}' stroke-width='0.5' opacity='0.5' transform='translate(5,5)'/>
      </svg>
    `), 
    abstractKey: 'Stone',
    label: '须 弥' 
  },
  { 
    id: '12', 
    // Chaos: Swirling vortex lines.
    imageUrl: createSvgUrl(`
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450' style='background-color:${bg}'>
        <g opacity='0.6'>
            <path d='M150,225 m-100,0 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0' stroke='${gray}' fill='none' stroke-dasharray='10 20' stroke-width='1'/>
            <path d='M150,225 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0' stroke='${gold}' fill='none' stroke-width='0.5' transform='rotate(45 150 225)'/>
            <path d='M150,225 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0' stroke='${gray}' fill='none' stroke-width='2' transform='rotate(-45 150 225)'/>
        </g>
      </svg>
    `), 
    abstractKey: 'Chaos',
    label: '混 沌' 
  }
];

export const PRE_LOADED_QUOTES = [
  "船过水无痕，为何系旧锚？",
  "水中捞月，却不见天上月。",
  "重门本未锁，奈何向内推。",
];