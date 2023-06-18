import React from 'react'
import jamesBondTrailer from "../assets/007.mp4"

const Hero = () => {
  return (
    <div font-007>
      <div className="video">
        <video
          className="object-cover h-4/6 w-full absolute"
          src={jamesBondTrailer}
          autoPlay
          loop
          // muted
        />
      </div>
    </div>
  );
}

export default Hero