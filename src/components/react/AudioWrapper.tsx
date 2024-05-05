import AudioPlayer from "@components/react/AudioPlayer.tsx";
import { useStore } from "@nanostores/react";
import { audioTitle, audioUrl, isPodcastPlay } from "@/store/podcast.ts";
import { Button } from "@components/ui/button";
import { XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WavesurferPlayer from "./WavesurferPlayer";

export default function PodcastTrigger() {
  const $audioUrl = useStore(audioUrl);
  const $audioTitle = useStore(audioTitle);
  const $isPodcastPlay = useStore(isPodcastPlay);

  return (
    <AnimatePresence>
      {$audioUrl?.length > 0 && $isPodcastPlay && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          {/* <AudioPlayer url={$audioUrl}>
          <h3 className="mx-auto w-full text-center font-bold">
            {$audioTitle}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              isPodcastPlay.set(false);
            }}
          >
            <XIcon className="h-7 w-6" />
          </Button>
        </AudioPlayer> */}
          <WavesurferPlayer
            url={$audioUrl}
            height={50}
            barWidth={2}
            barGap={1}
            barRadius={2}
            title={$audioTitle}
            onClose={() => {
              isPodcastPlay.set(false);
            }}
          ></WavesurferPlayer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
