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
      borderClass: 'border-blue-200 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 text-blue-950 dark:text-blue-200',
      iconClass: 'text-blue-600 dark:text-blue-400',
      titleClass: 'text-blue-900 dark:text-blue-100 font-semibold'
    },
    tip: {
      icon: Lightbulb,
      defaultTitle: 'Tip',
      borderClass: 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200',
      iconClass: 'text-emerald-600 dark:text-emerald-400',
      titleClass: 'text-emerald-900 dark:text-emerald-100 font-semibold'
    },
    warning: {
      icon: AlertTriangle,
      defaultTitle: 'Warning',
      borderClass: 'border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200',
      iconClass: 'text-amber-600 dark:text-amber-400',
      titleClass: 'text-amber-900 dark:text-amber-100 font-semibold'
    },
    security: {
      icon: ShieldAlert,
      defaultTitle: 'Security Critical',
      borderClass: 'border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200',
      iconClass: 'text-rose-600 dark:text-rose-400',
      titleClass: 'text-rose-900 dark:text-rose-100 font-semibold'
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
          <div className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-normal leading-relaxed">{children}</div>
        </div>
      </div>
    </aside>
  );
};
