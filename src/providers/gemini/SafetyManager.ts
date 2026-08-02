export class SafetyManager {
  private static SENSITIVE_PATTERNS = [
    /\b\d{16}\b/g, // Credit card 16 digits
    /\b\d{3,4}\b/g, // CVV
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, // Email (masked if needed)
    /password\s*[:=]\s*\S+/gi, // Passwords
  ];

  private static TOXIC_WORDS = [
    'hate', 'kill', 'racist', 'terrorist', 'self-harm', 'suicide'
  ];

  /**
   * Sanitizes input prompt by removing or masking sensitive data like credit cards or raw passwords.
   */
  public static sanitizePrompt(prompt: string): string {
    let sanitized = prompt;
    // Mask potential credit card numbers
    sanitized = sanitized.replace(/\b(\d{4})\d{8}(\d{4})\b/g, '$1********$2');
    // Mask password strings
    sanitized = sanitized.replace(/(password\s*[:=]\s*)(\S+)/gi, '$1[TERSEMBUNYI]');
    return sanitized;
  }

  /**
   * Checks if prompt contains toxic or unsafe keywords.
   */
  public static validateInput(prompt: string): { safe: boolean; reason?: string } {
    const lower = prompt.toLowerCase();
    for (const word of SafetyManager.TOXIC_WORDS) {
      if (lower.includes(word)) {
        return {
          safe: false,
          reason: `Input terdeteksi mengandung frasa berisiko atau berbahaya (${word}).`,
        };
      }
    }
    return { safe: true };
  }

  /**
   * Appends grounding and factual instruction to mitigate AI hallucination.
   */
  public static applyHallucinationMitigation(systemInstruction: string): string {
    return `${systemInstruction}\n\n[ATURAN AKURASI AI]: Jika Anda tidak memiliki informasi yang cukup atau tidak yakin mengenai fakta spesifik (seperti harga pasti atau medis darurat), katakan secara jujur dan berikan rekomendasi verifikasi langsung kepada sumber resmi. JANGAN membuat fakta palsu.`;
  }
}
