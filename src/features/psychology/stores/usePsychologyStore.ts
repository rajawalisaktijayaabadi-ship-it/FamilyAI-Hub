import { create } from 'zustand';
import { 
  PsychologySubTab, 
  WellnessScore, 
  Assessment, 
  AssessmentResult, 
  CommunicationSuggestion, 
  ConflictCase, 
  CoupleRelationshipSummary, 
  ParentingSummary, 
  TeenSupport, 
  SeniorCare, 
  Challenge, 
  Achievement, 
  ReflectionJournal, 
  WellnessReport,
  PrivacyLevel
} from '../types/psychologyTypes';
import { 
  INITIAL_WELLNESS_SCORE, 
  INITIAL_ASSESSMENTS, 
  INITIAL_ASSESSMENT_RESULTS, 
  INITIAL_COMMUNICATION_HISTORY, 
  INITIAL_CONFLICT_CASES, 
  INITIAL_COUPLE_DATA, 
  INITIAL_PARENTING_DATA, 
  INITIAL_REFLECTIONS, 
  INITIAL_TEEN_DATA, 
  INITIAL_SENIOR_CARE, 
  INITIAL_CHALLENGES, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_WELLNESS_REPORTS 
} from '../utils/psychologyData';

interface PsychologyState {
  activeSubTab: PsychologySubTab;
  wellnessScore: WellnessScore;
  assessments: Assessment[];
  assessmentResults: AssessmentResult[];
  communicationHistory: CommunicationSuggestion[];
  conflictCases: ConflictCase[];
  coupleData: CoupleRelationshipSummary;
  parentingData: ParentingSummary;
  teenData: TeenSupport;
  seniorCare: SeniorCare;
  challenges: Challenge[];
  achievements: Achievement[];
  reflections: ReflectionJournal[];
  reports: WellnessReport[];

  // Actions
  setActiveSubTab: (tab: PsychologySubTab) => void;
  submitAssessment: (assessmentId: string, answers: Record<string, any>) => Promise<AssessmentResult>;
  translateCommunication: (inputText: string) => Promise<CommunicationSuggestion>;
  addConflictCase: (conflictData: Omit<ConflictCase, 'id' | 'createdAt'>) => void;
  updateConflictCaseStatus: (id: string, status: ConflictCase['status'], agreementNotes?: string) => void;
  toggleChallengeStatus: (challengeId: string) => void;
  addReflectionJournal: (journal: Omit<ReflectionJournal, 'id' | 'createdAt'>) => void;
  toggleSeniorMedicine: (id: string) => void;
  toggleSeniorActivity: (id: string) => void;
}

export const usePsychologyStore = create<PsychologyState>((set, get) => ({
  activeSubTab: 'dashboard',
  wellnessScore: INITIAL_WELLNESS_SCORE,
  assessments: INITIAL_ASSESSMENTS,
  assessmentResults: INITIAL_ASSESSMENT_RESULTS,
  communicationHistory: INITIAL_COMMUNICATION_HISTORY,
  conflictCases: INITIAL_CONFLICT_CASES,
  coupleData: INITIAL_COUPLE_DATA,
  parentingData: INITIAL_PARENTING_DATA,
  teenData: INITIAL_TEEN_DATA,
  seniorCare: INITIAL_SENIOR_CARE,
  challenges: INITIAL_CHALLENGES,
  achievements: INITIAL_ACHIEVEMENTS,
  reflections: INITIAL_REFLECTIONS,
  reports: INITIAL_WELLNESS_REPORTS,

  setActiveSubTab: (tab) => set({ activeSubTab: tab }),

  submitAssessment: async (assessmentId, answers) => {
    const assessment = get().assessments.find((a) => a.id === assessmentId);
    const category = assessment ? assessment.category : 'Communication';

    // Simulated score calculation
    const calculatedScore = Math.floor(Math.random() * 20) + 80; // 80-99
    let level: AssessmentResult['level'] = 'Sangat Baik';
    if (calculatedScore < 70) level = 'Butuh Pendampingan';
    else if (calculatedScore < 80) level = 'Perlu Perhatian';
    else if (calculatedScore < 90) level = 'Optimal';

    const newResult: AssessmentResult = {
      id: `res_${Date.now()}`,
      assessmentId,
      category,
      score: calculatedScore,
      level,
      summary: `Hasil asesmen kategori ${category} menunjukkan iklim ${level.toLowerCase()} dengan stabilitas emosi teruji.`,
      recommendations: [
        `Tingkatkan interaksi positif berbasis empati di kategori ${category}.`,
        `Pertahankan konsistensi sesi refleksi bersama di malam hari.`
      ],
      date: new Date().toISOString().split('T')[0]
    };

    set((state) => ({
      assessmentResults: [newResult, ...state.assessmentResults],
      wellnessScore: {
        ...state.wellnessScore,
        overallScore: Math.min(100, state.wellnessScore.overallScore + 1)
      }
    }));

    return newResult;
  },

  translateCommunication: async (inputText) => {
    try {
      const res = await fetch('/api/ai/psychology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'Communication Coach',
          situation: inputText
        })
      });

      const data = await res.json();
      const newSuggestion: CommunicationSuggestion = {
        id: `comm_${Date.now()}`,
        originalInput: inputText,
        empathyRewrite: data.communicationTip || data.bondingExercise || 'Aku merasa kurang nyaman dengan kondisi ini, bisakah kita membicarakannya dengan tenang?',
        tone: 'Empatis, Konstruktif, & Santun',
        explanation: data.summary || 'Mengungkapkan kebutuhan diri tanpa menyalahkan pihak lain mempercepat pemecahan masalah.',
        tips: data.actionSteps || [
          'Gunakan nada suara lembut dan kontak mata hangat.',
          'Dengarkan balasan tanpa langsung menginterupsi.'
        ],
        date: new Date().toISOString().split('T')[0]
      };

      set((state) => ({
        communicationHistory: [newSuggestion, ...state.communicationHistory]
      }));

      return newSuggestion;
    } catch (err) {
      console.error(err);
      const fallbackSuggestion: CommunicationSuggestion = {
        id: `comm_${Date.now()}`,
        originalInput: inputText,
        empathyRewrite: 'Aku merasa perlu waktu berbincang sejenak mengenai situasi ini agar kita saling memahami.',
        tone: 'Empatis & Lembut',
        explanation: 'Fokus pada penyampaian emosi jujur tanpa nada menuduh.',
        tips: ['Tanyakan kesiapan waktu mendengar sebelum berdiskusi.'],
        date: new Date().toISOString().split('T')[0]
      };

      set((state) => ({
        communicationHistory: [fallbackSuggestion, ...state.communicationHistory]
      }));

      return fallbackSuggestion;
    }
  },

  addConflictCase: (conflictData) => {
    const newCase: ConflictCase = {
      ...conflictData,
      id: `conf_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    set((state) => ({
      conflictCases: [newCase, ...state.conflictCases]
    }));
  },

  updateConflictCaseStatus: (id, status, agreementNotes) => {
    set((state) => ({
      conflictCases: state.conflictCases.map((c) =>
        c.id === id ? { ...c, status, agreementNotes: agreementNotes || c.agreementNotes } : c
      )
    }));
  },

  toggleChallengeStatus: (challengeId) => {
    set((state) => ({
      challenges: state.challenges.map((c) => {
        if (c.id === challengeId) {
          const nextCompleted = Math.min(c.durationDays, c.completedDays + 1);
          const isDone = nextCompleted >= c.durationDays;
          return {
            ...c,
            completedDays: nextCompleted,
            status: isDone ? 'completed' : 'active'
          };
        }
        return c;
      })
    }));
  },

  addReflectionJournal: (journalData) => {
    const newRef: ReflectionJournal = {
      ...journalData,
      id: `ref_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    set((state) => ({
      reflections: [newRef, ...state.reflections]
    }));
  },

  toggleSeniorMedicine: (id) => {
    set((state) => ({
      seniorCare: {
        ...state.seniorCare,
        medicineReminders: state.seniorCare.medicineReminders.map((m) =>
          m.id === id ? { ...m, taken: !m.taken } : m
        )
      }
    }));
  },

  toggleSeniorActivity: (id) => {
    set((state) => ({
      seniorCare: {
        ...state.seniorCare,
        activityReminders: state.seniorCare.activityReminders.map((a) =>
          a.id === id ? { ...a, done: !a.done } : a
        )
      }
    }));
  }
}));
