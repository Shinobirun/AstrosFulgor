import React, { useEffect, useState } from "react";
import axios from "axios";

const TurnosPage = () => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/turnos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTurnos(response.data);
      } catch (error) {
        console.error("Error al obtener los turnos:", error);
      }
    };

    fetchTurnos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Lista de Turnos</h2>
      <div className="max-w-4xl mx-auto bg-white p-4 shadow-md rounded-lg">
        {turnos.length > 0 ? (
          <ul>
            {turnos.map((turno) => (
              <li key={turno._id} className="border-b p-2">
                <span className="font-semibold">{turno.nivel}</span> - {turno.dia} a las {turno.hora} 
                - <span className="italic text-blue-600">{turno.sede}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No hay turnos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default TurnosPage;
