export class StreamingManager {
  private abortController: AbortController | null = null;

  public createController(): AbortController {
    this.abortController = new AbortController();
    return this.abortController;
  }

  public cancel(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  /**
   * Simulates typing effect for client streaming if chunked directly.
   */
  public async simulateTypingEffect(
    fullText: string,
    onChunk: (chunk: string) => void,
    delayMs = 15
  ): Promise<void> {
    const words = fullText.split(' ');
    let accumulated = '';
    for (let i = 0; i < words.length; i++) {
      accumulated += (i === 0 ? '' : ' ') + words[i];
      onChunk(accumulated);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}
