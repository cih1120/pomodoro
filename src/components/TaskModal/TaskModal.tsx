import { useMemo, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { Select } from '@radix-ui/react-select'
import usePromodoroContext from '@/contexts/PromodoroContext'
import TaskList from './TaskList'
import { cn } from '@/lib/utils'
import useTimerStatusContext from '@/contexts/TimerStatusContext'

export default function TaskModal() {
    const { state } = usePromodoroContext()
    const { state: timerStatus } = useTimerStatusContext()
    const tasks = state.tasks
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => {
        setIsOpen((prev) => !prev)
    }
    const isTimerStateDefault = useMemo(() => {
        return !(timerStatus.status === 'default')
    }, [timerStatus])

    return (
        <>
            {/* Fullscreen mask */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50"
                    onClick={toggleOpen}
                ></div>
            )}
            <section
                className={cn(
                    isOpen
                        ? 'bottom-2/4 z-50 translate-y-1/2'
                        : 'bottom-0 translate-y-[70%] hover:translate-y-[64%]',
                    'absolute left-2/4 flex w-8/12 max-w-6xl -translate-x-1/2 flex-col items-center justify-center transition duration-200 ease-out',
                    isTimerStateDefault && 'translate-y-full'
                )}
            >
                <div
                    onClick={toggleOpen}
                    className="flex cursor-pointer items-center justify-center gap-1 rounded-tl-md rounded-tr-md bg-accent px-5 py-2.5 text-sm font-semibold leading-5 text-background"
                >
                    <h5>My Pomodoro Note</h5>
                    <ChevronUp
                        className={cn(isOpen ? 'rotate-180' : '', 'size-4')}
                    />
                </div>
                <main className="w-full rounded-2xl border border-x-2 border-b-4 border-border bg-foreground p-3 shadow-solid">
                    <div className="flex flex-col rounded-xl bg-card px-6 py-2">
                        <div className="flex items-start justify-between">
                            <div className="w-full border-b border-b-accent px-2 py-2.5">
                                <h4 className="text-lg font-black leading-6 text-accent-light">
                                    Tasks
                                </h4>
                                <Select />
                            </div>
                        </div>
                        <div className="h-[45vh] overflow-y-auto">
                            {tasks.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center gap-1 text-center text-accent-light">
                                    <p className="text-3xl font-semibold">
                                        _(┐「ε:)_
                                    </p>
                                    <p className="text-base font-semibold">
                                        Looks like you've nailed all the tasks!
                                    </p>
                                </div>
                            ) : (
                                <TaskList tasks={tasks} />
                            )}
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}
