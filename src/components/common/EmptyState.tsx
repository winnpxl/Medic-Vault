import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
}

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: ReactNode;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  /** `page` fills the content area; `section` sits inside a card, table or tab. */
  size?: 'page' | 'section';
  className?: string;
}

/** The one empty / not-found state used across the app. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  size = 'section',
  className = '',
}: EmptyStateProps) {
  const layout = size === 'page' ? 'empty-state-page flex-1' : 'flex items-center justify-center text-center px-4 py-14 lg:py-20';

  return (
    <div className={`${layout} ${className}`}>
      <div className="flex flex-col items-center max-w-sm">
        <div className="relative mb-5">
          <div aria-hidden className="absolute inset-0 rounded-full bg-orange-primary/20 blur-2xl" />
          <div className="relative w-14 h-14 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <Icon className="w-6 h-6 text-orange-primary" strokeWidth={1.75} />
          </div>
        </div>

        <h3 className="text-base lg:text-lg font-semibold text-white">{title}</h3>
        {description && (
          <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{description}</p>
        )}

        {(primaryAction || secondaryAction) && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {secondaryAction && <ActionButton action={secondaryAction} className="btn-secondary" />}
            {primaryAction && <ActionButton action={primaryAction} className="btn-primary" />}
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({ action, className }: { action: EmptyStateAction; className: string }) {
  const Icon = action.icon;
  return (
    <button type="button" onClick={action.onClick} className={className}>
      {Icon && <Icon className="w-4 h-4" />}
      {action.label}
    </button>
  );
}
