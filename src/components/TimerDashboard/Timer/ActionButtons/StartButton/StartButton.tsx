import { Button } from '@/components/ui/button'
import { IActionButtons } from '../ActionButtons'

export default function StartButton({
    handleStart,
}: {
    handleStart: IActionButtons['handleStart']
}) {
    return (
        <Button
            onClick={handleStart}
            size="lg"
            shadow="solid"
            font="EBGaramond"
            className="w-full"
        >
            Start Focus
        </Button>
    )
}
