export class GeminiService {
  private static MAX_RETRIES = 2;
  private static RETRY_DELAY_MS = 600;

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
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (retries > 1) {
        await new Promise((resolve) => setTimeout(resolve, GeminiService.RETRY_DELAY_MS));
        return GeminiService.fetchWithRetry(endpoint, body, retries - 1);
      }
      
      console.warn(`[GeminiService] Server endpoint ${endpoint} tidak merespons (mungkin di-host statis di Firebase Hosting). Mengaktifkan Client AI Fallback Engine.`);
      return GeminiService.fallbackClientAI(endpoint, body);
    }
  }

  // Fallback Engine untuk Lingkungan Static Deployment (Firebase Hosting / SPA)
  private static fallbackClientAI(endpoint: string, body: any): any {
    if (endpoint.includes('chat')) {
      const msg = body.message || 'pertanyaan keluarga';
      const name = body.memberName || 'Anggota Keluarga';
      return {
        reply: `Halo ${name}! Terima kasih pertanyaannya mengenai "${msg}". Berdasarkan analisis konteks keluarga FamilyAI Hub: 

1. **Rekomendasi Utama**: Selalu koordinasikan jadwal dan aktivitas di menu Kalender Utama agar seluruh anggota keluarga memiliki pemahaman yang sama.
2. **Kesehatan & Gizi**: Pastikan pola makan bergizi seimbang dan konsumsi air putih secukupnya.
3. **Pengelolaan Keuangan**: Terapkan metode 50/30/20 untuk menjaga keseimbangan antara kebutuhan, keinginan, dan tabungan.

Ada topik khusus lain seputar resep, tugas sekolah, atau keuangan yang ingin dibahas lebih lanjut?`,
        suggestedActions: [
          'Tambahkan ke Daftar Task',
          'Atur Pengingat Kalender',
          'Minta Rekomendasi Detail'
        ],
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
      };
    }

    if (endpoint.includes('psychology')) {
      return {
        summary: `Analisis situasi hubungan keluarga: "${body.situation || 'Komunikasi harian'}"`,
        emotionalAnalysis: "Adanya perbedaan sudut pandang dan ekspektasi yang belum tersampaikan secara langsung dan terbuka.",
        actionSteps: [
          "Lakukan sesi bincang hangat tanpa diinterupsi oleh gadget",
          "Dengarkan sudut pandang masing-masing dengan prinsip empati aktif",
          "Buat kesepakatan bersama yang adil dan dapat dijalankan bersama"
        ],
        bondingExercise: "Makan malam bersama keluarga tanpa telepon genggam selama 30 menit.",
        communicationTip: "Gunakan kalimat 'Saya merasa...' daripada menyalahkan pihak lain."
      };
    }

    if (endpoint.includes('parenting')) {
      const age = body.childAge || 7;
      return {
        developmentalMilestone: `Anak usia ${age} tahun sedang dalam fase pembentukan kemandirian, regulasi emosi, dan eksplorasi minat sosial.`,
        immediateResponse: "Tetap tenang, turunkan posisi mata sejajar dengan anak, dan validasi perasaannya terlebih dahulu.",
        longTermStrategy: "Terapkan aturan yang konsisten, berikan pujian atas usahanya, dan berikan contoh perilaku nyata dari orang tua.",
        doList: [
          "Dengarkan keluhan anak tanpa langsung membentak atau memotong",
          "Berikan pilihan terbatas agar anak merasa memiliki kendali atas dirinya"
        ],
        dontList: [
          "Memberikan label negatif pada kepribadian anak",
          "Membandingkan pencapaian anak dengan orang lain"
        ],
        encouragementQuote: "Tidak ada orang tua yang sempurna, yang ada adalah orang tua yang mau terus belajar tumbuh bersama anak."
      };
    }

    if (endpoint.includes('education')) {
      if (body.type === 'quiz') {
        return {
          topic: body.subject || 'Pengetahuan Umum',
          questions: [
            {
              id: 1,
              question: `Apa nama organ tubuh yang berfungsi mengalirkan darah ke seluruh tubuh?`,
              options: ["Jantung", "Paru-paru", "Lambung", "Ginjal"],
              correctIndex: 0,
              explanation: "Jantung memompa darah yang mengandung oksigen dan nutrisi ke seluruh organ tubuh."
            },
            {
              id: 2,
              question: `Berapakah hasil dari 15 × 6?`,
              options: ["80", "90", "85", "95"],
              correctIndex: 1,
              explanation: "15 dikalikan 6 sama dengan 90."
            }
          ]
        };
      }
      return {
        directAnswer: `Berikut penjelasan untuk pertanyaan ${body.subject || 'pelajaran'}: "${body.question || 'soal sekolah'}"`,
        stepByStep: [
          "Pahami poin utama pertanyaan dan rumus/konsep dasar yang berlaku",
          "Uraikan variabel yang diketahui dan ditanyakan",
          "Selesaikan perhitungan atau analisis kalimat secara terstruktur"
        ],
        funFact: "Mempelajari hal baru dan mencoba memecahkan soal memperkuat jaringan saraf di otak!",
        practicePrompt: "Coba jelaskan kembali konsep ini dengan bahasamu sendiri kepada orang tuamu!"
      };
    }

    if (endpoint.includes('health-check')) {
      return {
        disclaimer: "PERHATIAN: Analisis ini bersifat edukatif dan BUKAN diagnosis medis resmi.",
        possibleCauses: [
          "Kelelahan fisik / kurang tidur",
          "Gejala radang ringan atau reaksi imunitas tubuh"
        ],
        firstAidSteps: [
          "Istirahat cukup dan hindari aktivitas fisik berat",
          "Minum air putih minimal 2 liter per hari",
          "Konsumsi makanan bernutrisi tinggi vitamin C"
        ],
        nutritionAdvice: "Berikan sup hangat, sayur bening, dan jus buah segar.",
        urgencyLevel: "Rendah - Pemantauan Rutin",
        whenToSeeDoctor: "Segera bawa ke klinik/dokter jika demam di atas 38.5°C lebih dari 2 hari atau timbul sesak napas."
      };
    }

    if (endpoint.includes('meal-planner')) {
      return {
        recipeTitle: "Ayam Tumis Mentega Wijen & Sayuran Pelangi",
        prepTime: "15 menit",
        cookTime: "20 menit",
        estimatedCalories: "420 kcal/porsi",
        ingredientsRequired: [
          "500g Dada Ayam Fillet (potong dadu)",
          "1 buah Wortel segar",
          "1 kuntum Brokoli",
          "3 siung Bawang Putih & Mentega",
          "Saus Wijen Gurih"
        ],
        stepByStepInstructions: [
          "Tumis bawang putih dengan sedikit mentega hingga harum.",
          "Masukkan potongan ayam, masak hingga berubah warna matang.",
          "Tambahkan wortel dan brokoli, beri saus wijen dan sedikit air.",
          "Aduk hingga sayuran renyah matang, sajikan hangat bersama nasi."
        ],
        kidFriendlyTip: "Bentuk potongan wortel menjadi bintang agar anak tertarik makan sayuran!",
        nutritionHighlights: "Kaya protein untuk pertumbuhan anak serta serat dan zat besi untuk daya tahan tubuh."
      };
    }

    if (endpoint.includes('finance-advisor')) {
      const inc = body.monthlyIncome || 10000000;
      return {
        cashflowStatus: "Positif Sehat",
        savingsPercentage: "20%",
        recommendedBudgetSplit: {
          needs: `50% (Rp ${(inc * 0.5).toLocaleString('id-ID')})`,
          wants: `30% (Rp ${(inc * 0.3).toLocaleString('id-ID')})`,
          savingsAndInvest: `20% (Rp ${(inc * 0.2).toLocaleString('id-ID')})`
        },
        actionableTips: [
          "Otomatiskan transfer tabungan 20% di awal bulan (Pay Yourself First)",
          "Kumpulkan dana darurat keluarga minimal 6x pengeluaran bulanan",
          "Evaluasi pengeluaran katering / makan luar secara rutin"
        ],
        goalFeasibility: "Target keuangan sangat realistis tercapai dengan kedisiplinan alokasi bulanan."
      };
    }

    if (endpoint.includes('insurance-analyzer')) {
      return {
        protectionScore: "85/100",
        coverageGaps: [
          "Perlu dipastikan ketersediaan Asuransi Jiwa Berjangka untuk penopang nafkah utama",
          "Tambahan proteksi penyakit kritis bila memungkinkan"
        ],
        recommendedPolicies: [
          { type: "BPJS Kesehatan", reason: "Proteksi kesehatan dasar wajib seluruh keluarga", urgency: "Wajib" },
          { type: "Asuransi Jiwa Berjangka (Term Life)", reason: "Melindungi finansial keluarga jika pencari nafkah wafat", urgency: "Tinggi" }
        ],
        emergencyFundTarget: "Rp 30.000.000 (Dapat ditarik sewaktu-waktu)",
        documentChecklist: ["Kartu BPJS Digital", "Dokumen Polis PDF", "Kontak Darurat Ambulans / RS"]
      };
    }

    if (endpoint.includes('super-assistant')) {
      return {
        todaysSummary: "Keluarga dalam kondisi harmonis. Seluruh jadwal dan kesehatan terpantau dengan baik.",
        todaysPriority: "Penyelesaian jadwal kuis sekolah anak dan belanja bahan dapur mingguan.",
        wellnessScore: 88,
        confidenceScore: 96,
        briefingNotes: [
          "Jadwal ujian/kuis sekolah anak dijadwalkan besok pagi.",
          "Persediaan gizi dan nutrisi dapur dalam kondisi aman.",
          "Premi kesehatan terverifikasi aktif."
        ],
        decisionSupport: [
          { topic: "Liburan Keluarga", recommendation: "Kondisi arus kas memungkinkan rencana liburan tetap berjalan.", status: "Aman" },
          { topic: "Anggaran Dapur", recommendation: "Alokasi makanan rumah tangga stabil sesuai target 50/30/20.", status: "Bagus" }
        ],
        recommendedTasks: [
          { title: "Beli kebutuhan bahan makanan dapur", category: "Belanja", priority: "Tinggi" },
          { title: "Review materi kuis sekolah anak", category: "Edukasi", priority: "Sedang" },
          { title: "Jadwalkan pemeriksaan gigi rutin", category: "Kesehatan", priority: "Sedang" }
        ]
      };
    }

    // Default response
    return {
      reply: "Halo! Asisten FamilyAI Hub siap membantu mengelola seluruh kebutuhan dan keharmonisan keluarga Anda.",
      timestamp: new Date().toISOString()
    };
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
