import * as React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  asChild?: boolean
  noFocusStyle?: boolean
}

export function Button({ className, variant = 'default', size = 'md', asChild, noFocusStyle, children, ...props }: ButtonProps) {
  const base = noFocusStyle
    ? 'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors outline-none focus:outline-none ring-0 ring-offset-0 disabled:pointer-events-none disabled:opacity-50'
    : 'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

  const variants: Record<Variant, string> = {
    default: 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
    outline: 'border border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800',
    ghost: 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
  }

  const sizes: Record<Size, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-9 px-4 text-sm',
    lg: 'h-10 px-6 text-base',
  }

  const composedClass = cn(base, variants[variant], sizes[size], className)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      className: cn((children.props as any)?.className, composedClass),
      ...props,
    })
  }


  return (
    <button className={composedClass} {...props}>
      {children}
    </button>
  )
}


