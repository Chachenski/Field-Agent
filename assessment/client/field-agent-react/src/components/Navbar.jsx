import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div class="font-007 text-2xl w-full h-full max-w-[1240px] mx-auto px-4 flex justify-between items-center">
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/contact"}>Contact</Link>
      <Link to={"/agents"}>Agents</Link>
      <Link to={"/agents/add"}>Add Agents</Link>
      {/* <Link to={"/agents/edit/:id"}>Edit Agents</Link> */}
      {/* <Link to={"/agents/delete/:id"}>Delete Agents</Link> */}
    </div>
  );
}

export default Navbar