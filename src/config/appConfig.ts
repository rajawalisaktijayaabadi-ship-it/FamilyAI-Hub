export const APP_CONFIG = {
  name: 'FamilyAI Hub',
  tagline: 'One Smart AI Platform for Your Entire Family',
  version: '1.0.0',
  author: 'FamilyAI Hub Team',
  features: {
    enableAI: true,
    enableFirebase: true,
    enableNotifications: true,
    enableSmartHome: true,
    enableEmergencySOS: true
  },
  roles: [
    { id: 'super_admin', label: 'Super Admin', icon: 'ShieldAlert' },
    { id: 'parent', label: 'Orang Tua (Parent)', icon: 'Users' },
    { id: 'child', label: 'Anak (Child)', icon: 'Smile' },
    { id: 'grandparent', label: 'Kakek / Nenek (Grandparent)', icon: 'Heart' },
    { id: 'guest', label: 'Tamu (Guest)', icon: 'UserCheck' }
  ],
  categories: [
    'dashboard', 'assistant', 'mood', 'psychology', 'parenting',
    'education', 'health', 'insurance', 'finance', 'meals',
    'shopping', 'smarthome', 'safety', 'communication', 'memories',
    'analytics', 'admin'
  ]
};
