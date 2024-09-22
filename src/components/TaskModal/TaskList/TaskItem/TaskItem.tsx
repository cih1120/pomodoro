import { useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { toast } from 'sonner'

import { ITask } from '@/lib/types'
import { cn, formatDate } from '@/lib/utils'
import usePromodoroContext from '@/contexts/PromodoroContext'
import { Input } from '@/components/ui/input'
import {
    StaticPomodoroList,
    RatingsPomodoroList,
} from '@/components/ui/pomodoros'

import Delete from '@/assets/images/delete.svg'
import Pencil from '@/assets/images/pencil.svg'
import { Button } from '@/components/ui/button'

const ActionButton = ({
    onClick,
    icon,
}: {
    onClick?: () => void
    icon: string
}) => (
    <button
        className={cn(
            'size-4 transition hover:opacity-85',
            onClick && 'cursor-pointer'
        )}
        onClick={onClick}
    >
        <img src={icon} alt="action" />
    </button>
)

const TaskStatus = ({ isCompleted }: { isCompleted: boolean }) => (
    <Check
        className={cn(
            'size-6 rounded-full p-1',
            isCompleted
                ? 'bg-primary text-white'
                : 'bg-foreground text-background'
        )}
    />
)

export default function TaskItem({ task }: { task: ITask }) {
    const { dispatch } = usePromodoroContext()

    //  Used to manage the values while editing a task.
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [taskName, setTaskName] = useState<string>(task.taskName)
    const [newExpectedPomodoros, setNewExpectedPomodoros] = useState<
        number | null
    >(null)

    const remainingPomodoros = useMemo(() => {
        return Math.max(0, task.expectedPromodoros - task.currentPromodoros)
    }, [task.currentPromodoros, task.expectedPromodoros])

    const handleDeleteTask = () => {
        dispatch({ type: 'removeTask', payload: task.taskId })
        toast('Task deleted', {
            description: 'The task has been removed',
            action: {
                label: 'Undo',
                onClick: () =>
                    dispatch({ type: 'restoreTask', payload: task.taskId }),
            },
        })
    }

    const handleSaveTask = () => {
        if (!taskName) {
            toast('Task Name cannot be empty!')
            return
        }
        dispatch({
            type: 'updateTask',
            payload: {
                ...task,
                taskName,
                expectedPromodoros:
                    newExpectedPomodoros || task.expectedPromodoros,
            },
        })
        setIsEditing(false)
        setNewExpectedPomodoros(null)
    }

    return (
        <li className="flex w-full border-separate flex-wrap items-center justify-between border-b border-dashed border-accent px-2 py-3">
            <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
                <TaskStatus isCompleted={remainingPomodoros === 0} />
                <div className="text-accent-light">
                    <p className="text-xs font-normal">
                        {formatDate(task.createdAt)}
                    </p>
                    {isEditing ? (
                        <Input
                            maxLength={16}
                            type="text"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            className="text-sm font-bold"
                        />
                    ) : (
                        <h4 className="text-sm font-bold">{task.taskName}</h4>
                    )}
                </div>
                <ul className="flex w-full md:w-auto">
                    {isEditing ? (
                        <RatingsPomodoroList
                            task={task}
                            newExpectedPomodoros={newExpectedPomodoros}
                            setNewExpectedPomodoros={setNewExpectedPomodoros}
                        />
                    ) : (
                        <StaticPomodoroList
                            currentCount={task.currentPromodoros}
                            remainingCount={remainingPomodoros}
                        />
                    )}
                </ul>
            </div>
            <div
                className={cn(
                    'ml-auto mt-1 flex h-11 w-auto items-center justify-end gap-1 text-accent',
                    isEditing ? 'w-full' : 'w-auto'
                )}
            >
                {isEditing ? (
                    <>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={handleSaveTask}
                        >
                            Save
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <ActionButton
                            onClick={() => setIsEditing(true)}
                            icon={Pencil}
                        />
                        <ActionButton
                            onClick={handleDeleteTask}
                            icon={Delete}
                        />
                    </>
                )}
            </div>
        </li>
    )
}
