import { useState } from 'react'

export default function TaskNameDisplay() {
    // const { state, dispatch } = useTimeDashboard();
    // const { task } = state;
    const task = 'Test'
    const [taskName, setTaskName] = useState('')
    const onSubmit = () => {}

    return (
        <div className="mx-auto w-full max-w-60">
            {task ? (
                <h4 className="text-compared-100 text-center text-lg">
                    {task}
                </h4>
            ) : (
                <div className="flex gap-1">
                    <span>✏️</span>
                    <input
                        type="text"
                        className="border-compared-200 text-compared-200 placeholder-cherry-200 block w-full border-b border-dashed bg-transparent"
                        placeholder="What are you working on"
                        value={taskName}
                        maxLength={20}
                        minLength={1}
                        onChange={(e) => {
                            setTaskName(e.target.value)
                        }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                onSubmit()
                            }
                        }}
                        onBlur={onSubmit}
                    />
                </div>
            )}
        </div>
    )
}
