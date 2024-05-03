import {
  type ChangeEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
  PlayCircleIcon,
  VolumeIcon,
  PauseCircle,
  PauseCircleIcon,
  VolumeXIcon,
  Volume2Icon,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@utils/tw.ts";
import { useStore } from "@nanostores/react";
import { audioTitle, audioUrl } from "@/store/podcast";
import { onMount } from "nanostores";
import { Dialog } from "@radix-ui/react-dialog";

interface AudioPlayerProps {
  url: string;
  className?: string;
  children?: ReactNode;
}
export default function AudioPlayer({
  url,
  className,
  children,
}: AudioPlayerProps) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window?.MSStream;
  const handlePlay = () => {
    audioRef?.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef?.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
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
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return hours > 0
      ? `${hours}:${minutes}:${formattedSeconds}`
      : `${minutes}:${formattedSeconds}`;
  }

  function handleMute() {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }

  function handleComplete() {
    setIsPlaying(false);
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
  }

  useEffect(() => {
    if (!isIOS) {
      handlePlay();
    }
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("ended", handleComplete);
    return () => {
      if (!audioRef.current) {
        return;
      }
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.removeEventListener("ended", handleComplete);
    };
  }, []);

  useEffect(() => {
    handleComplete();
  }, [url]);

  return (
    <>
      {isIOS && !isPlaying ? (
        <div className="flex flex-col items-center justify-between rounded border border-foreground bg-background p-4">
          <p className="py-4">
            IOS does not allow the audio to be autoplayed. Click the button
            below to play.
          </p>
          <Button onClick={handlePlay}>Play Audio</Button>
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-x-4 rounded-xl border border-foreground bg-background p-4 p-4",
            className
          )}
        >
          {children}
          <Button size="icon" variant="ghost" onClick={handlePlayPause}>
            {isPlaying ? (
              <PauseCircleIcon className="h-6 w-6" />
            ) : (
              <PlayCircleIcon className="h-6 w-6" />
            )}

            <span className="sr-only">Play/Pause</span>
          </Button>
          <div className="flex flex-1 items-center justify-center">
            {formatDuration(duration)} | {formatDuration(currentTime)}
            <Slider
              value={[currentTime || 0]}
              max={duration}
              step={1}
              className="mx-auto max-w-lg"
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
      )}
      <audio src={url} ref={audioRef} />
    </>
  );
}
