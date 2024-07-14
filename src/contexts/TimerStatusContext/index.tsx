import { ReactNode, createContext, useContext, useReducer } from 'react'
import { ITimerStatusContext, TIMER_ACTIONS } from './types'
import reducer from './reducer'

const initialState: ITimerStatusContext = {
    mode: 'focus',
    status: 'default',
    runningTask: '',
}

const TimerStatusContext = createContext<{
    state: ITimerStatusContext
    dispatch: React.Dispatch<TIMER_ACTIONS>
}>({ state: initialState, dispatch: () => null })

export const TimerStatusProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <TimerStatusContext.Provider value={{ state, dispatch }}>
            {children}
        </TimerStatusContext.Provider>
    )
}

const useTimerStatusContext = () => useContext(TimerStatusContext)

export default useTimerStatusContext
