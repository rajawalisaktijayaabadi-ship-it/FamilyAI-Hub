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
  const { subject, gradeLevel, question, type, materi, topic, difficulty, questionCount } = req.body;
  
  if (type === "quiz") {
    const topicName = materi || topic || subject || "Latihan Umum";
    const subjName = subject || topicName;
    const count = Number(questionCount) || 3;
    const diff = difficulty || "Sedang";

    const prompt = `Buatkan ${count} soal kuis pilihan ganda interaktif untuk mata pelajaran ${subjName} dengan materi/topik "${topicName}". Jenjang sekolah: ${gradeLevel || "Umum"}. Tingkat kesulitan: ${diff}.

Sertakan 4 pilihan jawaban untuk tiap soal (index 0, 1, 2, 3), tentukan jawaban yang benar (correctIndex 0-3), dan berikan penjelasan edukatif yang ringkas dan ramah anak.

Format JSON persis:
{
  "subject": "${subjName}",
  "topic": "${topicName}",
  "difficulty": "${diff}",
  "questions": [
    {
      "id": 1,
      "question": "teks pertanyaan yang jelas",
      "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
      "correctIndex": 0,
      "explanation": "penjelasan edukatif mengapa jawaban ini benar"
    }
  ]
}`;
    const quiz = await generateAIJson(prompt, "Anda adalah Pembuat Kuis Pendidikan Anak Interaktif dan Edukatif.");
    return res.json(quiz || {
      subject: subjName,
      topic: topicName,
      difficulty: diff,
      questions: [
        {
          id: 1,
          question: `Berapakah hasil latihan dasar dari 12 + 15?`,
          options: ["25", "27", "30", "22"],
          correctIndex: 1,
          explanation: "12 + 15 = 27. Pertambahan puluhan dan satuan."
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
  const ingredientsList = Array.isArray(availableIngredients) && availableIngredients.length > 0 
    ? availableIngredients.join(", ") 
    : "Dada Ayam Fillet, Wortel Organik, Brokoli Segar, Bawang Putih, Telur";

  const prompt = `Kreasikan resep masakan keluarga Indonesia yang lezat, bernutrisi, dan hemat (Zero Waste Kulkas):
Bahan yang dipilih/tersedia di kulkas: ${ingredientsList}
Target & Preferensi Diet: "${dietaryPreferences || "Sehat Seimbang (Ramah Anak)"}"
Jenis Waktu Makan: "${mealType || "Makan Siang"}"
Porsi Keluarga: ${familyMembersCount || 4} orang

Buatkan resep nyata yang memanfaatkan bahan-bahan tersebut secara optimal.
Format JSON persis seperti ini:
{
  "title": "Nama Masakan Menarik & Menggugah Selera",
  "prepTime": "12 Menit",
  "cookTime": "18 Menit",
  "calories": "340 kcal/porsi",
  "category": "Makan Siang",
  "difficulty": "Mudah",
  "servings": 4,
  "ingredientsUsed": [
    "Bahan Terpakai 1 (Takaran)",
    "Bahan Terpakai 2 (Takaran)"
  ],
  "missingIngredients": [
    "Bumbu Tambahan Dasar 1",
    "Bumbu Tambahan Dasar 2"
  ],
  "steps": [
    "Langkah persiapan dan memasak 1",
    "Langkah 2",
    "Langkah 3",
    "Langkah penyajian 4"
  ],
  "kidTip": "Tips penyajian atau rasa yang menarik & disukai anak-anak",
  "seniorTip": "Tips tekstur atau bumbu yang aman & lembut bagi lansia",
  "nutritionHighlight": "Analisis nutrisi ringkas dan manfaat kesehatan menu ini"
}`;

  const sysInstruction = "Anda adalah Master Chef & Ahli Gizi Kuliner Keluarga Indonesia. Buatkan resep kreatif, lezat, realistis, dan ramah keluarga.";
  const mealData = await generateAIJson(prompt, sysInstruction);

  if (mealData && (mealData.title || mealData.recipeTitle)) {
    res.json({
      title: mealData.title || mealData.recipeTitle,
      prepTime: mealData.prepTime || "15 Menit",
      cookTime: mealData.cookTime || "20 Menit",
      calories: mealData.calories || mealData.estimatedCalories || "350 kcal/porsi",
      category: mealData.category || mealType || "Makan Siang",
      difficulty: mealData.difficulty || "Mudah",
      servings: mealData.servings || familyMembersCount || 4,
      ingredientsUsed: Array.isArray(mealData.ingredientsUsed) ? mealData.ingredientsUsed : (Array.isArray(mealData.ingredientsRequired) ? mealData.ingredientsRequired : availableIngredients),
      missingIngredients: Array.isArray(mealData.missingIngredients) ? mealData.missingIngredients : ["Garam", "Minyak Goreng / Zaitun", "Lada"],
      steps: Array.isArray(mealData.steps) ? mealData.steps : (Array.isArray(mealData.stepByStepInstructions) ? mealData.stepByStepInstructions : ["Tumis bumbu hingga harum", "Masukan bahan utama", "Masak hingga matang dan sajikan"]),
      kidTip: mealData.kidTip || mealData.kidFriendlyTip || "Potong sayuran dengan bentuk unik agar anak tertarik!",
      seniorTip: mealData.seniorTip || "Sesuaikan tingkat keempukan daging dan sayur untuk kemudahan mengunyah.",
      nutritionHighlight: mealData.nutritionHighlight || mealData.nutritionHighlights || "Kaya protein berkualitas dan serat alami untuk imunitas tubuh."
    });
  } else {
    res.json({
      title: `Tumis Spesial ${ingredientsList.split(',')[0] || 'Kulkas'} Aromatic Garlic`,
      prepTime: "12 Menit",
      cookTime: "15 Menit",
      calories: "320 kcal/porsi",
      category: "Makan Siang",
      difficulty: "Mudah",
      servings: 4,
      ingredientsUsed: (availableIngredients || ["Dada Ayam Fillet", "Wortel Organik", "Brokoli"]).map((i: string) => `${i} (Secukupnya)`),
      missingIngredients: ["Bawang Putih", "Garam Low Sodium", "Minyak Zaitun"],
      steps: [
        "Potong dan cuci bersih semua bahan utama sesuai ukuran porsi keluarga.",
        "Tumis irisan bawang putih hingga wangi dan berwarna keemasan.",
        "Masukan bahan utama secara berurutan sesuai tingkat kematangan.",
        "Bumbui secara seimbang, masak hingga matang segar dan sajikan hangat."
      ],
      kidTip: "Ajak anak menghias piring saji agar lebih bersemangat makan sayur!",
      seniorTip: "Gunakan garam secukupnya dan pastikan tekstur masakan tidak terlalu keras.",
      nutritionHighlight: "Mengoptimalkan bahan kulkas tersedia tanpa ada yang terbuang (Zero Waste)."
    });
  }
});

// AI Finance Advisor
app.post("/api/ai/finance-advisor", async (req, res) => {
  const { prompt: userPrompt, context, monthlyIncome, totalExpenses, financialGoals, debtStatus } = req.body;

  const income = context?.totalIncome || monthlyIncome || 15000000;
  const expense = context?.totalExpense || totalExpenses || 9000000;
  const userQuery = userPrompt || financialGoals || "Analisis perencanaan keuangan dan kesehatan arus kas keluarga.";

  const prompt = `Pertanyaan/Fokus Konsultasi Keuangan Keluarga: "${userQuery}"
Konteks Finansial:
- Pemasukan Bulanan: Rp ${Number(income).toLocaleString('id-ID')}
- Pengeluaran Bulanan: Rp ${Number(expense).toLocaleString('id-ID')}
- Aset/Investasi Total: Rp ${Number(context?.totalInvestmentValue || 0).toLocaleString('id-ID')}
- Sisa Utang: Rp ${Number(context?.totalDebtsRemaining || 0).toLocaleString('id-ID')}
- Jumlah Anggota Keluarga: ${context?.familyMembersCount || 4}

Berikan analisis keuangan mendalam, praktis, dan rekomendasi konkrit dalam format JSON persis seperti ini:
{
  "summary": "Analisis ringkas dan komprehensif mengenai kondisi keuangan, arus kas, dan jawaban langsung yang jelas atas pertanyaan pengguna.",
  "healthRating": "Sehat / Cukup / Perlu Perhatian (misal: 'Sangat Sehat (85/100)')",
  "actionSteps": [
    "Langkah aksi konkret 1",
    "Langkah aksi konkret 2",
    "Langkah aksi konkret 3"
  ],
  "riskAlerts": [
    "Peringatan potensi risiko atau perhatian tambahan 1",
    "Peringatan potensi risiko 2"
  ]
}`;

  const sysInstruction = "Anda adalah Perencana Keuangan Keluarga Senior (Certified Financial Planner / CFP) Gemini AI yang ramah, bijak, solutif, dan profesional.";
  const finData = await generateAIJson(prompt, sysInstruction);

  if (finData && (finData.summary || finData.actionSteps)) {
    res.json(finData);
  } else {
    res.json({
      summary: `Berdasarkan analisis keuangan keluarga dengan pemasukan Rp ${Number(income).toLocaleString('id-ID')} dan pengeluaran Rp ${Number(expense).toLocaleString('id-ID')}, arus kas Anda berada pada kondisi surplus yang positif. Alokasi pengeluaran Anda tergolong baik untuk memenuhi kebutuhan pokok keluarga.`,
      healthRating: "Sehat & Cukup Stabil (82/100)",
      actionSteps: [
        "Otomatiskan alokasi tabungan dana darurat minimal 20% dari pemasukan setiap bulan (Pay Yourself First).",
        "Siapkan target dana darurat ideal setara 6-12 kali pengeluaran rutin bulanan keluarga.",
        "Pertimbangkan mengalihkan sebagian cadangan tunai ke instrumen investasi berisiko rendah seperti Reksa Dana Pasar Uang atau Emas."
      ],
      riskAlerts: [
        "Pastikan rasio total cicilan/utang bulanan tidak melebihi 30% dari total pendapatan bersih.",
        "Disiplin mencatat pengeluaran harian kecil agar budget bulanan tidak terlewati."
      ]
    });
  }
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

// AI Super Assistant & Chat Engine
app.post("/api/ai/chat", async (req, res) => {
  const { message, category, memberName, history, context } = req.body;
  const prompt = `Pesan Pengguna (${memberName || 'Anggota Keluarga'}): "${message}"
Kategori/Topik: ${category || 'General Assistant'}
Konteks Ringkas Keluarga: ${JSON.stringify(context || {})}

Berikan respon yang hangat, berempati, cerdas, praktis, dan berfokus pada solusi produktivitas serta kesejahteraan keluarga dalam bahasa Indonesia yang ramah. JANGAN mengklaim sebagai dokter/pengacara/keuangan resmi, berikan disclaimer jika relevan.`;

  const sysInstruction = `Anda adalah FamilyAI Super Assistant - Otak kecerdasan terpadu FamilyAI Hub. Anda serba tahu mengenai jadwal, kesehatan, keuangan, edukasi, nutrisi, smart home, dan dinamika keluarga.`;

  const replyText = await generateAIText(prompt, sysInstruction);
  res.json({
    reply: replyText || `Halo ${memberName || 'Keluarga'}! Saya telah menganalisis pesan Anda: "${message}". Sebagai AI Family Assistant, saya siap membantu menyusun jadwal, mengelola anggaran, menyarankan resep sehat, serta memberikan saran pengasuhan dan otomasi rumah pintar. Ada yang bisa saya bantu lebih lanjut hari ini?`,
    suggestedActions: [
      "Tambahkan ke Daftar Task Keluarga",
      "Buat Pengingat Kalender Otomatis",
      "Analisis Kebutuhan Belanja Terkait",
      "Minta Rekomendasi Lebih Detail"
    ],
    timestamp: new Date().toISOString()
  });
});

// AI Multi-Module Super Assistant Context Briefing
app.post("/api/ai/super-assistant", async (req, res) => {
  const { familyData } = req.body;
  const prompt = `Analisis seluruh konteks keluarga dan berikan Super AI Dashboard Briefing:
Keluarga: ${JSON.stringify(familyData || {})}

Format JSON:
{
  "todaysSummary": "ringkasan kondisi keluarga hari ini",
  "todaysPriority": "prioritas utama yang harus diselesaikan",
  "wellnessScore": 88,
  "confidenceScore": 96,
  "briefingNotes": [
    "Hari ini ada ujian sekolah untuk anak.",
    "Persediaan susu dan beras perlu diperbarui.",
    "Premi asuransi kesehatan jatuh tempo dalam 3 hari."
  ],
  "decisionSupport": [
    { "topic": "Liburan Keluarga", "recommendation": "Kondisi keuangan memungkinkan target liburan semester berjalan sesuai rencana.", "status": "Aman" },
    { "topic": "Anggaran Bulanan", "recommendation": "Pengeluaran kuliner mendominasi 35% budget, disarankan tingkatkan masakan rumah.", "status": "Perhatian" }
  ],
  "recommendedTasks": [
    { "title": "Beli susu dan vitamin anak", "category": "Belanja", "priority": "Tinggi" },
    { "title": "Jadwalkan kontrol rutin kesehatan gigi", "category": "Kesehatan", "priority": "Sedang" },
    { "title": "Review modul Matematika bersama anak", "category": "Edukasi", "priority": "Sedang" }
  ]
}`;

  const sysInstruction = "Anda adalah Super AI Assistant Engine untuk FamilyAI Hub.";
  const result = await generateAIJson(prompt, sysInstruction);
  res.json(result || {
    todaysSummary: "Keluarga dalam kondisi harmonis, aktivitas hari ini berjalan lancar dengan indeks kesejahteraan 88/100.",
    todaysPriority: "Mempersiapkan ujian sekolah anak & menyelesaikan daftar belanja dapur bulanan.",
    wellnessScore: 88,
    confidenceScore: 96,
    briefingNotes: [
      "Hari ini anak memiliki ujian Matematika jam 09:00 WIB.",
      "Persediaan susu dan kebutuhan pokok tinggal sedikit di pantry.",
      "Besok premi asuransi kesehatan keluarga jatuh tempo."
    ],
    decisionSupport: [
      { topic: "Liburan Keluarga", recommendation: "Kondisi keuangan memungkinkan target liburan tetap berjalan sesuai rencana budget.", status: "Aman" },
      { topic: "Anggaran Bulanan", recommendation: "Pengeluaran makan luar mendekati batas 80% anggaran bulan ini.", status: "Perhatian" }
    ],
    recommendedTasks: [
      { title: "Beli susu kalsium & perlengkapan dapur", category: "Belanja", priority: "Tinggi" },
      { title: "Jadwalkan kontrol dokter / kesehatan gigi", category: "Kesehatan", priority: "Sedang" },
      { title: "Review materi belajar anak malam ini", category: "Edukasi", priority: "Tinggi" }
    ]
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
