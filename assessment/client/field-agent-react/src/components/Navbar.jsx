import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <Link to={"/"}>Home</Link>
      <Link to={"/agents"}>Agents</Link>
      <Link to={"/agents/add"}>Add Agents</Link>  
      <Link to={"/agents/edit/:id"}>Edit Agents</Link>
      {/* <Link to={"/agents/delete/:id"}>Home</Link> */}
    </div>
  );
}

export default Navbar