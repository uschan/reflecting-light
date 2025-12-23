
import { GoogleGenAI, Type, Schema, Modality } from "@google/genai";
import { UserInput, AnalysisResult, SufferingType } from "../types";
import { MOOD_CARDS } from "../constants";

const parseSufferingLabel = (type: SufferingType): string => {
  return type.toString();
};

// Use Abstract Keys (English) for Image Generation to ensure better adherence and safety
const getCardAbstractKeys = (cardIds: string[]): string => {
  return MOOD_CARDS.filter(c => cardIds.includes(c.id)).map(c => c.abstractKey).join(", ");
};

export const generateVerseAudio = async (verse: string): Promise<string | undefined> => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return undefined;
  
    const ai = new GoogleGenAI({ apiKey });
    const modelId = "gemini-2.5-flash-preview-tts";
  
    try {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: [{ parts: [{ text: verse }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Charon' }, // Charon has a deep, mythic quality suitable for a "God"
            },
          },
        },
      });
  
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      return base64Audio;
    } catch (error) {
      console.error("TTS Generation Error:", error);
      return undefined;
    }
  };

interface ImageGenerationResult {
  imageUrl?: string;
  error?: string;
}

export const generateMindImage = async (input: UserInput): Promise<ImageGenerationResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return { error: "API Key missing" };

  const ai = new GoogleGenAI({ apiKey });
  const modelId = "gemini-2.5-flash-image";

  // SAFER PROMPT STRATEGY:
  // Removed "Zdzisław Beksiński" as it often triggers safety filters for dark content.
  // Switched to "Abstract Zen Ink Wash" and "Mark Rothko" for a safer, more spiritual aesthetic.
  const prompt = `
    Vertical composition (9:16). Abstract spiritual art.
    Style: Ethereal ink wash painting mixed with Mark Rothko color fields. Minimalist, Zen, Dreamlike.
    
    Concept: Inner psychological state.
    Keywords: ${parseSufferingLabel(input.sufferingType)}, ${getCardAbstractKeys(input.selectedCards)}.
    
    Atmosphere: Misty, obscure, with a faint golden light in the distance.
    
    CONSTRAINTS: Abstract shapes only. No text. No faces. No realistic violence.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: [
        { parts: [{ text: prompt }] }
      ],
      config: {
        imageConfig: {
            aspectRatio: "9:16",
        }
      },
    });

    const candidate = response.candidates?.[0];
    
    // Check for finishReason issues (e.g. SAFETY)
    if (candidate?.finishReason && candidate.finishReason !== "STOP") {
        return { error: `Filtered: ${candidate.finishReason}` };
    }

    for (const part of candidate?.content?.parts || []) {
      if (part.inlineData) {
        return { imageUrl: `data:image/png;base64,${part.inlineData.data}` };
      }
    }
    
    return { error: "No image data returned" };
  } catch (error: any) {
    console.error("Image Generation Error:", error);
    let errorMsg = error.message || "Unknown error";
    // Provide hint for common 403 error which is likely Referrer related
    if (errorMsg.includes("403") || errorMsg.includes("permission")) {
        errorMsg = "403 Forbidden (Check API Key Referrer Restrictions)";
    }
    return { error: errorMsg };
  }
};

export const analyzeConfusion = async (input: UserInput): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
    你是一个名为“神像背坐”的哲学实体。
    你背对众生，不接受膜拜，只因叹息世人“不肯回头”。
    你的语气慈悲但疏离，深邃，充满禅意，有时如当头棒喝。
    
    用户正遭受关于 "${parseSufferingLabel(input.sufferingType)}" 的痛苦。
    他们的具体困惑是: "${input.confusionText}".
    
    你的目标不是解决世俗问题，而是揭示他们的“执念”（为何不肯回头）。
    
    请严格按照JSON Schema输出，内容必须是【中文】。
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      verse: { type: Type.STRING, description: "一句短小、如诗、神秘的偈语（4-10字），捕捉他们的心境。" },
      threeMirrors: {
        type: Type.OBJECT,
        properties: {
          essence: { type: Type.STRING, description: "自性：痛苦的内在根源。" },
          circumstance: { type: Type.STRING, description: "境遇：痛苦的外在显化。" },
          action: { type: Type.STRING, description: "回首：为何‘不肯回头’的行为描述。" },
        },
        required: ["essence", "circumstance", "action"],
      },
      stickingPointQuestion: { type: Type.STRING, description: "一个尖锐的、直击执念核心的反问。" },
      philosopherNote: { type: Type.STRING, description: "引用一位古代哲人或禅师的相关名言。" },
      futureScenarios: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "路径名称 (如: 消耗, 轮回, 沉沦)。" },
            description: { type: Type.STRING, description: "如果不改变，未来的叙事性描述。" },
          },
          required: ["name", "description"],
        },
      },
      godsSigh: { type: Type.STRING, description: "核心输出。格式：'神像背坐：叹尔......'" },
      awakeningStone: { type: Type.STRING, description: "觉醒之石：一个极小的、具体的、看似微不足道的行动建议，用于练习‘放下’。" },
    },
    required: ["verse", "threeMirrors", "stickingPointQuestion", "philosopherNote", "futureScenarios", "godsSigh", "awakeningStone"],
  };

  const modelId = "gemini-2.5-flash";

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: [
        {
          role: "user",
          parts: [{ text: `基于“神像背坐”的哲学分析此苦难。 Context: ${JSON.stringify(input)}` }],
        },
      ],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text) as AnalysisResult;
      data.timestamp = Date.now();
      return data;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
