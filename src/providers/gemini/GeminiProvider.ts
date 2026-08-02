import { AIProvider, AIResponse } from '../AIProvider';
import { GeminiService } from './GeminiService';
import { GeminiPromptEngine } from './GeminiPromptEngine';
import { GeminiContextEngine } from './GeminiContextEngine';
import { GeminiMemoryEngine } from './GeminiMemoryEngine';
import { PromptCategory } from './PromptTemplate';
import { TokenManager } from './TokenManager';
import { StreamingManager } from './StreamingManager';

export class GeminiProvider implements AIProvider {
  private contextEngine: GeminiContextEngine;
  private memoryEngine: GeminiMemoryEngine;
  private streamingManager: StreamingManager;
  private modelName = 'gemini-3.6-flash';

  constructor() {
    this.contextEngine = new GeminiContextEngine();
    this.memoryEngine = new GeminiMemoryEngine();
    this.streamingManager = new StreamingManager();
  }

  public getContextEngine(): GeminiContextEngine {
    return this.contextEngine;
  }

  public getMemoryEngine(): GeminiMemoryEngine {
    return this.memoryEngine;
  }

  public async chat(
    message: string,
    context?: Record<string, any>
  ): Promise<AIResponse<string>> {
    const startTime = Date.now();
    try {
      const category: PromptCategory = context?.category || 'General';
      const promptData = GeminiPromptEngine.buildPrompt(
        category,
        message,
        context || this.contextEngine.getUnifiedContext()
      );

      const response = await GeminiService.sendChat(
        promptData.finalPrompt,
        category,
        context?.memberName || 'Anggota Keluarga',
        context
      );

      const textResult = response.reply || response;
      const latencyMs = Date.now() - startTime;
      const tokensUsed = TokenManager.estimateTokens(message + textResult);

      this.memoryEngine.addMessage({
        id: `msg-${Date.now()}`,
        sender: 'user',
        content: message,
        timestamp: new Date().toISOString(),
        category,
      });

      this.memoryEngine.addMessage({
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: textResult,
        timestamp: new Date().toISOString(),
        category,
      });

      return {
        data: textResult,
        model: this.modelName,
        tokensUsed,
        latencyMs,
        success: true,
      };
    } catch (error: any) {
      return {
        data: 'Maaf, terjadi kesalahan saat memproses permintaan AI.',
        model: this.modelName,
        success: false,
        error: error?.message || 'Unknown Gemini error',
      };
    }
  }

  public async stream(
    message: string,
    onChunk: (chunk: string) => void,
    context?: Record<string, any>
  ): Promise<AIResponse<string>> {
    const chatRes = await this.chat(message, context);
    if (chatRes.success) {
      await this.streamingManager.simulateTypingEffect(chatRes.data, onChunk);
    } else {
      onChunk(chatRes.data);
    }
    return chatRes;
  }

  public async summarize(text: string): Promise<AIResponse<string>> {
    const prompt = `Rangkum teks berikut secara padat, informatif, dan mudah dipahami:\n\n${text}`;
    return this.chat(prompt, { category: 'General' });
  }

  public async embedding(text: string): Promise<AIResponse<number[]>> {
    // Return simulated 768-dim embedding vector
    const vector = new Array(768).fill(0).map(() => Math.random() - 0.5);
    return {
      data: vector,
      model: 'gemini-embedding-2-preview',
      tokensUsed: TokenManager.estimateTokens(text),
      success: true,
    };
  }

  public async vision(imageData: string, prompt: string): Promise<AIResponse<string>> {
    const combinedPrompt = `[ANALISIS GAMBAR MULTIMODAL]: ${prompt}\n[Data Gambar]: ${imageData.substring(
      0,
      100
    )}...`;
    return this.chat(combinedPrompt, { category: 'General' });
  }

  public async document(
    documentData: string,
    mimeType: string,
    prompt: string
  ): Promise<AIResponse<string>> {
    const combinedPrompt = `[ANALISIS DOKUMEN ${mimeType}]: ${prompt}\n[Isi Dokumen]: ${documentData.substring(
      0,
      200
    )}`;
    return this.chat(combinedPrompt, { category: 'General' });
  }

  public async translation(
    text: string,
    targetLang: string
  ): Promise<AIResponse<string>> {
    const prompt = `Terjemahkan teks berikut ke bahasa ${targetLang} secara natural dan akurat:\n\n${text}`;
    return this.chat(prompt, { category: 'General' });
  }

  public async classification(
    text: string,
    categories: string[]
  ): Promise<AIResponse<string>> {
    const prompt = `Kategorikan teks berikut ke dalam salah satu dari opsi [${categories.join(
      ', '
    )}]:\n\n"${text}"`;
    return this.chat(prompt, { category: 'General' });
  }

  public async recommendation(
    userPreferences: Record<string, any>,
    context: Record<string, any>
  ): Promise<AIResponse<any>> {
    const prompt = `Berikan rekomendasi personal terstruktur berdasar preferensi keluarga berikut:\nPreferensi: ${JSON.stringify(
      userPreferences
    )}\nKonteks: ${JSON.stringify(context)}`;
    const res = await this.chat(prompt, { category: 'Family' });
    return { ...res, data: { text: res.data } };
  }

  public async reasoning(problem: string): Promise<AIResponse<any>> {
    const prompt = `Analisis masalah berikut secara mendalam step-by-step:\n\n${problem}`;
    return this.chat(prompt, { category: 'General' });
  }

  public async planning(
    goal: string,
    context?: Record<string, any>
  ): Promise<AIResponse<any>> {
    const prompt = `Buat perencanaan milestone aksi nyata untuk mencapai target keluarga berikut:\nTarget: "${goal}"`;
    return this.chat(prompt, { category: 'Family', ...context });
  }
}

export const defaultGeminiProvider = new GeminiProvider();
