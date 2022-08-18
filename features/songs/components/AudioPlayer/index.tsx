import React, { useState, useEffect, useRef } from "react";
import { Skeleton, Card, Alert, Slider, Button } from "antd";
import styles from "@app/styles/AudioPlayer.module.css";

interface AudioPlayerProps {
  playSong?: any;
  trackId?: any;
  currentSongUrl?: any;
  songUrl?: any;
}

const AudioPlayer: React.FC<AudioPlayerProps> = props => {
  const audioPlayerRef: any = useRef(null);

  useEffect(() => {
    if (props.songUrl != "") {
      if (props.songUrl != props.currentSongUrl) {
        if (audioPlayerRef.current) {
          audioPlayerRef.current.pause();
          audioPlayerRef.current.currentTime = 0;
        }
      }
    }
  }, [props.currentSongUrl, props.songUrl]);

  const playSong = () => {
    props.playSong(props.songUrl);
  };

  return (
    <div className={styles.AudioPlayerContainer}>
      <audio
        src={props.songUrl}
        onPlay={playSong}
        controls
        ref={audioPlayerRef}
        data-testid={props.trackId}
      />
    </div>
  );
};

export default AudioPlayer;
