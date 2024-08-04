import { useState } from 'react'

import { ChevronUp } from 'lucide-react'
import { Select } from '@radix-ui/react-select'

import usePromodoroContext from '@/contexts/PromodoroContext'
import TaskList from './TaskList'
import { cn } from '@/lib/utils'

export default function TaskModal() {
    const { state } = usePromodoroContext()
    const tasks = state.tasks
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <section
            className={cn(
                isOpen
                    ? 'bottom-2/4 translate-y-1/2'
                    : 'bottom-0 translate-y-[70%] hover:translate-y-[64%]',
                'absolute left-2/4 z-10 flex h-lvh w-8/12 max-w-6xl -translate-x-1/2 flex-col items-center justify-center transition duration-200 ease-out'
            )}
        >
            <div
                onClick={toggleOpen}
                className="flex cursor-pointer items-center justify-center gap-1 rounded-tl-md rounded-tr-md bg-accent px-5 py-1 text-sm font-semibold leading-5 text-background"
            >
                <h5>My Pomodoro Note</h5>
                <ChevronUp
                    className={cn(isOpen ? 'rotate-180' : '', 'size-4')}
                />
            </div>
            <main className="h-3/5 max-h-96 w-full rounded-lg border border-accent bg-foreground p-3 shadow-solid">
                <div className="flex h-full flex-col rounded-lg bg-background px-2 py-1">
                    <div className="flex items-start justify-between">
                        <div className="w-full border-b border-b-accent px-2 py-1 font-semibold leading-6 text-black">
                            <div>Task</div>
                            <Select />
                        </div>
                    </div>
                    <div className="flex-1">
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
    )
}
