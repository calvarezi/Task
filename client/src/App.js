import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { TasksPage } from "./pages/TasksPage";
import { TasksFormPage } from "./pages/TasksFormPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks-create" element={<TasksFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
