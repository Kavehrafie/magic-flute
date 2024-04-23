import {Button} from "@/components/ui/button"
import { audioTitle, audioUrl, isPodcastPlay } from "@/store/podcast";

import * as React from "react";


interface PodcastTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  audio: { src: string; title: string };
  children: React.ReactNode;

}

export default function PodcastTrigger({
  audio,
  children,
  ...props
}: PodcastTriggerProps) {
  const { src, title } = audio;
  const Comp = "button";
  function handlePlay() {
    audioUrl.set(src);
    audioTitle.set(title);
    isPodcastPlay.set(true);
  }

  return (
    <Comp onClick={handlePlay} {...props}>
      {children}
    </Comp>
  );
}