import React from 'react';
import { clsx } from 'clsx';

/* ================================================
   Button Component
   ================================================ */
const buttonVariants = {
  primary:
    'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-400 hover:to-indigo-500',
  secondary:
    'bg-[hsl(var(--color-surface-2))] text-[hsl(var(--color-text))] border border-[hsl(var(--color-border))] hover:bg-[hsl(var(--color-surface-3))] hover:border-[hsl(var(--color-text-faint)/0.4)]',
  ghost:
    'text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))] hover:bg-[hsl(var(--color-surface-2))]',
  danger:
    'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40',
  gradient:
    'bg-gradient-to-r from-blue-500 via-violet-500 to-purple-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:opacity-90',
};

const buttonSizes = {
  xs:  'text-xs  px-2.5 py-1   rounded-md  gap-1',
  sm:  'text-sm  px-3   py-1.5 rounded-lg  gap-1.5',
  md:  'text-sm  px-4   py-2   rounded-xl  gap-2',
  lg:  'text-base px-6  py-2.5 rounded-xl  gap-2',
  xl:  'text-base px-8  py-3.5 rounded-2xl gap-2.5',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center font-medium transition-all duration-200 select-none',
        'active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        buttonVariants[variant],
        buttonSizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      {children}
      {rightIcon && !loading && (
        <span className="shrink-0">{rightIcon}</span>
      )}
    </button>
  );
}

/* ================================================
   Badge Component
   ================================================ */
const badgeVariants = {
  default:  'bg-[hsl(var(--color-surface-3))] text-[hsl(var(--color-text-muted))]',
  blue:     'bg-blue-500/10   text-blue-400   border border-blue-500/20',
  purple:   'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  emerald:  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  amber:    'bg-amber-500/10  text-amber-400  border border-amber-500/20',
  red:      'bg-red-500/10    text-red-400    border border-red-500/20',
  success:  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
};

export function Badge({ children, variant = 'default', className, dot = false }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full',
        badgeVariants[variant],
        className
      )}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      )}
      {children}
    </span>
  );
}

/* ================================================
   Card Component
   ================================================ */
export function Card({ children, className, hover = false, glow = false, padding = true, ...props }) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))]',
        padding && 'p-5',
        hover && 'transition-all duration-300 hover:border-[hsl(var(--color-text-faint)/0.3)] hover:bg-[hsl(var(--color-surface-2))] hover:shadow-lg hover:-translate-y-0.5',
        glow && 'hover:shadow-blue-500/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ================================================
   Input Component
   ================================================ */
export function Input({ label, helper, error, leftIcon, rightIcon, className, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[hsl(var(--color-text-muted))]">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--color-text-faint))]">
            {leftIcon}
          </span>
        )}
        <input
          className={clsx(
            'w-full bg-[hsl(var(--color-surface-2))] border border-[hsl(var(--color-border))] rounded-xl',
            'px-4 py-2.5 text-sm text-[hsl(var(--color-text))] placeholder:text-[hsl(var(--color-text-faint))]',
            'transition-all duration-200',
            'hover:border-[hsl(var(--color-text-faint)/0.5)]',
            'focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10',
            error && 'border-red-500/50 focus:border-red-500/60 focus:ring-red-500/10',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--color-text-faint))]">
            {rightIcon}
          </span>
        )}
      </div>
      {(error || helper) && (
        <p className={clsx('text-xs', error ? 'text-red-400' : 'text-[hsl(var(--color-text-faint))]')}>
          {error || helper}
        </p>
      )}
    </div>
  );
}

/* ================================================
   Avatar Component
   ================================================ */
export function Avatar({ name, src, size = 'md', className }) {
  const sizes = { xs: 'w-6 h-6 text-xs', sm: 'w-8 h-8 text-sm', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-lg' };
  const initials = name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';

  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center font-semibold shrink-0 overflow-hidden',
        'bg-gradient-to-br from-blue-500 to-violet-600 text-white',
        sizes[size],
        className
      )}
    >
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : initials}
    </div>
  );
}

/* ================================================
   Progress Bar Component
   ================================================ */
export function ProgressBar({ value, max = 100, variant = 'blue', label, showValue = false, className }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const colors = {
    blue:    'from-blue-500 to-indigo-500',
    purple:  'from-violet-500 to-purple-600',
    emerald: 'from-emerald-400 to-teal-500',
    amber:   'from-amber-400 to-orange-500',
    rainbow: 'from-blue-500 via-violet-500 to-purple-600',
  };
  return (
    <div className={clsx('flex flex-col gap-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs text-[hsl(var(--color-text-muted))]">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="h-2 bg-[hsl(var(--color-surface-3))] rounded-full overflow-hidden">
        <div
          className={clsx('h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out', colors[variant])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ================================================
   Tooltip Component
   ================================================ */
export function Tooltip({ children, label, position = 'top' }) {
  const positionClasses = {
    top:    '-top-9 left-1/2 -translate-x-1/2',
    bottom: '-bottom-9 left-1/2 -translate-x-1/2',
    left:   'right-full top-1/2 -translate-y-1/2 -mr-1',
    right:  'left-full top-1/2 -translate-y-1/2 -ml-1',
  };
  return (
    <div className="relative group inline-flex">
      {children}
      <div
        className={clsx(
          'absolute z-50 px-2 py-1 text-xs font-medium text-white bg-[hsl(var(--color-surface-3))]',
          'border border-[hsl(var(--color-border))] rounded-lg whitespace-nowrap pointer-events-none',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
          positionClasses[position]
        )}
      >
        {label}
      </div>
    </div>
  );
}

/* ================================================
   Stat Card Component
   ================================================ */
export function StatCard({ label, value, icon, trend, trendLabel, color = 'blue', className }) {
  const colorMap = {
    blue:    { bg: 'bg-blue-500/10',    text: 'text-blue-400',    icon: 'text-blue-400' },
    purple:  { bg: 'bg-purple-500/10',  text: 'text-purple-400',  icon: 'text-purple-400' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', icon: 'text-emerald-400' },
    amber:   { bg: 'bg-amber-500/10',   text: 'text-amber-400',   icon: 'text-amber-400' },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <Card hover className={clsx('flex flex-col gap-4', className)}>
      <div className="flex items-start justify-between">
        <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', c.bg)}>
          <span className={clsx('text-xl', c.icon)}>{icon}</span>
        </div>
        {trend !== undefined && (
          <Badge variant={trend >= 0 ? 'emerald' : 'red'}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </Badge>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold font-['Sora'] text-[hsl(var(--color-text))]">{value}</div>
        <div className="text-sm text-[hsl(var(--color-text-muted))] mt-0.5">{label}</div>
        {trendLabel && (
          <div className="text-xs text-[hsl(var(--color-text-faint))] mt-1">{trendLabel}</div>
        )}
      </div>
    </Card>
  );
}

/* ================================================
   Empty State Component
   ================================================ */
export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-20 h-20 rounded-3xl bg-[hsl(var(--color-surface-2))] flex items-center justify-center text-4xl mb-5 border border-[hsl(var(--color-border))]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[hsl(var(--color-text))] mb-2">{title}</h3>
      <p className="text-sm text-[hsl(var(--color-text-muted))] max-w-sm leading-relaxed mb-6">{description}</p>
      {action}
    </div>
  );
}

/* ================================================
   Divider Component
   ================================================ */
export function Divider({ label, className }) {
  if (label) {
    return (
      <div className={clsx('flex items-center gap-3', className)}>
        <div className="flex-1 h-px bg-[hsl(var(--color-border))]" />
        <span className="text-xs text-[hsl(var(--color-text-faint))] font-medium">{label}</span>
        <div className="flex-1 h-px bg-[hsl(var(--color-border))]" />
      </div>
    );
  }
  return <div className={clsx('h-px bg-[hsl(var(--color-border))]', className)} />;
}
