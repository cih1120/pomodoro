import { current, produce } from 'immer'
import { ITimerStatusContext, TIMER_ACTIONS } from './types'
import { TimerMode } from '@/lib/types'

const reducer = (state: ITimerStatusContext, action: TIMER_ACTIONS) => {
    switch (action.type) {
        case 'setMode':
            return produce(state, (draft) => {
                draft.mode = action.payload
                draft.status = 'default'
            })
        case 'setStatus':
            return produce(state, (draft) => {
                draft.status = action.payload
                if (draft.runningTask) {
                }
            })
        case 'setRunningTimer':
            return produce(state, (draft) => {
                draft.runningTask = action.payload
            })
        case 'setFinish':
            return produce(state, (draft) => {
                const getNextMode = (
                    modesArray: Array<TimerMode>
                ): TimerMode => {
                    // Function to get the next mode based on the previous modes
                    // If 'focus' has been completed 4 times, the next mode will be 'longBreak'
                    const focusCount = modesArray.filter(
                        (mode) => mode === 'focus'
                    ).length
                    const lastMode = modesArray[modesArray.length - 1]

                    if (lastMode !== 'focus') return 'focus'
                    if (focusCount === 4) return 'longBreak'
                    return 'shortBreak'
                }

                const isLongBreak = draft.mode === 'longBreak'
                draft.previousFinishModes = isLongBreak
                    ? []
                    : [...draft.previousFinishModes, draft.mode].slice(-7)

                draft.mode = isLongBreak
                    ? 'focus'
                    : getNextMode(draft.previousFinishModes)
                draft.status = 'default'
            })
        default:
            return state
    }
}

export default reducer
