import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null)

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches

        const initialDarkMode =
            savedTheme === 'dark' || (!savedTheme && prefersDark)
        setIsDarkMode(initialDarkMode)
        document.documentElement.classList.toggle('dark', initialDarkMode)
    }, [])

    useEffect(() => {
        if (isDarkMode !== null) {
            document.documentElement.classList.toggle('dark', isDarkMode)
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
        }
    }, [isDarkMode])

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev)
    }

    return (
        <Button
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className="text-accent"
        >
            {isDarkMode ? <Moon /> : <Sun />}
        </Button>
    )
}

export default ThemeToggle
