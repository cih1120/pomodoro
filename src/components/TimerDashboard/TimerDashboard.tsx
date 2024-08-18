import ModeToggleGroup from './ModeToggleGroup'
import TaskNameDisplay from './TaskNameDisplay'
import Timer from './Timer/Timer'

export default function TimeDashboard() {
    return (
        <div className="shadow-normal inline-flex flex-col items-center gap-7 border border-border bg-card p-10">
            <ModeToggleGroup />
            <div className="flex flex-col gap-3">
                <TaskNameDisplay />
                <Timer />
            </div>
        </div>
    )
}
