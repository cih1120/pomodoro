import { Button } from '@/components/ui/button'
import useTimerStatusContext from '@/contexts/TimerStatusContext'
import { TimerMode } from '@/lib/types'
import { MouseEventHandler } from 'react'
export default function ModeToggleGroup() {
    const modesArray: { name: string; value: TimerMode }[] = [
        {
            name: 'Focus',
            value: 'focus',
        },
        {
            name: 'Short Break',
            value: 'shortBreak',
        },
        {
            name: 'Long Break',
            value: 'longBreak',
        },
    ]

    const { state, dispatch } = useTimerStatusContext()
    const setMode: MouseEventHandler<HTMLButtonElement> = (e) => {
        const target = e.target as HTMLButtonElement
        dispatch({ type: 'setMode', payload: target.value as TimerMode })
    }

    return (
        <ul className="flex gap-8">
            {modesArray.map((mode) => {
                return (
                    <li key={mode.value}>
                        <Button
                            onClick={setMode}
                            disabled={state.mode === mode.value}
                            value={mode.value}
                            variant="link"
                            size="lg"
                            className={
                                state.mode === mode.value ? 'font-black' : ''
                            }
                        >
                            {mode.name}
                        </Button>
                    </li>
                )
            })}
        </ul>
    )
}
