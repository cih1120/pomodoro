import { TimerMode, TimerStatus } from '@/lib/types'

export type IRunningTask = { taskId: string } | { taskName: string } | null
export interface ITimerStatusContext {
    mode: TimerMode
    previousFinishModes: Array<TimerMode>
    status: TimerStatus
    runningTask: IRunningTask
}

export type TIMER_ACTIONS =
    | { type: 'setMode'; payload: TimerMode }
    | { type: 'setStatus'; payload: TimerStatus }
    | { type: 'setRunningTimer'; payload: IRunningTask }
    | { type: 'setFinish' }

export interface TimerStatusContextType {
    state: ITimerStatusContext
    dispatch: React.Dispatch<TIMER_ACTIONS>
}
