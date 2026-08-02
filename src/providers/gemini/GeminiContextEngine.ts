export interface FamilyModuleContext {
  mood?: any;
  calendar?: any[];
  health?: any[];
  finance?: any;
  insurance?: any[];
  shopping?: any[];
  inventory?: any[];
  mealPlanner?: any;
  travel?: any[];
  education?: any[];
  psychology?: any[];
  familyMemory?: any[];
  smartHome?: any[];
  notifications?: any[];
  tasks?: any[];
}

export class GeminiContextEngine {
  private moduleContexts: FamilyModuleContext = {};

  public updateModuleContext<K extends keyof FamilyModuleContext>(
    moduleName: K,
    data: FamilyModuleContext[K]
  ): void {
    this.moduleContexts[moduleName] = data;
  }

  public getUnifiedContext(): FamilyModuleContext {
    return { ...this.moduleContexts };
  }

  public getContextForPrompt(): string {
    const activeData: Record<string, any> = {};
    for (const [key, val] of Object.entries(this.moduleContexts)) {
      if (val !== undefined && val !== null) {
        activeData[key] = val;
      }
    }
    return JSON.stringify(activeData);
  }

  public clear(): void {
    this.moduleContexts = {};
  }
}
