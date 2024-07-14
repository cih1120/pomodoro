import { produce } from 'immer'
import { ITimerStatusContext, TIMER_ACTIONS } from './types'

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
        default:
            return state
    }
}

export default reducer
