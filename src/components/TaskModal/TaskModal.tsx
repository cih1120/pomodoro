import { useMemo, useState } from 'react'
import { ChevronUp } from 'lucide-react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import usePromodoroContext from '@/contexts/PromodoroContext'
import useTimerStatusContext from '@/contexts/TimerStatusContext'
import { cn } from '@/lib/utils'
import { ITask } from '@/lib/types'

import TaskList from './TaskList'

type TaskSortOption = 'newest_first' | 'oldest_first' | 'time_asc' | 'time_desc'

export default function TaskModal() {
    const { state } = usePromodoroContext()
    const { state: timerStatus } = useTimerStatusContext()
    const tasks = state.tasks

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [taskSort, setTaskSort] = useState<TaskSortOption>('newest_first')
    const [isSelectActive, setIsSelectActive] = useState(false)

    const toggleModalOpen = () => {
        setIsOpen((prev) => !prev)
    }

    const handleSortChange = (value: TaskSortOption) => {
        setTaskSort(value)
    }

    const isTimerStateDefault = useMemo(() => {
        return !(timerStatus.status === 'default')
    }, [timerStatus])

    const sortedTasks = useMemo(() => {
        const getTimeCode = (createdAt: Date | string) =>
            new Date(createdAt).getTime()

        return [...tasks].sort((a: ITask, b: ITask) => {
            const remainingPomodorosA =
                a.expectedPromodoros - a.currentPromodoros
            const remainingPomodorosB =
                b.expectedPromodoros - b.currentPromodoros
            const timeA = getTimeCode(a.createdAt)
            const timeB = getTimeCode(b.createdAt)

            switch (taskSort) {
                case 'newest_first':
                    return timeB - timeA
                case 'oldest_first':
                    return timeA - timeB
                case 'time_asc':
                    return remainingPomodorosA !== remainingPomodorosB
                        ? remainingPomodorosA - remainingPomodorosB
                        : timeA - timeB
                case 'time_desc':
                    return remainingPomodorosA !== remainingPomodorosB
                        ? remainingPomodorosB - remainingPomodorosA
                        : timeB - timeA
                default:
                    return 0
            }
        })
    }, [tasks, taskSort])

    return (
        <>
            {/* Fullscreen mask */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50"
                    onClick={toggleModalOpen}
                ></div>
            )}
            <section
                className={cn(
                    isOpen
                        ? 'bottom-1/2 z-50 translate-y-1/2'
                        : 'bottom-0 translate-y-[90%] hover:translate-y-[88%] md:translate-y-[80%] md:hover:translate-y-[76%]',
                    'absolute left-2/4 flex w-11/12 max-w-6xl -translate-x-1/2 flex-col items-center justify-center transition duration-200 ease-out md:w-8/12',
                    isTimerStateDefault &&
                        'translate-y-full md:translate-y-full'
                )}
            >
                <div
                    onClick={toggleModalOpen}
                    className="flex cursor-pointer items-center justify-center gap-1 rounded-tl-md rounded-tr-md bg-accent px-5 py-2.5 text-sm font-semibold leading-5 text-background"
                >
                    <h5>My Pomodoro Note</h5>
                    <ChevronUp
                        className={cn(isOpen ? 'rotate-180' : '', 'size-4')}
                    />
                </div>
                <main className="w-full rounded-2xl border border-x-2 border-b-4 border-border bg-foreground p-3 shadow-solid">
                    <div className="flex flex-col rounded-xl bg-card px-6 py-2">
                        <div className="flex w-full items-center justify-between border-b border-b-accent px-2 py-2.5">
                            <h4 className="text-lg font-black leading-6 text-accent-light">
                                Tasks
                            </h4>
                            <Select
                                open={isSelectActive}
                                value={taskSort}
                                onOpenChange={(o) => setIsSelectActive(o)}
                                onValueChange={handleSortChange}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Task Sort" />
                                </SelectTrigger>
                                <SelectContent
                                    className="absolute"
                                    sticky="always"
                                >
                                    <SelectGroup>
                                        <SelectItem value="newest_first">
                                            Newest First
                                        </SelectItem>
                                        <SelectItem value="oldest_first">
                                            Oldest First
                                        </SelectItem>
                                        <SelectItem value="time_asc">
                                            Shortest Time First
                                        </SelectItem>
                                        <SelectItem value="time_desc">
                                            Longest Time First
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="h-[45vh] overflow-y-auto">
                            {sortedTasks.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center gap-1 text-center text-accent-light">
                                    <p className="text-3xl font-semibold">
                                        _(┐「ε:)_
                                    </p>
                                    <p className="text-base font-semibold">
                                        Looks like you've nailed all the tasks!
                                    </p>
                                </div>
                            ) : (
                                <TaskList tasks={sortedTasks} />
                            )}
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}
