import useTimer from '@/hooks/useTimer'
import ActionButtons from './ActionButtons'
import ProgressCircle from './ProgressCircle'
import useTimerStatusContext from '@/contexts/TimerStatusContext'

export default function Timer() {
    const { state, dispatch } = useTimerStatusContext()
    const handleTimerFinish = () => {}
    const {
        handleStart,
        handlePause,
        handleRestart,
        remainingSeconds,
        progressPercentage,
    } = useTimer(state.mode, handleTimerFinish)

    return (
        <div className="flex flex-col gap-2">
            <ProgressCircle
                progressPercentage={progressPercentage}
                remainingSeconds={remainingSeconds}
            />
            <ActionButtons
                handleStart={handleStart}
                handlePause={handlePause}
                handleRestart={handleRestart}
            />
        </div>
    )
}
