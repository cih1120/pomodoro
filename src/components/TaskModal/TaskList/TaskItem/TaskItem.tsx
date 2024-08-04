import { useMemo } from 'react'
import { Check } from 'lucide-react'
import { toast } from 'sonner'

import { ITask } from '@/lib/types'
import { cn, formatDate } from '@/lib/utils'
import usePromodoroContext from '@/contexts/PromodoroContext'

import Delete from '@/assets/images/delete.svg'
import Pencil from '@/assets/images/pencil.svg'
import Pomodoro from '@/assets/images/pomodoro.svg'

const PomodoroCountComponent = ({ isCompleted }: { isCompleted: boolean }) => {
    return (
        <li>
            <img
                className={cn(
                    'size-5',
                    isCompleted ? 'opacity-100' : 'opacity-50'
                )}
                src={Pomodoro}
                alt="Pomodoro"
            />
        </li>
    )
}

export default function TaskItem({ task }: { task: ITask }) {
    const { dispatch } = usePromodoroContext()

    const remainingPomodoros = useMemo(() => {
        const { currentPromodoros, expectedPromodoros } = task
        return Math.max(0, expectedPromodoros - currentPromodoros)
    }, [task.currentPromodoros, task.expectedPromodoros])

    const renderPomodoros = (count: number, isCompleted: boolean) =>
        Array.from({ length: count }, (_, i) => (
            <PomodoroCountComponent
                key={`${isCompleted ? 'completed' : 'remaining'}-${i}`}
                isCompleted={isCompleted}
            />
        ))

    const handleDeleteTask = () => {
        dispatch({ type: 'removeTask', payload: task.taskId })
        toast('Task has been removed', {
            description: 'Task has been removed',
            action: {
                label: 'Undo',
                onClick: () => {
                    dispatch({ type: 'restoreTask', payload: task.taskId })
                },
            },
        })
    }

    return (
        <li className="flex w-full border-separate items-center justify-between border-b border-dashed border-accent px-2.5 py-1">
            <div className="flex items-center gap-2">
                <Check
                    className={cn(
                        ['size-6 rounded-full p-1'],
                        remainingPomodoros
                            ? 'bg-foreground text-background'
                            : 'bg-primary text-white'
                    )}
                />
                <div className="text-accent-light">
                    <p className="text-xs font-normal">
                        {formatDate(task.createdAt)}
                    </p>
                    <h4 className="text-sm font-bold">{task.taskName}</h4>
                </div>
                <ul className="flex">
                    {renderPomodoros(task.currentPromodoros, true)}
                    {renderPomodoros(remainingPomodoros, false)}
                </ul>
            </div>
            <div className="flex">
                <i className="cursor-pointer">
                    <img src={Pencil} />
                </i>
                <i className="cursor-pointer" onClick={handleDeleteTask}>
                    <img src={Delete} />
                </i>
            </div>
        </li>
    )
}
