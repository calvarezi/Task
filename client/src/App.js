import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from './config';
import './App.css'; // Importar el archivo app.css

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}tasks/`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="task-list"> {/* Agregar la clase "task-list" al contenedor principal */}
      <h1>Lista de Tareas</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <p>{task.done ? 'Completada' : 'Pendiente'}</p>
            <p>Fecha de Creación: {task.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
