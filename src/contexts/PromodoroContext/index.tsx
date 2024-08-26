import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
} from 'react'
import { IPromodoroContext, PROMODORO_ACTIONS } from './types'
import reducer from './reducer'

const LOCAL_STORAGE_KEY = 'promodoro-storage'

const initialState: IPromodoroContext = {
    tasks: [],
    tempRemovedTasks: [],
}

const PromodoroContext = createContext<{
    state: IPromodoroContext
    dispatch: React.Dispatch<PROMODORO_ACTIONS>
}>({
    state: initialState,
    dispatch: () => null,
})

export const PromodoroProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState, () => {
        const localData = localStorage.getItem(LOCAL_STORAGE_KEY)

        return localData
            ? { ...initialState, ...JSON.parse(localData) }
            : initialState
    })

    useEffect(() => {
        const { tasks } = state
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ tasks }))
    }, [state])

    return (
        <PromodoroContext.Provider value={{ state, dispatch }}>
            {children}
        </PromodoroContext.Provider>
    )
}

const usePromodoroContext = () => useContext(PromodoroContext)

export default usePromodoroContext
