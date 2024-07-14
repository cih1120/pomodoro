import { useEffect, useState } from 'react'
import usePromodoroContext from '@/contexts/PromodoroContext'
import TaskInput from './TaskInput'
import { ITask } from '@/lib/types'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useTimerStatusContext from '@/contexts/TimerStatusContext'
import { generateDefaultTaskName } from '@/lib/utils'

export default function TaskNameDisplay() {
    const [taskName, setTaskName] = useState('')
    const [inputValue, setInputValue] = useState<string>('')
    const { state } = usePromodoroContext()
    const { state: TimerState, dispatch: TimerDispatch } =
        useTimerStatusContext()

    const onSubmit = (id: ITask['taskId']) => {
        const task = state.tasks.find((task) => task.taskId === id)
        if (task) {
            setTaskName(task?.taskName)
            TimerDispatch({ type: 'setRunningTimer', payload: task })
        }
    }

    const handleReset = () => {
        setTaskName('')
        setInputValue('')
    }

    useEffect(() => {
        if (TimerState.status === 'running' && !taskName) {
            const taskName = inputValue ? inputValue : generateDefaultTaskName()
            setTaskName(taskName)
            TimerDispatch({ type: 'setRunningTimer', payload: taskName })
        }
    }, [TimerState.status])

    // useEffect(() => {
    //     TimerDispatch({ type: 'setRunningTimer', payload: inputValue })
    // }, [inputValue])

    return (
        <div className="mx-auto h-9 w-full max-w-xl">
            {taskName ? (
                <div className="relative">
                    <h4 className="text-center text-lg">{taskName}</h4>
                    {TimerState.status === 'default' && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-2/4 -translate-y-1/2 text-accent/40"
                            onClick={handleReset}
                        >
                            <X />
                        </Button>
                    )}
                </div>
            ) : (
                <TaskInput
                    onSubmit={onSubmit}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
            )}
        </div>
    )
}
