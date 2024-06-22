import './App.css'
import TimeDashboard from '@/components/TimerDashboard'
function App() {
    return (
        <>
            <header className="w-full py-6 text-center">
                <h1 className="font-EBGaramond text-4xl font-extrabold italic leading-7">
                    Pomodoro
                </h1>
            </header>
            <main>
                <section className="flex justify-center">
                    <TimeDashboard />
                </section>
            </main>
        </>
    )
}

export default App
