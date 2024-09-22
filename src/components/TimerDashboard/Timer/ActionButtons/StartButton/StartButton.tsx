import { Button } from '@/components/ui/button'
import { ITimerStatusContext } from '@/contexts/TimerStatusContext/types'
import { IActionButtons } from '../ActionButtons'

interface StartButtonProps {
    handleStart: IActionButtons['handleStart']
    mode: ITimerStatusContext['mode']
}

export default function StartButton({ handleStart, mode }: StartButtonProps) {
    const getButtonText = (mode: ITimerStatusContext['mode']) => {
        switch (mode) {
            case 'focus':
                return 'Start Focus'
            case 'shortBreak':
                return 'Start Short Break'
            case 'longBreak':
                return 'Start Long Break'
            default:
                return 'Start'
        }
    }

    return (
        <Button
            onClick={handleStart}
            size="lg"
            shadow="solid"
            font="EBGaramond"
            className="w-full"
        >
            {getButtonText(mode)}
        </Button>
    )
}
