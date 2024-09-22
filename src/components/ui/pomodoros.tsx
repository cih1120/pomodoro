import { cn } from '@/lib/utils'
import { useCallback, useState } from 'react'
import { ITask } from '@/lib/types'
import Pomodoro from '@/assets/images/pomodoro.svg'

const PomodoroIcon = ({ opacity }: { opacity: 'full' | 'half' | 'low' }) => {
    const opacityClass = {
        full: 'opacity-100',
        half: 'opacity-60',
        low: 'opacity-20',
    }[opacity]

    return (
        <img
            className={cn('size-5 md:size-6', opacityClass)}
            src={Pomodoro}
            alt="Pomodoro"
        />
    )
}

const StaticPomodoroList = ({
    currentCount,
    remainingCount,
}: {
    currentCount: number
    remainingCount: number
}) => (
    <>
        {Array.from({ length: currentCount }).map((_, i) => (
            <li key={`completed-${i}`}>
                <PomodoroIcon opacity="full" />
            </li>
        ))}
        {Array.from({ length: remainingCount }).map((_, i) => (
            <li key={`remaining-${i}`}>
                <PomodoroIcon opacity="half" />
            </li>
        ))}
    </>
)

const RatingsPomodoroList = ({
    task,
    newExpectedPomodoros,
    setNewExpectedPomodoros,
}: {
    task: ITask
    newExpectedPomodoros: number | null
    setNewExpectedPomodoros: (count: number | null) => void
}) => {
    const [hoverIndex, setHoverIndex] = useState(0)
    const { currentPromodoros, expectedPromodoros } = task
    const PomodoroOpacity = useCallback(
        (index: number) => {
            if (newExpectedPomodoros !== null) {
                if (index < currentPromodoros) {
                    return 'full'
                }
                return index < newExpectedPomodoros ? 'half' : 'low'
            }

            if (index < currentPromodoros) {
                return 'full'
            }

            return index < expectedPromodoros || index <= hoverIndex
                ? 'half'
                : 'low'
        },
        [newExpectedPomodoros, currentPromodoros, hoverIndex]
    )

    return (
        <>
            {Array.from({ length: 10 }).map((_, index) => (
                <li
                    key={index}
                    className="transition-all duration-200 ease-in-out hover:scale-125"
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(0)}
                    onClick={() => setNewExpectedPomodoros(index + 1)}
                >
                    <PomodoroIcon opacity={PomodoroOpacity(index)} />
                </li>
            ))}
        </>
    )
}

export { StaticPomodoroList, RatingsPomodoroList }
