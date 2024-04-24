import { type ChangeEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button"
import { PlayCircleIcon, VolumeIcon, PauseCircle, PauseCircleIcon, VolumeXIcon, Volume2Icon } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@utils/tw.ts";
import { useStore } from "@nanostores/react";
import { audioTitle, audioUrl } from "@/store/podcast";
import { onMount } from "nanostores";

interface AudioPlayerProps {
  url: string
  className?: string
  children?: ReactNode
}
export default function AudioPlayer({ url, className, children }: AudioPlayerProps) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlay = () => {
    audioRef?.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef?.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    console.log(
      'playing: ' + isPlaying + ' | ' + 'muted: ' + isMuted
    );
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef?.current?.currentTime || 0);
    setDuration(audioRef?.current?.duration || 0);
  };

  const handleSeek = (value: number) => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  function formatDuration(durationSeconds: number) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }

  function handleMute() {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
  }

  function handleComplete() {

    setIsPlaying(false);
    audioRef.current.currentTime = 0;
    setCurrentTime(0)
  }

  useEffect(() => {
    handlePlay()
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("ended", handleComplete);
    return () => {
      if (!audioRef.current) { return; }
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.removeEventListener("ended", handleComplete);
    };
  }, [])


  useEffect(() => {
    handleComplete()
    handlePlay()
  }, [url])

  return (

    <>
      <div className={cn("flex items-center flex-wrap justify-between bg-background p-4 gap-x-4 rounded-xl border border-foreground p-4", className)}>
        {children}
        <Button size="icon" variant="ghost" onClick={handlePlayPause}>
          {isPlaying ? (
            <PauseCircleIcon className="h-6 w-6" />
          ) : (
            <PlayCircleIcon className="h-6 w-6" />
          )}

          <span className="sr-only">Play/Pause</span>
        </Button>
        <div className="flex-1 justify-center flex items-center">
          {formatDuration(duration)} | {formatDuration(currentTime)}
          <Slider value={[currentTime || 0]}
                  max={duration}
                  step={1}
                  className="max-w-lg mx-auto"
                  onValueChange={handleSeek}
          />
        </div>

        <Button size="icon" variant="ghost" onClick={handleMute}>
          {isMuted ? (
            <VolumeIcon className="h-6 w-6" />
          ) : (
            <Volume2Icon className="h-6 w-6" />
          )}
        </Button>
      </div>

      <audio
        src={url}
        ref={audioRef}
      />
    </>

  );
}