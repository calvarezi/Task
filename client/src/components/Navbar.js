import React from 'react';
import { Link } from 'react-router-dom'; // Si estás utilizando React Router

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/tareas">Tareas</Link>
        </li>
        <li>
          <Link to="/usuarios">Usuarios</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;