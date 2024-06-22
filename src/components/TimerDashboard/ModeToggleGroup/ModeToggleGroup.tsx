import { Button } from '@/components/ui/button'
import { PromodoroMode } from '@/lib/types'

export default function ModeToggleGroup() {
    const modesArray: PromodoroMode[] = ['focus', 'shortBreak', 'longBreak']

    return (
        <ul className="flex gap-8">
            {modesArray.map((value) => {
                return (
                    <li key={value}>
                        <Button
                            onClick={() => {}}
                            disabled={true}
                            variant="link"
                            size="lg"
                        >
                            {value}
                        </Button>
                    </li>
                )
            })}
        </ul>
    )
}
