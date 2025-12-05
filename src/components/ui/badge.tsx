import * as React from 'react'
import { cn } from '@/lib/utils'

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'secondary' | 'outline'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const base = 'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium'
  const variants: Record<Required<BadgeProps>['variant'], string> = {
    default: 'bg-gray-900 text-white dark:bg-white dark:text-gray-900',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
    outline: 'ring-1 ring-inset ring-gray-300 text-gray-700 dark:text-gray-300',
  }
  return <span className={cn(base, variants[variant], className)} {...props} />
}


