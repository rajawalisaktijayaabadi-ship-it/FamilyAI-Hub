export class StreamingService {
  /**
   * Simulates a streaming typing effect token-by-token or chunk-by-chunk for smooth UI response.
   */
  static simulateStreaming(
    fullText: string,
    onChunk: (chunk: string) => void,
    onComplete: () => void,
    speedMs: number = 20
  ): () => void {
    let index = 0;
    const interval = setInterval(() => {
      index += 3;
      if (index >= fullText.length) {
        onChunk(fullText);
        clearInterval(interval);
        onComplete();
      } else {
        onChunk(fullText.slice(0, index));
      }
    }, speedMs);

    // Return cleanup function to cancel streaming if needed
    return () => clearInterval(interval);
  }
}
