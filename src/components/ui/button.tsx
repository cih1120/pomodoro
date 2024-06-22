import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-font hover:bg-primary-dark',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-accent underline-offset-4 hover:underline',
            },
            size: {
                default: 'text-sm h-10 px-4 py-2',
                sm: 'text-sm h-9 rounded-md px-3',
                lg: 'rounded-md px-5 py-2.5 text-lg',
                icon: 'h-10 w-10',
            },
            shadow: {
                none: '',
                solid: 'shadow-solid hover:shadow-none',
            },
            font: {
                default: '',
                EBGaramond: 'font-EBGaramond',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            shadow: 'none',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, variant, size, shadow, font, asChild = false, ...props },
        ref
    ) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, shadow, font, className })
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
