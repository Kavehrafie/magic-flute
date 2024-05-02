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
  const playButtonRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("nothing");
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
    setCurrentTime(0);
  }

  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("ended", handleComplete);
    playButtonRef.current.addEventListener("click", () => {
      handlePlay();
      handleMute();
    });

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
    if (url) {
      playButtonRef.current.click();
    }
  }, [url]);

  return (
    <>
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

      {loadingStatus}

      <button ref={playButtonRef} className="hidden">
        <audio
          src={url}
          ref={audioRef}
          autoPlay
          playsInline
          muted
          onLoadStart={() => setLoadingStatus("started")}
          onCanPlay={() => setLoadingStatus("canplay")}
          onCanPlayThrough={() => {
            setLoadingStatus("canplaythrough");
          }}
        />
      </button>
    </>
  );
}
