import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Helper function for AI text response
async function generateAIText(prompt: string, systemInstruction?: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "Anda adalah FamilyAI Hub Assistant - Asisten Digital Keluarga Modern yang ramah, bijak, empati, profesional, dan berbahasa Indonesia dengan sopan.",
        temperature: 0.7,
      },
    });
    return response.text || "Maaf, tidak dapat menghasilkan jawaban saat ini.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `Maaf, terjadi masalah saat menghubungi server AI: ${error?.message || "Kesalahan tidak dikenal"}. Mohon pastikan GEMINI_API_KEY sudah terkonfigurasi.`;
  }
}

// Helper function for JSON response
async function generateAIJson(prompt: string, systemInstruction: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction + " Kembalikan jawaban HANYA dalam format JSON valid.",
        responseMimeType: "application/json",
      },
    });
    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error: any) {
    console.error("Gemini JSON Error:", error);
    return null;
  }
}

// ---------------- API ENDPOINTS ----------------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "FamilyAI Hub", timestamp: new Date().toISOString() });
});

// General AI Assistant
app.post("/api/ai/assistant", async (req, res) => {
  const { message, persona, familyContext } = req.body;
  const personaPrompts: Record<string, string> = {
    general: "Anda adalah FamilyAI Hub, asisten digital terpadu untuk keluarga modern Indonesia.",
    mama: "Anda berpera sebagai 'Mama AI' - hangat, penyayang, perhatian pada kesehatan, kebersihan, makanan, dan kenyamanan rumah tangga.",
    papa: "Anda berperan sebagai 'Papa AI' - rasional, bijak, solutif, fokus pada keamanan, keuangan, perbaikan rumah, dan motivasi.",
    kakak: "Anda berperan sebagai 'Kakak AI' - energik, gaul, paham tren belajar & teknologi, cocok menjadi teman curhat dan tutor.",
    dokter: "Anda berperan sebagai 'Dokter AI Keluarga' - berpengetahuan medis, memberikan panduan kesehatan awal dengan selalu menyertakan instruksi konsultasi ke medis resmi bila darurat.",
    guru: "Anda berperan sebagai 'Guru AI' - sabar, edukatif, pandai menjelaskan konsep sulit secara mendalam dan menyenangkan untuk anak-anak.",
    psikolog: "Anda berperan sebagai 'Konselor Psikologi Keluarga' - empati tinggi, mendengarkan tanpa menghakimi, memberikan saran rekonsiliasi dan ketenangan emosional."
  };

  const sysPrompt = `${personaPrompts[persona] || personaPrompts.general}
Konteks Keluarga: ${JSON.stringify(familyContext || {})}
Berikan jawaban ringkas, jelas, dan sangat bermanfaat dengan nada hangat & profesional. Bahasa Indonesia.`;

  const reply = await generateAIText(message, sysPrompt);
  res.json({ reply, timestamp: new Date().toISOString() });
});

// AI Psychology & Family Dynamics
app.post("/api/ai/psychology", async (req, res) => {
  const { situation, category, membersInvolved } = req.body;
  const prompt = `Analisis situasi konflik/dinamika keluarga berikut:
Kategori: ${category || "Komunikasi"}
Anggota Terlibat: ${membersInvolved ? membersInvolved.join(", ") : "Keluarga"}
Situasi: "${situation}"

Mohon berikan analisis ilmiah berempati dalam JSON dengan struktur:
{
  "summary": "ringkasan akar masalah",
  "emotionalAnalysis": "analisis emosi para pihak",
  "actionSteps": ["langkah 1", "langkah 2", "langkah 3"],
  "bondingExercise": "satu kegiatan bersama untuk meredakan ketegangan",
  "communicationTip": "saran kata-kata yang baik untuk diucapkan"
}`;

  const sysInstruction = "Anda adalah Psikolog Keluarga Spesialis Komunikasi & Hubungan Antar-Generasi.";
  const result = await generateAIJson(prompt, sysInstruction);
  if (result) {
    res.json(result);
  } else {
    const textFallback = await generateAIText(prompt, sysInstruction);
    res.json({
      summary: "Analisis situasi keluarga",
      emotionalAnalysis: "Perbedaan sudut pandang dan ekspektasi yang belum tersampaikan.",
      actionSteps: ["Lakukan sesi bincang hangat tanpa diinterupsi", "Dengarkan sudut pandang masing-masing dengan empati", "Buat kesepakatan bersama yang adil"],
      bondingExercise: "Makan malam bersama tanpa gadget selama 30 menit.",
      communicationTip: "Gunakan kalimat 'Saya merasa...' alih-alih menyalahkan.",
      rawText: textFallback
    });
  }
});

// AI Parenting Advice
app.post("/api/ai/parenting", async (req, res) => {
  const { childAge, behaviorQuery, parentingStyle } = req.body;
  const prompt = `Pertanyaan Pengasuhan Anak:
Usia Anak: ${childAge} tahun
Gaya Pengasuhan: ${parentingStyle || "Positif & Empatis"}
Permasalahan/Pertanyaan: "${behaviorQuery}"

Berikan saran parenting komprehensif dalam JSON:
{
  "developmentalMilestone": "pemahaman tahap perkembangan di usia ini",
  "immediateResponse": "apa yang harus dilakukan ortu saat ini",
  "longTermStrategy": "strategi pembiasaan jangka panjang",
  "doList": ["hal yang disarankan 1", "hal yang disarankan 2"],
  "dontList": ["hal yang dihindari 1", "hal yang dihindari 2"],
  "encouragementQuote": "pesan penguat untuk orang tua"
}`;

  const sysInstruction = "Anda adalah Pakar AI Parenting dan Perkembangan Anak.";
  const jsonResult = await generateAIJson(prompt, sysInstruction);
  if (jsonResult) {
    res.json(jsonResult);
  } else {
    res.json({
      developmentalMilestone: `Anak usia ${childAge} tahun sedang dalam fase eksplorasi dan pembentukan kemandirian.`,
      immediateResponse: "Tetap tenang, turunkan posisi mata sejajar dengan anak, dan validasi perasaannya.",
      longTermStrategy: "Konsistensi aturan, pujian atas usaha anak, dan pemberian contoh dari orang tua.",
      doList: ["Dengarkan tanpa membentak", "Berikan pilihan terbatas agar anak merasa memegang kendali"],
      dontList: ["Label negatif pada anak", "Membandingkan dengan anak lain"],
      encouragementQuote: "Tidak ada orang tua sempurna, yang ada adalah orang tua yang terus belajar bersama anak."
    });
  }
});

// AI Education & Homework Solver
app.post("/api/ai/education", async (req, res) => {
  const { subject, gradeLevel, question, type } = req.body;
  
  if (type === "quiz") {
    const prompt = `Buatkan 3 soal kuis interaktif pelajaran ${subject} untuk tingkat ${gradeLevel}.
Format JSON:
{
  "topic": "${subject}",
  "questions": [
    {
      "id": 1,
      "question": "teks pertanyaan",
      "options": ["pilihan A", "pilihan B", "pilihan C", "pilihan D"],
      "correctIndex": 0,
      "explanation": "penjelasan singkat"
    }
  ]
}`;
    const quiz = await generateAIJson(prompt, "Anda adalah Pembuat Kuis Pendidikan Anak Interaktif.");
    return res.json(quiz || {
      topic: subject,
      questions: [
        {
          id: 1,
          question: `Berapakah hasil dari 12 + 15?`,
          options: ["25", "27", "30", "22"],
          correctIndex: 1,
          explanation: "12 + 15 = 27"
        }
      ]
    });
  }

  const prompt = `Bantu jawab dan jelaskan pertanyaan tugas sekolah berikut secara edukatif dan mudah dipahami anak:
Mata Pelajaran: ${subject}
Tingkat Sekolah: ${gradeLevel}
Pertanyaan: "${question}"

Berikan penjelasan berstruktur JSON:
{
  "directAnswer": "jawaban langsung secara singkat",
  "stepByStep": ["langkah 1 / penjelasan 1", "langkah 2 / penjelasan 2"],
  "funFact": "fakta unik menarik terkait topik ini",
  "practicePrompt": "satu pertanyaan latihan serupa untuk menguji pemahaman"
}`;

  const sysInstruction = "Anda adalah Tutor & Guru AI Pendidikan Anak yang ramah dan interaktif.";
  const eduResult = await generateAIJson(prompt, sysInstruction);
  if (eduResult) {
    res.json(eduResult);
  } else {
    res.json({
      directAnswer: "Berikut adalah penjelasan untuk tugas kamu:",
      stepByStep: ["Bacalah soal dengan teliti", "Identifikasi poin penting", "Selesaikan langkah demi langkah"],
      funFact: "Belajar hal baru memperkuat koneksi sel saraf di otak kamu!",
      practicePrompt: "Coba jelaskan kembali dengan katakatamu sendiri!"
    });
  }
});

// AI Health & Symptom Checker
app.post("/api/ai/health-check", async (req, res) => {
  const { symptoms, ageGroup, gender, duration } = req.body;
  const prompt = `Analisis gejala kesehatan keluarga:
Keluhan/Gejala: "${symptoms}"
Kelompok Usia: ${ageGroup}
Jenis Kelamin: ${gender || "Tidak disebutkan"}
Durasi Keluhan: ${duration || "Baru terjadi"}

Format JSON:
{
  "disclaimer": "PERHATIAN: Hasil analisis AI ini hanya untuk edukasi dan BUKAN diagnosis medis resmi.",
  "possibleCauses": ["kemungkinan 1", "kemungkinan 2"],
  "firstAidSteps": ["pertolongan pertama 1", "pertolongan pertama 2"],
  "nutritionAdvice": "saran asupan makanan/cairan",
  "urgencyLevel": "Rendah / Sedang / Tinggi (Segera ke Dokter)",
  "whenToSeeDoctor": "tanda bahaya yang mewajibkan ke IGD/Dokter segera"
}`;

  const sysInstruction = "Anda adalah Konsultan AI Kesehatan Keluarga.";
  const healthData = await generateAIJson(prompt, sysInstruction);
  res.json(healthData || {
    disclaimer: "PERHATIAN: Hasil ini bersifat edukatif dan bukan pengganti dokter.",
    possibleCauses: ["Fatigue / kelelahan", "Gejala flu/ringan"],
    firstAidSteps: ["Istirahat cukup", "Minum air putih setidaknya 2 liter hari ini"],
    nutritionAdvice: "Konsumsi sup hangat dan buah kaya vitamin C.",
    urgencyLevel: "Rendah",
    whenToSeeDoctor: "Jika timbul demam tinggi > 38.5C lebih dari 2 hari atau sesak napas."
  });
});

// AI Meal Planner & Recipe Generator
app.post("/api/ai/meal-planner", async (req, res) => {
  const { availableIngredients, dietaryPreferences, mealType, familyMembersCount } = req.body;
  const prompt = `Buatkan resep masakan keluarga ramah gizi:
Bahan yang tersedia di kulkas: ${availableIngredients ? availableIngredients.join(", ") : "Bebas/Bahan umum"}
Preferensi Diet: ${dietaryPreferences || "Sehat Seimbang, Tidak Pedas untuk Anak"}
Jenis Makanan: ${mealType || "Makan Malam Keluarga"}
Jumlah Anggota: ${familyMembersCount || 4} Porsi

Format JSON:
{
  "recipeTitle": "Nama Makanan Mewah & Lezat",
  "prepTime": "20 menit",
  "cookTime": "25 menit",
  "estimatedCalories": "350 kcal/porsi",
  "ingredientsRequired": ["bahan 1", "bahan 2", "bahan 3"],
  "stepByStepInstructions": ["Langkah 1", "Langkah 2", "Langkah 3"],
  "kidFriendlyTip": "cara penyajian menarik untuk anak",
  "nutritionHighlights": "keunggulan vitamin/protein menu ini"
}`;

  const sysInstruction = "Anda adalah AI Master Chef & Ahli Gizi Makanan Keluarga.";
  const mealData = await generateAIJson(prompt, sysInstruction);
  res.json(mealData || {
    recipeTitle: "Ayam Tumis Mentega Wijen & Sayur Pelangi",
    prepTime: "15 menit",
    cookTime: "20 menit",
    estimatedCalories: "420 kcal/porsi",
    ingredientsRequired: ["500g Dada Ayam Fillet", "3 siung Bawang Putih", "1 buah Wortel potong Dadu", "Brokoli segar", "Sauce Mentega & Wijen"],
    stepByStepInstructions: [
      "Tumis bawang putih sampai harum dengan sedikit mentega.",
      "Masukan potong ayam, masak hingga berubah warna.",
      "Masukan wortel dan brokoli, aduk rata lalu bumbui.",
      "Sajikan selagi hangat dengan taburan wijen sangrai."
    ],
    kidFriendlyTip: "Bentuk wortel menjadi bintang atau bunga agar anak makin bersemangat makan sayur!",
    nutritionHighlights: "Tinggi protein untuk masa pertumbuhan anak dan kaya serat dari sayuran."
  });
});

// AI Finance Advisor
app.post("/api/ai/finance-advisor", async (req, res) => {
  const { monthlyIncome, totalExpenses, financialGoals, debtStatus } = req.body;
  const prompt = `Berikan penasihat keuangan keluarga modern:
Pemasukan Bulanan: Rp ${monthlyIncome}
Pengeluaran Bulanan: Rp ${totalExpenses}
Target Keuangan: "${financialGoals}"
Status Utang/Cicilan: "${debtStatus || "Tidak Ada"}"

Format JSON:
{
  "cashflowStatus": "Positif / Imbang / Defisit",
  "savingsPercentage": "20%",
  "recommendedBudgetSplit": {
    "needs": "50%",
    "wants": "30%",
    "savingsAndInvest": "20%"
  },
  "actionableTips": ["tip 1", "tip 2", "tip 3"],
  "goalFeasibility": "analisis realistis pencapaian target"
}`;

  const sysInstruction = "Anda adalah AI Financial Planner Spesialis Keuangan Keluarga.";
  const finData = await generateAIJson(prompt, sysInstruction);
  res.json(finData || {
    cashflowStatus: "Positif",
    savingsPercentage: "20%",
    recommendedBudgetSplit: {
      needs: "50% (Rp " + (monthlyIncome * 0.5).toLocaleString("id-ID") + ")",
      wants: "30% (Rp " + (monthlyIncome * 0.3).toLocaleString("id-ID") + ")",
      savingsAndInvest: "20% (Rp " + (monthlyIncome * 0.2).toLocaleString("id-ID") + ")"
    },
    actionableTips: [
      "Alokasikan tabungan di awal bulan begitu gaji diterima (Pay Yourself First).",
      "Siapkan dana darurat keluarga setara 6 kali pengeluaran bulanan.",
      "Evaluasi langganan bulanan yang tidak terpakai secara berkala."
    ],
    goalFeasibility: "Sangat realistis tercapai dengan konsistensi 6-12 bulan ke depan."
  });
});

// AI Insurance & Protection Analyzer
app.post("/api/ai/insurance-analyzer", async (req, res) => {
  const { familyMembers, currentPolicies, priorityCoverage } = req.body;
  const prompt = `Analisis Perlindungan & Asuransi Keluarga:
Anggota Keluarga: ${JSON.stringify(familyMembers || [])}
Polis yang dimiliki saat ini: "${currentPolicies || "Belum ada / BPJS saja"}"
Fokus Perlindungan: "${priorityCoverage || "Kesehatan & Jiwa Pencari Nafkah"}"

Format JSON:
{
  "protectionScore": "78/100",
  "coverageGaps": ["Celah 1 yang belum tercover", "Celah 2"],
  "recommendedPolicies": [
    { "type": "Asuransi Kesehatan Rawat Inap", "reason": "Alasan urgensi", "urgency": "Tinggi" },
    { "type": "Asuransi Jiwa Berjangka (Term Life)", "reason": "Untuk pencari nafkah utama", "urgency": "Sangat Tinggi" }
  ],
  "emergencyFundTarget": "Minimal 6x pengeluaran bulanan",
  "documentChecklist": ["KTP & KK Digital", "Kartu Asuransi", "Kontak Darurat Rumah Sakit Rujukan"]
}`;

  const sysInstruction = "Anda adalah Konsultan Perlindungan & Asuransi Keluarga Modern.";
  const insData = await generateAIJson(prompt, sysInstruction);
  res.json(insData || {
    protectionScore: "82/100",
    coverageGaps: ["Belum memiliki asuransi jiwa berjangka untuk penopang finansial utama", "Perlu proteksi penyakit kritis tambahan"],
    recommendedPolicies: [
      { type: "BPJS Kesehatan", reason: "Proteksi dasar wajib seluruh anggota keluarga", urgency: "Wajib" },
      { type: "Asuransi Jiwa Berjangka (Term Life)", reason: "Melindungi pendapatan keluarga jika pencari nafkah wafat", urgency: "Sangat Tinggi" },
      { type: "Asuransi Kesehatan Swasta Cashless", reason: "Kenyamanan kamar rawat inap tanpa antri", urgency: "Sedang" }
    ],
    emergencyFundTarget: "Rp 30.000.000 (Dapat diakses instan)",
    documentChecklist: ["Polis Digital PDF", "Kartu Pasien RS", "Nomor Kontak Darurat 112 / Ambulans"]
  });
});

// Integrate Vite middleware or static serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FamilyAI Hub Server running on http://localhost:${PORT}`);
  });
}

setupServer();
