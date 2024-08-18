import { ITask } from '@/lib/types'
import TaskItem from './TaskItem'

export default function TaskList({ tasks }: { tasks: ITask[] }) {
    return (
        <ul className="h-full">
            {tasks.map((task) => {
                return <TaskItem key={task.taskId} task={task} />
            })}
        </ul>
    )
}
