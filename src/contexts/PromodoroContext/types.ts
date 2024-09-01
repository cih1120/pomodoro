import { ITask } from '@/lib/types'

export interface IPromodoroContext {
    tasks: ITask[]
    tempRemovedTasks: ITask[]
}

export type PROMODORO_ACTIONS =
    | {
          type: 'setNewTask'
          payload: {
              taskName: ITask['taskName']
              taskId?: string
              currentPromodoros?: number
          }
      }
    | { type: 'removeTask'; payload: ITask['taskId'] }
    | { type: 'editTask'; payload: ITask }
    | { type: 'addTaskPomodoro'; payload: ITask['taskId'] }
    | { type: 'restoreTask'; payload: ITask['taskId'] }
    | { type: 'updateTask'; payload: ITask }
