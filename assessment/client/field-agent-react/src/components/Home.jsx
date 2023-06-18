import React from 'react'
import Hero from './Hero';
import Logo from "../assets/007Logo.png"

const Home = () => {
  return (
    <div className="font-007 text-2xl">
      <header>
        <div className="flex flex-row items-center align-center justify-center space-x-4">
          <img src={Logo} alt="007Logo" className="h-16 mb-1" />
          <h1 className="text-black text-5xl font-bold bg-cover bg-center">
            Welcome Agent
          </h1>
        </div>
      </header>
      <Hero />
      <h1 className="absolute bottom-0 left-0 w-full text-center text-black text-5xl font-bold px-4 py-6">
        Your Next Mission Awaits You
      </h1>
    </div>
  );
}

export default Home;