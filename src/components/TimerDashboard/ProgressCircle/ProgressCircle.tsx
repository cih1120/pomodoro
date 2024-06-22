import { useMemo } from 'react'
// import { useTimeDashboard } from "@/src/providers/TimeDashboard";
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
// import { useTimer } from "@/src/hooks/useTimer";

const ProgressCircle = () => {
    // const { state, dispatch } = useTimeDashboard();
    // const { isRunning, isPausing, mode } = state;
    // const { remainingSeconds, progressPercentage } = useTimer();
    const state = 'isRunning'
    const progressPercentage = 50
    const remainingSeconds = 500

    return (
        <div className="relative">
            <ProgressRing percent={progressPercentage} />
            <p
                className={cn([
                    state == 'isRunning'
                        ? 'text-accent'
                        : 'text-accent-light',
                    'absolute-center text-4xl font-black',
                ])}
            >
                {Math.floor(remainingSeconds / 60)} : {remainingSeconds % 60}
            </p>
        </div>
    )
}

const ProgressRing = ({ percent }: { percent: number }) => {
    const circumference = useMemo(() => {
        return 110 * 2 * Math.PI
    }, [])
    const setProgress = useMemo(() => {
        return circumference - (percent / 100) * circumference
    }, [percent, circumference])

    const progressBarVariants = cva(
        'origin-center translate-x-[-6px] translate-y-[6px] -rotate-90',
        {
            variants: {
                progress: {
                    '100': 'opacity-100',
                    '<50': 'opacity-95',
                    '<10': 'opacity-85',
                },
                mode: {
                    focus: 'text-primary',
                    shortBreak: 'text-secondary',
                    longBreak: 'text-muted',
                },
            },
            defaultVariants: {
                progress: '100',
                mode: 'focus',
            },
        }
    )

    return (
        <svg className="relative h-[260px] w-[260px]">
            <circle
                className="text-gray-30 origin-center translate-x-[10px] translate-y-[10px]"
                strokeWidth="5"
                stroke="currentColor"
                fill="transparent"
                r="110"
                cx="120"
                cy="120"
            />
            <circle
                className="text-accent origin-center translate-x-[-20px] translate-y-[20px] -rotate-90"
                strokeWidth="20"
                strokeDasharray={circumference}
                strokeDashoffset={setProgress}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="110"
                cx="150"
                cy="150"
            />
            <circle
                className={cn(
                    progressBarVariants({
                        progress:
                            circumference > 50
                                ? '100'
                                : circumference > 10
                                  ? '<50'
                                  : '<10',
                    })
                )}
                strokeWidth="18"
                strokeDasharray={circumference}
                strokeDashoffset={setProgress}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="110"
                cx="136"
                cy="136"
            />
        </svg>
    )
}

export default ProgressCircle
