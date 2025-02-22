import React, { useEffect, useState } from "react";
import axios from "axios";

const TurnosPage = () => {
  const [turnos, setTurnos] = useState([]);
  const [groupedTurnos, setGroupedTurnos] = useState({});
  const [selectedTurnos, setSelectedTurnos] = useState([]); // Estado para los turnos seleccionados

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/turnos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTurnos(response.data);
        groupTurnosByDay(response.data);  // Agrupar los turnos por día
      } catch (error) {
        console.error("Error al obtener los turnos:", error);
      }
    };

    fetchTurnos();
  }, []);

  // Función para agrupar turnos por días de la semana
  const groupTurnosByDay = (turnos) => {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let grouped = {};

    days.forEach((day) => {
      // Agrupar los turnos por día y ordenarlos por hora
      grouped[day] = turnos
        .filter((turno) => turno.dia === day)
        .sort((a, b) => {
          // Convertir las horas a números (en minutos) para comparar
          const convertToMinutes = (time) => {
            const [hours, minutes] = time.split(":").map(Number);
            return hours * 60 + minutes;
          };

          const aTime = convertToMinutes(a.hora);
          const bTime = convertToMinutes(b.hora);

          return aTime - bTime; // Comparar por el tiempo en minutos
        });
    });

    setGroupedTurnos(grouped);
  };

  // Función para seleccionar/deseleccionar un turno
  const toggleSelectTurno = (turnoId) => {
    setSelectedTurnos((prevSelected) => {
      if (prevSelected.includes(turnoId)) {
        return prevSelected.filter((id) => id !== turnoId); // Deseleccionar
      } else {
        return [...prevSelected, turnoId]; // Seleccionar
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Calendario de Turnos</h2>
      <div className="overflow-x-auto max-w-full">
        <table className="min-w-full bg-white p-4 shadow-md rounded-lg">
          <thead>
            <tr className="border-b">
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((day) => (
                <th key={day} className="text-center py-2 px-4 font-semibold">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((day) => (
                <td key={day} className="py-2 px-4 border-b">
                  {groupedTurnos[day] && groupedTurnos[day].length > 0 ? (
                    <ul>
                      {groupedTurnos[day].map((turno) => (
                        <li
                          key={turno._id}
                          className={`mb-2 p-4 border rounded-lg cursor-pointer ${
                            selectedTurnos.includes(turno._id)
                              ? "bg-blue-200 border-blue-500"
                              : "bg-white border-gray-300"
                          }`}
                          onClick={() => toggleSelectTurno(turno._id)}
                        >
                          <span className="font-semibold">{turno.nivel}</span> - {turno.dia} a las {turno.hora} 
                          - <span className="italic text-blue-600">{turno.sede}</span>
                          <div className="text-sm text-gray-600">
                            Cupos disponibles: {turno.cuposDisponibles}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No hay turnos</p>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TurnosPage;
