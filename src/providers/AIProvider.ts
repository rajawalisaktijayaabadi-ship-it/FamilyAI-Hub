export interface AIResponse<T = string> {
  data: T;
  rawResponse?: string;
  tokensUsed?: number;
  latencyMs?: number;
  model: string;
  success: boolean;
  error?: string;
}

export interface AIProvider {
  chat(message: string, context?: Record<string, any>): Promise<AIResponse<string>>;
  stream(message: string, onChunk: (chunk: string) => void, context?: Record<string, any>): Promise<AIResponse<string>>;
  summarize(text: string): Promise<AIResponse<string>>;
  embedding(text: string): Promise<AIResponse<number[]>>;
  vision(imageData: string, prompt: string): Promise<AIResponse<string>>;
  document(documentData: string, mimeType: string, prompt: string): Promise<AIResponse<string>>;
  translation(text: string, targetLang: string): Promise<AIResponse<string>>;
  classification(text: string, categories: string[]): Promise<AIResponse<string>>;
  recommendation(userPreferences: Record<string, any>, context: Record<string, any>): Promise<AIResponse<any>>;
  reasoning(problem: string): Promise<AIResponse<any>>;
  planning(goal: string, context?: Record<string, any>): Promise<AIResponse<any>>;
}
