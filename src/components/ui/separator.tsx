import * as React from 'react'
import { cn } from '@/lib/utils'

export function Separator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('my-4 h-px w-full bg-gray-200 dark:bg-gray-800', className)} {...props} />
}


