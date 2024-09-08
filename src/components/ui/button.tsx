import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center text-font justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
    {
        variants: {
            variant: {
                default:
                    'bg-primary hover:bg-primary-dark  disabled:opacity-50',
                destructive:
                    'bg-destructive hover:bg-destructive/80  disabled:opacity-50',
                outline:
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary:
                    'bg-secondary hover:bg-secondary/80  disabled:opacity-50',
                ghost: 'text-destructive hover:bg-destructive hover:text-font',
                link: 'text-accent-foreground underline-offset-4 hover:underline',
            },
            size: {
                default: 'text-sm h-10 px-4 py-2',
                sm: 'text-sm h-9 rounded-md px-3',
                md: 'text-lg h-9 rounded-md px-3 md:text-xl',
                lg: 'rounded-lg px-3 py-2 text-xl md:text-2xl md:px-5',
                icon: 'h-8 w-8',
            },
            shadow: {
                none: '',
                solid: 'shadow-solid hover:shadow-none',
            },
            font: {
                default: '',
                EBGaramond: 'font-EBGaramond italic',
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
