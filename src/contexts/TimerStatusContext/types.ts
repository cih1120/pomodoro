import { ITask, TimerMode, TimerStatus } from '@/lib/types'

export interface ITimerStatusContext {
    mode: TimerMode
    status: TimerStatus
    runningTask: string | ITask
}

export type TIMER_ACTIONS =
    | { type: 'setMode'; payload: TimerMode }
    | { type: 'setStatus'; payload: TimerStatus }
    | { type: 'setRunningTimer'; payload: string | ITask }

export interface TimerStatusContextType {
    state: ITimerStatusContext
    dispatch: React.Dispatch<TIMER_ACTIONS>
}
