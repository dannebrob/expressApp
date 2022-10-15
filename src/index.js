import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Axios from "axios";

import CreateNewForm from "./components/CreateNewForm";
import AnimalCard from "./components/AnimalCard";
function App() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    async function go() {
      const response = await Axios.get("/api/workouts");
      setAnimals(response.data);
    }
    go();
  }, []);

  return (
    <div className="container">
      <p>
        <a href="/">&laquo; Back to public homepage </a>
      </p>
      <CreateNewForm setAnimals={setAnimals} />
      <div className="animal-grid">
        {animals.map((animal) => {
          return (
            <AnimalCard
              key={animal.key}
              name={animal.name}
              spices={animal.length}
              photo={animal.photo}
              id={animal.id}
              setAnimals={setAnimals}
            />
          );
        })}
      </div>
    </div>
  );
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
