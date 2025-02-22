import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TurnosDisponiblesPage = () => {
  const { nivel } = useParams();
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/turnos`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filtrar los turnos basados en el nivel
        let filteredTurnos = [];
        if (nivel === "Principiante") {
          filteredTurnos = response.data.filter((turno) => turno.nivel === "Principiantes");
        } else if (nivel === "Intermedio") {
          filteredTurnos = response.data.filter(
            (turno) => turno.nivel === "Principiantes" || turno.nivel === "Intermedios"
          );
        } else if (nivel === "Avanzado") {
          filteredTurnos = response.data.filter(
            (turno) => turno.nivel === "Intermedios" || turno.nivel === "Avanzados"
          );
        }

        setTurnos(filteredTurnos);
      } catch (error) {
        console.error("Error al obtener los turnos disponibles:", error);
      }
    };

    fetchTurnos();
  }, [nivel]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Turnos Disponibles ({nivel})</h2>
      <div className="max-w-4xl mx-auto bg-white p-4 shadow-md rounded-lg">
        {turnos.length > 0 ? (
          <ul>
            {turnos.map((turno) => (
              <li key={turno._id} className="border-b p-2">
                <span className="font-semibold">{turno.nivel}</span> - {turno.dia} a las {turno.hora} - <span className="italic">{turno.sede}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No hay turnos disponibles para este nivel.</p>
        )}
      </div>
    </div>
  );
};

export default TurnosDisponiblesPage;
