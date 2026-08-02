import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  School,
  BookOpen,
  Calendar,
  Award,
  BarChart2,
  BookMarked,
  BrainCircuit,
  Sparkles,
  Zap,
  Trophy,
  Users,
  MessageSquare,
  LayoutDashboard
} from 'lucide-react';
import { useEducationStore } from '../../store/useEducationStore';
import { useFamilyStore } from '../../store/useFamilyStore';
import { EducationHeader, ChildEducationSelector } from './components/EducationHeader';
import { ScrollableTabNav } from '../../components/common/ScrollableTabNav';
import { EducationDashboardTab } from './components/EducationDashboardTab';
import { ChildEducationProfileTab } from './components/ChildEducationProfileTab';
import { SubjectManagementTab } from './components/SubjectManagementTab';
import { HomeworkCenterTab } from './components/HomeworkCenterTab';
import { AIHomeworkAssistantModal } from './components/AIHomeworkAssistantModal';
import { StudyPlannerTab } from './components/StudyPlannerTab';
import { ExamCenterTab } from './components/ExamCenterTab';
import { LearningAnalyticsTab } from './components/LearningAnalyticsTab';
import { ReadingCenterTab } from './components/ReadingCenterTab';
import { AILearningCoachTab } from './components/AILearningCoachTab';
import { SkillDevelopmentTab } from './components/SkillDevelopmentTab';
import { QuizCenterTab } from './components/QuizCenterTab';
import { CertificateAchievementTab } from './components/CertificateAchievementTab';
import { ParentEducationDashboardTab } from './components/ParentEducationDashboardTab';
import { TeacherCollaborationTab } from './components/TeacherCollaborationTab';

export const EducationCenterModule: React.FC = () => {
  const { selectedChildId, setSelectedChildId, profiles } = useEducationStore();
  const { familyMembers } = useFamilyStore();

  const childrenList = familyMembers
    .filter((m) => m.relationship === 'Anak' || m.role === 'kids' || (m.roleTitle || '').toLowerCase().includes('anak') || m.age < 18)
    .map((m) => ({
      id: m.id,
      name: m.name,
      age: m.age || 10,
      avatar: m.avatar,
      grade: profiles[m.id]?.grade || (m.age >= 15 ? 'SMA Kelas 2' : 'SD Kelas 5')
    }));

  useEffect(() => {
    if (childrenList.length > 0 && !childrenList.some((c) => c.id === selectedChildId)) {
      setSelectedChildId(childrenList[0].id);
    }
  }, [childrenList, selectedChildId, setSelectedChildId]);

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [assistantHwId, setAssistantHwId] = useState<string | undefined>(undefined);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  const selectedChild = childrenList.find((c) => c.id === selectedChildId) || childrenList[0];
  const childName = selectedChild?.name || 'Anak';

  const openAiAssistant = (hwId?: string) => {
    setAssistantHwId(hwId);
    setIsAiModalOpen(true);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'homework', label: 'Pusat PR', icon: BookOpen },
    { id: 'study', label: 'Jadwal Belajar', icon: Calendar },
    { id: 'subjects', label: 'Mata Pelajaran', icon: GraduationCap },
    { id: 'exams', label: 'Jadwal Ujian', icon: Award },
    { id: 'quiz', label: 'Kuis AI', icon: Zap },
    { id: 'analytics', label: 'Analisis Grafik', icon: BarChart2 },
    { id: 'reading', label: 'Pojok Baca', icon: BookMarked },
    { id: 'coach', label: 'AI Coach', icon: BrainCircuit },
    { id: 'skills', label: 'Skill Koding/Minat', icon: Sparkles },
    { id: 'certificates', label: 'Sertifikat', icon: Trophy },
    { id: 'parent', label: 'Dashboard Orangtua', icon: Users },
    { id: 'teacher', label: 'Catatan Guru', icon: MessageSquare },
    { id: 'profile', label: 'Profil Sekolah', icon: School }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Module Header */}
      <EducationHeader />

      {/* Child Selector Bar */}
      <ChildEducationSelector
        childrenList={childrenList}
        selectedChildId={selectedChildId}
        onSelectChild={setSelectedChildId}
        onOpenProfileTab={() => setActiveTab('profile')}
      />

      {/* Horizontal Nav Tabs Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2">
        <ScrollableTabNav>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400/50 shadow-md shadow-indigo-500/20'
                    : 'bg-slate-950/60 text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </ScrollableTabNav>
      </div>

      {/* Tab Contents */}
      {activeTab === 'dashboard' && (
        <EducationDashboardTab
          childName={childName}
          onNavigateTab={setActiveTab}
          onOpenAiAssistant={openAiAssistant}
          onStartQuiz={() => setActiveTab('quiz')}
        />
      )}

      {activeTab === 'profile' && <ChildEducationProfileTab childName={childName} />}

      {activeTab === 'subjects' && <SubjectManagementTab childName={childName} />}

      {activeTab === 'homework' && (
        <HomeworkCenterTab childName={childName} onOpenAiAssistant={openAiAssistant} />
      )}

      {activeTab === 'study' && <StudyPlannerTab childName={childName} />}

      {activeTab === 'exams' && (
        <ExamCenterTab childName={childName} onStartQuiz={() => setActiveTab('quiz')} />
      )}

      {activeTab === 'analytics' && <LearningAnalyticsTab childName={childName} />}

      {activeTab === 'reading' && <ReadingCenterTab childName={childName} />}

      {activeTab === 'coach' && (
        <AILearningCoachTab childName={childName} onOpenAiAssistant={() => openAiAssistant()} />
      )}

      {activeTab === 'skills' && <SkillDevelopmentTab childName={childName} />}

      {activeTab === 'quiz' && <QuizCenterTab childName={childName} />}

      {activeTab === 'certificates' && <CertificateAchievementTab childName={childName} />}

      {activeTab === 'parent' && <ParentEducationDashboardTab childName={childName} />}

      {activeTab === 'teacher' && <TeacherCollaborationTab childName={childName} />}

      {/* AI Homework Assistant Modal */}
      {isAiModalOpen && (
        <AIHomeworkAssistantModal
          homeworkId={assistantHwId}
          onClose={() => setIsAiModalOpen(false)}
        />
      )}
    </div>
  );
};
