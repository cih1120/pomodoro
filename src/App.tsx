import './App.css'
import TimeDashboard from '@/components/TimerDashboard'

import Providers from './components/Providers'
import TaskModal from './components/TaskModal'
import ThemeToggle from './components/ui/themeButton'

function App() {
    return (
        <>
            <Providers>
                <header className="flex w-full items-center justify-center gap-1 py-6 text-center">
                    <ThemeToggle />
                    <h1 className="font-EBGaramond text-4xl font-extrabold italic leading-7">
                        Pomodoro
                    </h1>
                </header>
                <main>
                    <section className="flex justify-center">
                        <TimeDashboard />
                    </section>
                </main>
                <TaskModal />
            </Providers>
        </>
    )
}

export default App
