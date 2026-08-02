import { ActiveTab, FamilyMember } from '../types';

export function getRoleAllowedTabs(member?: FamilyMember): ActiveTab[] {
  if (!member) {
    return [
      'dashboard', 'family', 'calendar', 'reminders', 'assistant',
      'mood', 'psychology', 'parenting', 'education',
      'health', 'insurance', 'finance',
      'meals', 'shopping', 'smarthome', 'travel', 'safety',
      'communication', 'memories',
      'analytics', 'admin'
    ];
  }

  const role = member.role;
  const detailed = member.detailedRole || '';
  const title = (member.roleTitle || '').toLowerCase();
  const rel = (member.relationship || '').toLowerCase();

  // 1. Orang Tua / Super Admin / Ayah / Ibu
  if (
    role === 'parents' || 
    detailed === 'Ayah' || 
    detailed === 'Ibu' || 
    rel.includes('ayah') || 
    rel.includes('ibu') || 
    title.includes('ayah') || 
    title.includes('ibu') || 
    title.includes('admin') ||
    title.includes('manajer') ||
    title.includes('pencari nafkah')
  ) {
    return [
      'dashboard', 'family', 'calendar', 'reminders', 'assistant',
      'mood', 'psychology', 'parenting', 'education',
      'health', 'insurance', 'finance',
      'meals', 'shopping', 'smarthome', 'travel', 'safety',
      'communication', 'memories',
      'analytics', 'admin'
    ];
  }

  // 2. Anak / Remaja / Student
  if (
    role === 'kids' || 
    detailed === 'Anak' || 
    rel.includes('anak') || 
    title.includes('anak') || 
    title.includes('remaja') || 
    title.includes('sma') || 
    title.includes('sd') || 
    title.includes('smp')
  ) {
    return [
      'dashboard', 'calendar', 'reminders', 'assistant',
      'mood', 'psychology', 'education', 'health',
      'meals', 'shopping', 'smarthome', 'travel', 'safety',
      'communication', 'memories'
    ];
  }

  // 3. Lansia / Kakek / Nenek / Senior
  if (
    role === 'seniors' || 
    detailed === 'Kakek' || 
    detailed === 'Nenek' || 
    rel.includes('kakek') || 
    rel.includes('nenek') || 
    title.includes('kakek') || 
    title.includes('nenek') || 
    title.includes('pensiunan') || 
    title.includes('lansia')
  ) {
    return [
      'dashboard', 'calendar', 'reminders', 'assistant',
      'health', 'insurance', 'meals', 'smarthome',
      'safety', 'communication', 'memories'
    ];
  }

  // Guest / Pengasuh
  return ['dashboard', 'calendar', 'reminders', 'assistant', 'communication', 'memories'];
}

export function getRoleBadgeInfo(member?: FamilyMember) {
  if (!member) {
    return {
      name: 'Super Admin',
      badge: 'Admin',
      color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      description: 'Akses penuh ke 21 modul keluarga, keuangan, & admin'
    };
  }

  const role = member.role;
  const detailed = member.detailedRole || '';
  const title = (member.roleTitle || '').toLowerCase();
  const rel = (member.relationship || '').toLowerCase();

  if (
    role === 'parents' || detailed === 'Ayah' || detailed === 'Ibu' ||
    rel.includes('ayah') || rel.includes('ibu') || title.includes('ayah') || title.includes('ibu')
  ) {
    return {
      name: 'Orang Tua (Akses Penuh)',
      badge: 'Full Access',
      color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      description: 'Akses penuh ke 21 modul keluarga, keuangan, & admin'
    };
  }

  if (
    role === 'kids' || detailed === 'Anak' || rel.includes('anak') ||
    title.includes('anak') || title.includes('remaja')
  ) {
    return {
      name: 'Anak & Remaja',
      badge: 'Modul Terpilih',
      color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      description: 'Modul Edukasi, Jadwal PR, Mood, Games, & Chat'
    };
  }

  if (
    role === 'seniors' || detailed === 'Kakek' || detailed === 'Nenek' ||
    rel.includes('kakek') || rel.includes('nenek') || title.includes('pensiunan')
  ) {
    return {
      name: 'Lansia / Kakek-Nenek',
      badge: 'Ramah Lansia',
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      description: 'Modul Kesehatan, Pengingat Obat, SOS, & Smart Home'
    };
  }

  return {
    name: 'Tamu / Anggota',
    badge: 'Akses Terbatas',
    color: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    description: 'Akses ringkas ke informasi umum & obrolan'
  };
}
