import { ReactNode } from 'react'
import { PromodoroProvider } from '@/contexts/PromodoroContext'
import { TimerStatusProvider } from '@/contexts/TimerStatusContext'
import { Toaster } from '@/components/ui/sonner'

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <PromodoroProvider>
            <TimerStatusProvider>
                <Toaster />
                {children}
            </TimerStatusProvider>
        </PromodoroProvider>
    )
}
