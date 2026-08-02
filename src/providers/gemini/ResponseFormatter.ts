export class ResponseFormatter {
  /**
   * Cleans markdown blocks from AI output string.
   */
  public static cleanMarkdownCodeBlock(text: string): string {
    if (!text) return '';
    let cleaned = text.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/, '').replace(/```$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\w*\s*/, '').replace(/```$/, '');
    }
    return cleaned.trim();
  }

  /**
   * Safely parses JSON response from AI.
   */
  public static parseJson<T = any>(text: string, fallback: T): T {
    try {
      const cleaned = this.cleanMarkdownCodeBlock(text);
      return JSON.parse(cleaned) as T;
    } catch (e) {
      console.warn('ResponseFormatter JSON parse error, using fallback:', e);
      return fallback;
    }
  }

  /**
   * Formats response text into structured bullet points or paragraphs.
   */
  public static formatTextResponse(text: string): string {
    if (!text) return '';
    return text.trim();
  }
}
