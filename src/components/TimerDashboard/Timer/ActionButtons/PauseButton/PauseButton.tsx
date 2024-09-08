import { Button } from '@/components/ui/button'
import { IActionButtons } from '../ActionButtons'
import useTimerStatusContext from '@/contexts/TimerStatusContext'

export default function PauseButton({
    handleRestart,
    handlePause,
    handleStart,
}: IActionButtons) {
    const { state } = useTimerStatusContext()
    return (
        <div className="flex w-full items-center justify-center gap-1">
            {state.status === 'pause' ? (
                <Button
                    onClick={handleStart}
                    size="lg"
                    shadow="solid"
                    font="EBGaramond"
                    className="w-full"
                >
                    Continue
                </Button>
            ) : (
                <Button
                    onClick={handlePause}
                    size="lg"
                    shadow="solid"
                    font="EBGaramond"
                    className="w-full"
                >
                    Pause
                </Button>
            )}
            <Button
                variant="link"
                size="md"
                className="w-full"
                onClick={handleRestart}
            >
                Restart
            </Button>
        </div>
    )
}
