import { Howl } from 'howler'
import { TimerMode } from '@/lib/types'
import useTimerStatusContext from '@/contexts/TimerStatusContext'
import { useEffect, useRef, useState } from 'react'

import timerStartSound from '@/assets/source/timerStart.mp3'
import timerDoneSound from '@/assets/source/timerDone.mp3'
import usePromodoroContext from '@/contexts/PromodoroContext'
import { generateTaskID } from '@/lib/utils'

export default function useTimer(mode: TimerMode, handleFinish: () => void) {
    const { state, dispatch } = useTimerStatusContext()
    const { dispatch: pomodoroDispatch } = usePromodoroContext()

    const timerStartAudio = useRef(new Howl({ src: [timerStartSound] }))
    const timerDoneAudio = useRef(new Howl({ src: [timerDoneSound] }))

    const modeDurations: Record<TimerMode, number> = {
        focus: 1500, // 25 minutes
        shortBreak: 300, // 5 minutes
        longBreak: 900, // 15 minutes
    }

    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [remainingSeconds, setRemainingSeconds] = useState<number>(0)
    const remainingSecondsRef = useRef(remainingSeconds)
    const [speedMultiplier, setSpeedMultiplier] = useState<number>(1000)
    const progressPercentage = Math.min(
        (remainingSeconds / modeDurations[mode]) * 100,
        100
    )
    let timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
    let konamiTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined
    )

    const initializeTimer = () => {
        if (timerRef.current !== undefined) {
            clearInterval(timerRef.current)
        }
        timerRef.current = undefined
        setIsRunning(false)
        setRemainingSeconds(modeDurations[mode])
        setSpeedMultiplier(1000)
    }

    const setKonamiSpeed = () => {
        setSpeedMultiplier(2)
    }

    const handleStart = () => {
        dispatch({ type: 'setStatus', payload: 'running' })
        setIsRunning(true)
        timerStartAudio.current.play()
    }

    const handlePause = () => {
        dispatch({ type: 'setStatus', payload: 'pause' })
        setSpeedMultiplier(1000)
        setIsRunning(false)
    }

    const handleRestart = () => {
        dispatch({ type: 'setStatus', payload: 'default' })
        initializeTimer()
    }

    const handleTimerFinish = () => {
        timerDoneAudio.current.play()
        dispatch({ type: 'setFinish' })

        if (state.mode === 'focus') {
            if (state.runningTask && 'taskName' in state.runningTask) {
                const taskId = generateTaskID()
                const task = {
                    taskId,
                    taskName: state.runningTask.taskName,
                    currentPromodoros: 1,
                }
                pomodoroDispatch({
                    type: 'setNewTask',
                    payload: { ...task },
                })

                dispatch({
                    type: 'setRunningTimer',
                    payload: {
                        taskId,
                    },
                })
            } else if (state.runningTask && 'taskId' in state.runningTask) {
                pomodoroDispatch({
                    type: 'addTaskPomodoro',
                    payload: state.runningTask.taskId,
                })
            }
        }

        handleFinish()
    }

    useEffect(() => {
        initializeTimer()
    }, [mode])

    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setRemainingSeconds((pre) => {
                    remainingSecondsRef.current = pre - 1
                    return pre - 1
                })
                if (remainingSecondsRef.current === 1) {
                    handleTimerFinish()
                    clearInterval(timerRef.current)
                }
            }, speedMultiplier)
        }
        return () => {
            if (timerRef.current !== undefined) {
                clearInterval(timerRef.current)
            }
        }
    }, [isRunning, speedMultiplier])

    // 監測鍵盤事件，觸發KonamiCode讓Timer加快
    useEffect(() => {
        const konamiCode = [
            'ArrowUp',
            'ArrowUp',
            'ArrowDown',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'ArrowLeft',
            'ArrowRight',
            'KeyB',
            'KeyA',
        ]
        let index = 0

        const resetKonamiTimeout = () => {
            if (konamiTimeoutRef.current) {
                clearTimeout(konamiTimeoutRef.current)
            }
            konamiTimeoutRef.current = setTimeout(() => {
                index = 0
            }, 10000) // 10-second limit for completing the input sequence
        }

        const handler = (event: KeyboardEvent) => {
            resetKonamiTimeout()
            console.log('++')
            if (event.code === konamiCode[index]) {
                index++
                if (index === konamiCode.length) {
                    console.log('Konami!')
                    setKonamiSpeed()
                    index = 0
                }
            } else {
                index = 0
            }
        }

        window.addEventListener('keydown', handler)
        return () => {
            window.removeEventListener('keydown', handler)
            if (konamiTimeoutRef.current) {
                clearTimeout(konamiTimeoutRef.current)
            }
        }
    }, [])

    return {
        handleStart,
        handlePause,
        handleRestart,
        remainingSeconds,
        progressPercentage,
    }
}
