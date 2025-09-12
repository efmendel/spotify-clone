import { usePlayerStore } from '@/stores/usePlayerStore';
import React, { useEffect, useRef } from 'react'

// holds logic for three useeffects that handle play/pause functionality, song ending functionality, and song changing funcitonality
const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const prevSongRef = useRef<string | null>(null);

  const {currentSong, isPlaying, playNext} = usePlayerStore();

  // playing and pausing logic whenever isPlaying changes
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause()
  }, [isPlaying])

  // logic for when song ends
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      playNext()
    }

    audio?.addEventListener("ended", handleEnded)

    return () => audio?.removeEventListener("ended", handleEnded)
  }, [playNext])

  // logic for handling song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    const audio = audioRef.current;

    // first need to check if this current song is a new song
    const isSongChange = prevSongRef.current !== currentSong?.audioURL;
    if (isSongChange) {
      audio.src = currentSong?.audioURL;

      // resetting the time
      audio.currentTime = 0;

      prevSongRef.current = currentSong?.audioURL;
      if (isPlaying) audio.play()
    }
  }, [currentSong, isPlaying])

  return <audio ref={audioRef} />
}

export default AudioPlayer