import React from 'react';

export function NotificationSettingsModalContent() {
  return (
    <div className="space-y-6">
      {[
        { label: 'Notify on patient file uploads', default: true },
        { label: 'Notify on access requests', default: true },
        { label: 'Notify on external share activity', default: true },
        { label: 'Notify on emergency overrides', default: true, mandatory: true },
        { label: 'Email notifications', default: false },
        { label: 'Daily summary digest', default: false },
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between">
          <span className="text-sm font-medium">{item.label}</span>
          <div
            className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${
              item.default ? 'bg-orange-primary' : 'bg-white/10'
            }`}
          >
            <div
              className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${
                item.default ? 'right-1' : 'left-1'
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
