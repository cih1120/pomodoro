import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import {
    Coffee,
    LucideIcon,
    Trees,
    CloudRain,
    Pause,
    Play,
    LoaderCircle,
} from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

interface MusicIconProps {
    icon: MusicItem['icon']
    isActive: boolean
    onClick: () => void
}

interface MusicItem {
    icon: LucideIcon
    audioUrl: string
}

const MusicList: MusicItem[] = [
    {
        icon: Coffee,
        audioUrl:
            'https://firebasestorage.googleapis.com/v0/b/hexnodefinal2024.appspot.com/o/coffee.mp3?alt=media&token=d37f8720-46d9-4a79-88cd-43e491116560',
    },
    {
        icon: Trees,
        audioUrl:
            'https://firebasestorage.googleapis.com/v0/b/hexnodefinal2024.appspot.com/o/forest.mp3?alt=media&token=ea07cbca-434b-46cc-a3d3-8a577b153879',
    },
    {
        icon: CloudRain,
        audioUrl:
            'https://firebasestorage.googleapis.com/v0/b/hexnodefinal2024.appspot.com/o/rain.mp3?alt=media&token=242d9af1-d301-4943-95ec-05b68f2f0407',
    },
]

export default function MusicPlayer() {
    const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [activeMusic, setActiveMusic] = useState<number>(0)
    const soundRef = useRef<Howl | null>(null)

    const loadAndPlayAudio = useCallback(
        async (index: number) => {
            setIsLoading(true)
            if (soundRef.current) {
                soundRef.current.stop()
                soundRef.current.unload()
            }
            soundRef.current = new Howl({
                src: [MusicList[index].audioUrl],
                loop: true,
                preload: false,
                onload: () => {
                    setIsLoading(false)
                    if (isMusicPlaying) {
                        soundRef.current?.play()
                    }
                },
                onloaderror: () => {
                    toast.warning(
                        'Unable to load the selected music. Please try again later.'
                    )
                    setIsLoading(false)
                },
            })

            soundRef.current.load()
        },
        [isMusicPlaying]
    )

    useEffect(() => {
        loadAndPlayAudio(activeMusic)
        return () => {
            soundRef.current?.unload()
        }
    }, [])

    const handleMusicClick = async (index: number) => {
        if (activeMusic !== index) {
            setActiveMusic(index)
            await loadAndPlayAudio(index)
        }
    }

    const handlePlayPauseClick = async () => {
        if (isLoading) return

        if (!soundRef.current) {
            loadAndPlayAudio(activeMusic)
        } else if (isMusicPlaying) {
            soundRef.current.pause()
        } else {
            soundRef.current.play()
        }

        setIsMusicPlaying(!isMusicPlaying)
    }

    const activeMusicPosition = useMemo(() => {
        const buttonHeight = 32
        const buttonMargin = 4
        return activeMusic * (buttonHeight + buttonMargin)
    }, [activeMusic])

    return (
        <div className="fixed right-1 top-2/4 rounded-md border border-accent/50 bg-card px-2 pb-3 pt-6 md:right-5 md:px-3 md:pb-5 md:pt-8">
            <Button
                variant="default"
                shadow="solid"
                onClick={handlePlayPauseClick}
                className={cn(
                    'absolute -top-7 left-1/2 h-12 w-12 -translate-x-1/2 rounded-full border border-accent p-1',
                    isMusicPlaying
                        ? 'text-accent-foreground border-accent bg-secondary'
                        : 'border-accent',
                    isLoading && 'cursor-not-allowed'
                )}
            >
                {isLoading ? (
                    <span className="animate-spin">
                        <LoaderCircle />
                    </span>
                ) : isMusicPlaying ? (
                    <Pause />
                ) : (
                    <Play />
                )}
            </Button>

            <ul className="relative flex flex-col gap-1">
                <div
                    className="absolute h-8 w-full rounded-md bg-secondary transition-all duration-300 ease-in-out dark:bg-accent"
                    style={{ top: `${activeMusicPosition}px` }}
                />
                {MusicList.map((music, index) => (
                    <MusicIcon
                        key={index}
                        icon={music.icon}
                        isActive={index === activeMusic}
                        onClick={() => handleMusicClick(index)}
                    />
                ))}
            </ul>
        </div>
    )
}

const MusicIcon: React.FC<MusicIconProps> = ({
    icon: Icon,
    isActive,
    onClick,
}) => {
    return (
        <li className="h-8 w-8">
            <Button
                variant="default"
                size="icon"
                className={cn(
                    'relative z-10 h-8 w-8 bg-transparent text-accent',
                    isActive && 'text-card'
                )}
                onClick={onClick}
            >
                <Icon className="h-6 w-6" />
            </Button>
        </li>
    )
}
