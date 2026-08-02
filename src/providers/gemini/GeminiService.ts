export class GeminiService {
  private static MAX_RETRIES = 3;
  private static RETRY_DELAY_MS = 1000;

  private static async fetchWithRetry(
    endpoint: string,
    body: any,
    retries = GeminiService.MAX_RETRIES
  ): Promise<any> {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (retries > 1) {
        await new Promise((resolve) => setTimeout(resolve, GeminiService.RETRY_DELAY_MS));
        return GeminiService.fetchWithRetry(endpoint, body, retries - 1);
      }
      throw error;
    }
  }

  public static async sendChat(
    message: string,
    category = 'General Assistant',
    memberName = 'Anggota Keluarga',
    context?: Record<string, any>
  ): Promise<any> {
    return this.fetchWithRetry('/api/ai/chat', {
      message,
      category,
      memberName,
      context,
    });
  }

  public static async analyzePsychology(
    situation: string,
    category: string,
    membersInvolved?: string[]
  ): Promise<any> {
    return this.fetchWithRetry('/api/ai/psychology', {
      situation,
      category,
      membersInvolved,
    });
  }

  public static async getParentingAdvice(
    childAge: number,
    behaviorQuery: string,
    parentingStyle?: string
  ): Promise<any> {
    return this.fetchWithRetry('/api/ai/parenting', {
      childAge,
      behaviorQuery,
      parentingStyle,
    });
  }

  public static async solveEducation(
    subject: string,
    gradeLevel: string,
    question: string,
    type?: string
  ): Promise<any> {
    return this.fetchWithRetry('/api/ai/education', {
      subject,
      gradeLevel,
      question,
      type,
    });
  }

  public static async checkHealth(
    symptoms: string,
    ageGroup: string,
    gender?: string,
    duration?: string
  ): Promise<any> {
    return this.fetchWithRetry('/api/ai/health-check', {
      symptoms,
      ageGroup,
      gender,
      duration,
    });
  }

  public static async planMeal(
    availableIngredients?: string[],
    dietaryPreferences?: string,
    mealType?: string,
    familyMembersCount?: number
  ): Promise<any> {
    return this.fetchWithRetry('/api/ai/meal-planner', {
      availableIngredients,
      dietaryPreferences,
      mealType,
      familyMembersCount,
    });
  }

  public static async adviseFinance(
    monthlyIncome: number,
    totalExpenses: number,
    financialGoals: string,
    debtStatus?: string
  ): Promise<any> {
    return this.fetchWithRetry('/api/ai/finance-advisor', {
      monthlyIncome,
      totalExpenses,
      financialGoals,
      debtStatus,
    });
  }

  public static async analyzeInsurance(
    familyMembers?: any[],
    currentPolicies?: string,
    priorityCoverage?: string
  ): Promise<any> {
    return this.fetchWithRetry('/api/ai/insurance-analyzer', {
      familyMembers,
      currentPolicies,
      priorityCoverage,
    });
  }

  public static async getSuperBriefing(familyData: any): Promise<any> {
    return this.fetchWithRetry('/api/ai/super-assistant', {
      familyData,
    });
  }
}
