import React from 'react';
import { CalendarModule } from '../../features/calendar/CalendarModule';

export const ReminderCenterView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <CalendarModule initialSubTab="reminders" />
    </div>
  );
};
