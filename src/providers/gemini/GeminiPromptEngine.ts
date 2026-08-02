import { PromptCategory, PROMPT_TEMPLATES, PromptTemplateConfig } from './PromptTemplate';
import { SafetyManager } from './SafetyManager';

export class GeminiPromptEngine {
  public static getTemplate(category: PromptCategory): PromptTemplateConfig {
    return PROMPT_TEMPLATES[category] || PROMPT_TEMPLATES.General;
  }

  public static buildPrompt(
    category: PromptCategory,
    userQuery: string,
    contextData?: Record<string, any>
  ): { systemInstruction: string; finalPrompt: string } {
    const template = this.getTemplate(category);
    const sanitizedUserQuery = SafetyManager.sanitizePrompt(userQuery);

    let systemInstruction = SafetyManager.applyHallucinationMitigation(
      template.systemInstruction
    );

    let contextString = '';
    if (contextData && Object.keys(contextData).length > 0) {
      contextString = `\n\n[KONTEKS KELUARGA SAAT INI]:\n${JSON.stringify(
        contextData,
        null,
        2
      )}`;
    }

    const finalPrompt = `${sanitizedUserQuery}${contextString}`;

    return {
      systemInstruction,
      finalPrompt,
    };
  }
}
