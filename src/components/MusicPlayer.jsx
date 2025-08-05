import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import "./css/MusicPlayer.css";

const canciones = [
  {
    titulo: "19-2000",
    artista: "Gorillaz",
    src: "https://res.cloudinary.com/drzks7xme/video/upload/v1754429200/Gorillaz_-_19-2000_Official_Video_cweuut.mp3",
    cover: "https://cdn-images.dzcdn.net/images/cover/f4d581f4b86c869547704d7db9aa2c43/1900x1900-000000-80-0-0.jpg",
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
  },
];

const MusicPlayer = () => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const initializedRef = useRef(false);

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

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (x / width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress((newTime / audioRef.current.duration) * 100);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const selectSong = (newIndex) => {
    setIndex(newIndex);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!initializedRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      );
      initializedRef.current = true;
    }

    audioRef.current.volume = volume;
    if (isPlaying) {
      reproducir();
    }
  }, [index, volume]);

  return (
    <div className="music-player" ref={containerRef}>
      {showPlaylist ? (
        <div className="playlist">
          {canciones.map((cancion, i) => (
            <div
              key={i}
              className={`playlist-item ${i === index ? "selected" : ""}`}
              onClick={() => selectSong(i)}
            >
              <p>
                {cancion.titulo} - {cancion.artista}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="cover">
          <img src={canciones[index].cover} alt="cover" />
        </div>
      )}

      <h2>{canciones[index].titulo}</h2>
      <p>{canciones[index].artista}</p>

      <audio
        ref={audioRef}
        src={canciones[index].src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={siguiente}
      />

      <div className="progress" ref={progressRef} onClick={handleProgressClick}>
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

      <div className="secondary-controls">
        <div className="volume-control">
          <FontAwesomeIcon icon={faVolumeUp} className="volume-icon" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
        <button
          className="playlist-toggle"
          onClick={() => setShowPlaylist(!showPlaylist)}
        >
          {showPlaylist ? "Cover" : "Playlist"}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;