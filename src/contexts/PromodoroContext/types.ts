import { ITask } from '@/lib/types'

export interface IPromodoroContext {
    tasks: ITask[]
    tempRemovedTasks: ITask[]
}

export type PROMODORO_ACTIONS =
    | { type: 'setNewTask'; payload: ITask['taskName'] }
    | { type: 'removeTask'; payload: ITask['taskId'] }
    | { type: 'editTask'; payload: ITask }
    | { type: 'addTaskPomodoro'; payload: ITask['taskId'] }
    | { type: 'restoreTask'; payload: ITask['taskId'] }
