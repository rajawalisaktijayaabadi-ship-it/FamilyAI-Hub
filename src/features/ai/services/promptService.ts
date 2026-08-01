import { PromptTemplate } from '../types/aiTypes';

export const defaultPromptTemplates: PromptTemplate[] = [
  {
    id: 'p-greeting',
    title: 'Greeting Prompt',
    category: 'Greeting',
    template: 'Halo {{userName}}! Selamat {{timeOfDay}}. Saya FamilyAI Hub siap membantu keluarga {{familyName}} hari ini.',
    variables: ['userName', 'timeOfDay', 'familyName'],
    iconName: 'Sparkles',
    description: 'Sapaan hangat untuk memulai aktivitas keluarga hari ini.'
  },
  {
    id: 'p-summary',
    title: 'Summary Prompt',
    category: 'Summary',
    template: 'Ringkaskan percakapan berikut ke dalam 3 poin utama dan daftar tindakan (action items): {{conversation}}',
    variables: ['conversation'],
    iconName: 'FileText',
    description: 'Ringkasan percakapan otomatis.'
  },
  {
    id: 'p-recommendation',
    title: 'Recommendation Prompt',
    category: 'Recommendation',
    template: 'Berikan 3 rekomendasi aktivitas quality time keluarga berbasis usia anggota keluarga: {{members}}',
    variables: ['members'],
    iconName: 'Lightbulb',
    description: 'Saran aktivitas bersama yang hangat dan relevan.'
  },
  {
    id: 'p-planning',
    title: 'Planning Prompt',
    category: 'Planning',
    template: 'Buatkan draf rencana agenda harian keluarga untuk tanggal {{date}} mengingat prioritas berikut: {{priority}}',
    variables: ['date', 'priority'],
    iconName: 'Calendar',
    description: 'Penyusunan jadwal & agenda harian keluarga.'
  },
  {
    id: 'p-reminder',
    title: 'Reminder Prompt',
    category: 'Reminder',
    template: 'Pengingat penting: {{taskName}} untuk {{assignee}} pada jam {{time}}.',
    variables: ['taskName', 'assignee', 'time'],
    iconName: 'Bell',
    description: 'Notifikasi pengingat aktivitas anggota keluarga.'
  },
  {
    id: 'p-question',
    title: 'Question Prompt',
    category: 'Question',
    template: 'Jawab pertanyaan keluarga berikut secara bijak dan mudah dipahami: {{question}}',
    variables: ['question'],
    iconName: 'HelpCircle',
    description: 'Jawaban konsultasi dan pertanyaan harian.'
  }
];

export class PromptService {
  private static templates: PromptTemplate[] = [...defaultPromptTemplates];

  static getTemplates(): PromptTemplate[] {
    return this.templates;
  }

  static getByCategory(category: string): PromptTemplate[] {
    return this.templates.filter(t => t.category === category);
  }

  static fillTemplate(templateId: string, values: Record<string, string>): string {
    const tpl = this.templates.find(t => t.id === templateId);
    if (!tpl) return '';
    let result = tpl.template;
    Object.entries(values).forEach(([key, val]) => {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), val);
    });
    return result;
  }
}
