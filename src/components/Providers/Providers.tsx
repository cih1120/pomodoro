import { PromodoroProvider } from '@/contexts/PromodoroContext'
import { TimerStatusProvider } from '@/contexts/TimerStatusContext'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
    return <PromodoroProvider><TimerStatusProvider>{children}</TimerStatusProvider></PromodoroProvider>
}
