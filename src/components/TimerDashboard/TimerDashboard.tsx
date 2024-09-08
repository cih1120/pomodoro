import ModeToggleGroup from './ModeToggleGroup'
import TaskNameDisplay from './TaskNameDisplay'
import Timer from './Timer/Timer'

export default function TimeDashboard() {
    return (
        <div className="shadow-normal inline-flex w-full max-w-2xl flex-col items-center gap-7 border border-border bg-card px-2 py-10 md:p-10">
            <ModeToggleGroup />
            <div className="flex flex-col gap-3">
                <TaskNameDisplay />
                <Timer />
            </div>
        </div>
    )
}
