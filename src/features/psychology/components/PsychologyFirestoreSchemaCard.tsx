import React, { useState } from 'react';
import { Database, ShieldCheck, Code, Copy, Check } from 'lucide-react';

export const PsychologyFirestoreSchemaCard: React.FC = () => {
  const [copiedRules, setCopiedRules] = useState(false);

  const firestoreRulesSnippet = `// Firestore Security Rules - AI Family Psychology Center
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper Functions
    function isAuthenticated() {
      return request.auth != null;
    }
    function isFamilyMember(familyId) {
      return isAuthenticated() && 
        exists(/databases/$(database)/documents/families/$(familyId)/members/$(request.auth.uid));
    }
    function isParent(familyId) {
      return isFamilyMember(familyId) && 
        get(/databases/$(database)/documents/families/$(familyId)/members/$(request.auth.uid)).data.role in ['parent', 'admin'];
    }

    // Psychology Assessment & Results
    match /families/{familyId}/psychology_results/{resultId} {
      allow read: if isFamilyMember(familyId);
      allow create, update: if isFamilyMember(familyId);
    }

    // Communication Coach History
    match /families/{familyId}/communication_coach/{coachId} {
      allow read: if isFamilyMember(familyId);
      allow create: if isFamilyMember(familyId);
    }

    // Conflict Resolution Cases
    match /families/{familyId}/conflict_cases/{caseId} {
      allow read: if isFamilyMember(familyId);
      allow create, update: if isFamilyMember(familyId);
    }

    // Daily Reflection Journals (with Privacy Control)
    match /families/{familyId}/reflection_journals/{journalId} {
      allow read: if isFamilyMember(familyId) && (
        resource.data.privacy == 'family_only' ||
        (resource.data.privacy == 'parent_only' && isParent(familyId)) ||
        (resource.data.privacy == 'private' && resource.data.authorUid == request.auth.uid)
      );
      allow create: if isFamilyMember(familyId);
      allow update, delete: if isFamilyMember(familyId) && resource.data.authorUid == request.auth.uid;
    }

    // Family Challenges & Achievements
    match /families/{familyId}/challenges/{challengeId} {
      allow read: if isFamilyMember(familyId);
      allow write: if isFamilyMember(familyId);
    }
  }
}`;

  const collections = [
    { name: 'psychology_assessments', desc: 'Daftar kategori asesmen, pertanyaan, pilihan jawaban, dan estimasi waktu.' },
    { name: 'psychology_results', desc: 'Hasil evaluasi asesmen psikologi, skor 0-100, level, dan saran AI.' },
    { name: 'wellness_scores', desc: 'Indeks Family Wellness Score, skor komunikasi, quality time, dan indikator stress.' },
    { name: 'communication_coach', desc: 'Riwayat terjemahan kalimat empati, masukan tone, dan tips komunikasi.' },
    { name: 'conflict_cases', desc: 'Lembar mediasi konflik, perspektif antar pihak, opsi solusi, dan kesepakatan.' },
    { name: 'reflection_journals', desc: 'Catatan refleksi 4 pertanyaan harian dengan visibilitas privasi.' },
    { name: 'family_challenges', desc: 'Tantangan gamifikasi keluarga, durasi hari, poin reward, dan status check-in.' },
    { name: 'achievements', desc: 'Lencana pencapaian kebiasaan positif yang berhasil dibuka oleh keluarga.' },
    { name: 'wellness_reports', desc: 'Sintesis laporan berkala (mingguan, bulanan, triwulan) untuk keluarga.' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(firestoreRulesSnippet);
    setCopiedRules(true);
    setTimeout(() => setCopiedRules(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-2xl">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Arsitektur Firestore Database & Security Rules</h2>
            <p className="text-xs text-slate-400">
              Skema koleksi database Firestore production-ready dan aturan keamanan privasi (Prompt 6)
            </p>
          </div>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-400" />
          <span>Koleksi Firestore (Firestore Collections Schema)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {collections.map((col, i) => (
            <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="font-mono font-bold text-purple-300 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-indigo-400" />
                <span>/families/{'{familyId}'}/{col.name}</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">{col.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Firestore Security Rules Code Block */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Firestore Security Rules (Security & Privacy Control)</span>
          </h3>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            {copiedRules ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedRules ? 'Tersalin' : 'Salin Security Rules'}</span>
          </button>
        </div>

        <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-[11px] text-emerald-300 font-mono overflow-x-auto leading-relaxed">
          {firestoreRulesSnippet}
        </pre>
      </div>

    </div>
  );
};
