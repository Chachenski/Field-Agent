import React from 'react'
import Hero from './Hero';

const Home = () => {
  return (
    <div>
      <header>
        <div>
          <h1 className="w-full h-[90%] flex-col justify-center items-center text-center text-black text-3xl px-4 py-8">
            Welcome Agent
          </h1>
          <Hero />
          <h1 className="absolute bottom-0 left-0 w-full text-center text-black text-3xl px-4 py-8">
            Your Next Mission Awaits You
          </h1>
        </div>
      </header>
    </div>
  );
}

export default Home;