import { useMemo, useState, useEffect, useRef, Dispatch } from 'react'
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import usePromodoroContext from '@/contexts/PromodoroContext'

export default function TaskInput({
    onSubmit,
    inputValue,
    setInputValue,
}: {
    onSubmit: (id: string) => void
    inputValue: string
    setInputValue: Dispatch<string>
}) {
    const { state, dispatch } = usePromodoroContext()
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const commandRef = useRef<HTMLDivElement>(null)
    const commandStyle = useMemo(() => {
        return `rounded-lg ${menuOpen && 'border bg-background'}`
    }, [menuOpen])

    const selectTask = () => {
        dispatch({ type: 'setNewTask', payload: { taskName: inputValue } })
        const latestTask = [...state.tasks].pop()
        if (latestTask) {
            onSelect(latestTask.taskId)
        }
    }

    /* 手動關閉command的下拉選單 */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                commandRef.current &&
                !commandRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [commandRef])

    const customCommandFilter = (value: string, search: string): number => {
        const task = state.tasks.find((t) => t.taskId === value)
        if (task?.taskName.includes(search)) return 1
        return 0
    }

    const onSelect = (id: string) => {
        onSubmit(id)
        setMenuOpen(false)
    }

    return (
        <div className="relative flex h-full items-center">
            <div className="absolute right-0 top-0 z-10 w-full">
                <Command
                    ref={commandRef}
                    className={commandStyle}
                    filter={customCommandFilter}
                >
                    <CommandInput
                        value={inputValue}
                        maxLength={16}
                        minLength={1}
                        className="block w-full rounded-none border-b border-dashed border-accent bg-transparent px-2 py-1 text-base text-accent placeholder-primary"
                        onValueChange={setInputValue}
                        placeholder="What are you working on"
                        onFocus={() => setMenuOpen(true)}
                    />
                    <CommandList className={menuOpen ? '' : 'hidden'}>
                        <CommandGroup>
                            {state.tasks.map((task) => (
                                <CommandItem
                                    key={task.taskId}
                                    value={task.taskId}
                                    onSelect={onSelect}
                                >
                                    <span>{task.taskName}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandList
                        className={
                            inputValue && menuOpen
                                ? 'flex min-h-[50px] items-center justify-center p-1'
                                : 'hidden'
                        }
                    >
                        <Button
                            onClick={selectTask}
                            className="mx-auto flex h-auto w-full items-end gap-1 text-pretty text-center"
                        >
                            <Plus
                                size={20}
                                strokeWidth={3}
                                className="text-font/80"
                            />
                            {`Create a Promodoro for ${inputValue}`}
                        </Button>
                    </CommandList>
                </Command>
            </div>
        </div>
    )
}
