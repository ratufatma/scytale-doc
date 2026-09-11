import React from 'react';
import { Info, Lightbulb, AlertTriangle, ShieldAlert } from 'lucide-react';
import { DocCalloutType } from '../../types';

interface CalloutProps {
  type?: DocCalloutType;
  title?: string;
  children: React.ReactNode;
  id?: string;
}

export const Callout: React.FC<CalloutProps> = ({
  type = 'note',
  title,
  children,
  id
}) => {
  const configs = {
    note: {
      icon: Info,
      defaultTitle: 'Note',
      borderClass: 'border-blue-200 bg-blue-50/50 text-blue-950',
      iconClass: 'text-blue-600',
      titleClass: 'text-blue-900 font-semibold'
    },
    tip: {
      icon: Lightbulb,
      defaultTitle: 'Tip',
      borderClass: 'border-emerald-200 bg-emerald-50/50 text-emerald-950',
      iconClass: 'text-emerald-600',
      titleClass: 'text-emerald-900 font-semibold'
    },
    warning: {
      icon: AlertTriangle,
      defaultTitle: 'Warning',
      borderClass: 'border-amber-200 bg-amber-50/50 text-amber-950',
      iconClass: 'text-amber-600',
      titleClass: 'text-amber-900 font-semibold'
    },
    security: {
      icon: ShieldAlert,
      defaultTitle: 'Security Critical',
      borderClass: 'border-rose-200 bg-rose-50/50 text-rose-950',
      iconClass: 'text-rose-600',
      titleClass: 'text-rose-900 font-semibold'
    }
  };

  const config = configs[type];
  const IconComponent = config.icon;

  return (
    <aside
      id={id || `callout-${Math.random().toString(36).substring(2, 8)}`}
      className={`my-4 p-4 rounded-lg border text-sm leading-relaxed ${config.borderClass}`}
      role="note"
    >
      <div className="flex items-start gap-3">
        <IconComponent className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconClass}`} />
        <div className="space-y-1 w-full">
          <h4 className={`text-sm ${config.titleClass}`}>{title || config.defaultTitle}</h4>
          <div className="text-zinc-800 text-xs sm:text-sm font-normal">{children}</div>
        </div>
      </div>
    </aside>
  );
};
