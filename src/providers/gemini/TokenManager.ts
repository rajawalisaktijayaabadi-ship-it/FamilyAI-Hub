export class TokenManager {
  private static MAX_CONTEXT_TOKENS = 1000000; // Gemini Flash 1M context

  /**
   * Approximate token count based on word & character count for Indonesian & English text.
   */
  public static estimateTokens(text: string): number {
    if (!text) return 0;
    // Average 1 token ≈ 4 characters or 0.75 words
    const charCount = text.length;
    const wordCount = text.trim().split(/\s+/).length;
    return Math.ceil(Math.max(charCount / 4, wordCount / 0.75));
  }

  public static isWithinTokenLimit(text: string, maxLimit = TokenManager.MAX_CONTEXT_TOKENS): boolean {
    return this.estimateTokens(text) <= maxLimit;
  }

  public static truncateToTokenLimit(text: string, maxTokens = 4000): string {
    const estimated = this.estimateTokens(text);
    if (estimated <= maxTokens) return text;

    const charLimit = maxTokens * 4;
    return text.substring(0, charLimit) + '\n...[Teks dipotong karena melebihi batas batas token]';
  }
}
