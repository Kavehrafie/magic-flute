import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import WaveSurfer from "wavesurfer.js";
import { type WaveSurferOptions } from "wavesurfer.js";
import { useWavesurfer } from "@wavesurfer/react";
import {
  PauseCircleIcon,
  PlayCircleIcon,
  Volume1Icon,
  Volume2Icon,
  VolumeIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@components/ui/button";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/utils/tw";
import LoadingDots from "./LoadingDots";
import { useTranslations } from "@/lib/i18n";
import { formatTime } from "@/utils/timeFormat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

const gradientRatio = 0.3;
const makeGradient = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Define the waveform gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.2);
  gradient.addColorStop(0, "#656666"); // Top color
  gradient.addColorStop(
    (canvas.height * gradientRatio) / canvas.height,
    "#656666"
  ); // Top color
  gradient.addColorStop(
    (canvas.height * gradientRatio + 1) / canvas.height,
    "#ffffff"
  ); // White line
  gradient.addColorStop(
    (canvas.height * gradientRatio + 2) / canvas.height,
    "#ffffff"
  ); // White line
  gradient.addColorStop(
    (canvas.height * gradientRatio + 3) / canvas.height,
    "#B1B1B1"
  ); // Bottom color
  gradient.addColorStop(1, "#B1B1B1"); // Bottom color

  // Define the progress gradient
  const progressGradient = ctx.createLinearGradient(
    0,
    0,
    0,
    canvas.height * 1.2
  );
  progressGradient.addColorStop(0, "#dc2626"); // Top color
  progressGradient.addColorStop(
    (canvas.height * gradientRatio) / canvas.height,
    "#dc2626"
  ); // Top color
  progressGradient.addColorStop(
    (canvas.height * gradientRatio + 1) / canvas.height,
    "#ffffff"
  ); // White line
  progressGradient.addColorStop(
    (canvas.height * gradientRatio + 2) / canvas.height,
    "#ffffff"
  ); // White line
  progressGradient.addColorStop(
    (canvas.height * gradientRatio + 3) / canvas.height,
    "#F6B094"
  ); // Bottom color
  progressGradient.addColorStop(1, "#F6B094"); // Bottom color

  return { gradient, progressGradient };
};

const getVolumeIcon = (volume: number) => {
  if (volume >= 0.5) {
    return <Volume2Icon className="h-6 w-6" />;
  } else if (volume < 0.5 && volume > 0.05) {
    return <Volume1Icon className="h-6 w-6" />;
  }
  return <VolumeIcon className="h-6 w-6" />;
};

export default function WavesurferPlayer({
  title,
  onClose,
  ...props
}: {
  title: string;
  onClose: () => void;
  props: WaveSurferOptions;
}) {
  const containerRef = useRef();
  const hoverRef = useRef();
  const [volume, setVolume] = useState(1);
  const { gradient, progressGradient } = useMemo(() => makeGradient(), []);
  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    waveColor: gradient,
    progressColor: progressGradient,
    ...props,
  });

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  useEffect(() => {
    if (wavesurfer) {
      setVolume(wavesurfer.getVolume());
    }
  }, [wavesurfer]);
  useEffect(() => {
    if (isReady) {
      wavesurfer.on("interaction", () => {
        wavesurfer?.play();
      });
      containerRef.current.addEventListener(
        "pointermove",
        e => (hoverRef.current.style.width = `${e.offsetX}px`)
      );
    }
  }, [isReady]);

  return (
    <div className="grid grid-cols-[100px_1fr_100px] grid-rows-[30px_1fr] items-center justify-between gap-2 rounded-xl border border-foreground bg-background p-4">
      <Button
        className="col-start-1 row-start-1"
        variant="ghost"
        size="icon"
        onClick={() => {
          wavesurfer?.stop();
          onClose();
        }}
      >
        <XIcon className="h-7 w-6" />
      </Button>
      <Button
        className="col-start-1 row-start-2 "
        size="iconPlayer"
        variant="ghost"
        onClick={onPlayPause}
      >
        {isPlaying ? (
          <PauseCircleIcon className="h-12 w-12" strokeWidth="1" />
        ) : (
          <PlayCircleIcon className="h-12 w-12" strokeWidth="1" />
        )}
        <span className="sr-only">Play/Pause</span>
      </Button>

      <h2
        className={cn(
          "col-start-2 row-start-1 truncate text-sm text-muted-foreground transition-transform lg:text-lg",
          { "scale-95 text-center": isReady }
        )}
      >
        {title}
      </h2>
      <div
        ref={containerRef}
        className={cn(
          "group relative col-start-2 row-start-2 w-full max-w-7xl",
          {
            hidden: !isReady,
          }
        )}
      >
        <div
          ref={hoverRef}
          id="hover"
          className="absolute left-0 z-[1]  h-full bg-gradient-to-r from-foreground/5 to-foreground/15 opacity-0 transition-opacity  group-hover:opacity-100"
        ></div>
        <div className="absolute -top-5 left-0 z-[3] hidden h-full text-xs group-hover:block">
          {formatTime(currentTime)}
        </div>
        <div className="absolute -top-5 right-0 z-[3] hidden h-full text-xs group-hover:block">
          {formatTime(wavesurfer?.getDuration())}
        </div>
      </div>

      {!isReady && (
        <p className="col-start-2 row-start-2">
          {useTranslations(document.documentElement.lang || "en")(
            "player.loading"
          )}
        </p>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="col-start-3 row-start-2 ml-0 mr-auto"
            size="icon"
            variant="ghost"
          >
            {getVolumeIcon(volume)}
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="z-10 ">
          <div className="w-36 rounded-full bg-background py-4 pr-4">
            <Slider
              defaultValue={[wavesurfer?.getVolume() * 100]}
              max={100}
              step={1}
              onValueChange={value => {
                setVolume(value / 100);
                wavesurfer.setVolume(value / 100);
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
