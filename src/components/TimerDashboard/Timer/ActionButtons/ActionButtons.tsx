import PauseButton from './PauseButton'
import StartButton from './StartButton/StartButton'
import useTimerStatusContext from '@/contexts/TimerStatusContext'

export interface IActionButtons {
    handleStart: () => void
    handlePause: () => void
    handleRestart: () => void
}

export default function ActionButtons({
    handleStart,
    handlePause,
    handleRestart,
}: IActionButtons) {
    const { state } = useTimerStatusContext()
    const { status: timerStatus, mode } = state

    return (
        <div className="flex w-full items-center justify-center">
            {timerStatus === 'default' ? (
                <StartButton handleStart={handleStart} mode={mode} />
            ) : (
                <PauseButton
                    handleStart={handleStart}
                    handleRestart={handleRestart}
                    handlePause={handlePause}
                />
            )}
        </div>
    )
}
