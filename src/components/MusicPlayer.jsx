import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import "./css/MusicPlayer.css";

const canciones = [
  {
    titulo: "19-2000",
    artista: "Gorillaz",
    src: "https://res.cloudinary.com/drzks7xme/video/upload/v1754429200/Gorillaz_-_19-2000_Official_Video_cweuut.mp3", 
    cover:
      "https://cdn-images.dzcdn.net/images/cover/f4d581f4b86c869547704d7db9aa2c43/1900x1900-000000-80-0-0.jpg",
  },
  {
    titulo: "Clint Eastwood",
    artista: "Gorillaz",
    src: "https://res.cloudinary.com/drzks7xme/video/upload/v1754429200/Gorillaz_-_Clint_Eastwood_Official_Video_vyasjt.mp3", 
    cover: "https://i.pinimg.com/564x/b3/8a/e5/b38ae5b76da40110a01c70ef9875b16a.jpg",
  },
  {
    titulo: "Feel Good Inc.",
    artista: "Gorillaz",
    src: "https://res.cloudinary.com/drzks7xme/video/upload/v1754429201/Gorillaz_-_Feel_Good_Inc._Official_Video_w02114.mp3",
    cover: "https://i.scdn.co/image/ab67616d0000b27322c1b2b58a23408632527ab7",
  }

];

const MusicPlayer = () => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  const reproducir = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pausar = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    isPlaying ? pausar() : reproducir();
  };

  const siguiente = () => {
    setIndex((prev) => (prev + 1) % canciones.length);
  };

  const anterior = () => {
    setIndex((prev) => (prev - 1 + canciones.length) % canciones.length);
  };

  const handleTimeUpdate = () => {
    const dur = audioRef.current.duration;
    const current = audioRef.current.currentTime;
    setProgress((current / dur) * 100);
  };

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );

    if (isPlaying) {
      reproducir();
    }
  }, [index]);

  return (
    <div className="music-player" ref={containerRef}>
      <div className="cover">
        <img src={canciones[index].cover} alt="cover" />
      </div>

      <h2>{canciones[index].titulo}</h2>
      <p>{canciones[index].artista}</p>

      <audio
        ref={audioRef}
        src={canciones[index].src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={siguiente}
      />

      <div className="progress">
        <div className="bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="controls">
        <button onClick={anterior}>
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button onClick={togglePlay}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button onClick={siguiente}>
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
