import React, { useEffect, useState } from "react";
import axios from "axios";

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [turnos, setTurnos] = useState([]);

  // Obtener lista de usuarios al cargar la página
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No hay token disponible.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/users/usuarios", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error.response?.data || error.message);
      }
    };

    fetchUsuarios();
  }, []);

  // Obtener los turnos del usuario seleccionado
  useEffect(() => {
    const fetchTurnos = async () => {
      if (!selectedUser) return; // No buscar si no hay usuario seleccionado

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No hay token disponible.");
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/users/usuario/${selectedUser._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTurnos(response.data); // Suponiendo que el backend devuelve los turnos en response.data
      } catch (error) {
        console.error("Error al obtener los turnos:", error.response?.data || error.message);
      }
    };

    fetchTurnos();
  }, [selectedUser]); // Se ejecuta cuando cambia el usuario seleccionado

  // Función para liberar un turno
  const liberarTurno = async (turnoId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No hay token disponible.");
        return;
      }

      // Llamamos a la ruta de turnos para liberar el turno
      const response = await axios.delete(`http://localhost:5000/api/turnos/${turnoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Actualizamos los turnos después de liberar el turno
      setTurnos((prevTurnos) => prevTurnos.filter((turno) => turno._id !== turnoId));
      console.log("Turno liberado correctamente:", response.data);
    } catch (error) {
      console.error("Error al liberar el turno:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Lista de Usuarios</h2>
      <div className="max-w-4xl mx-auto bg-white p-4 shadow-md rounded-lg">
        {usuarios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {usuarios.map((user) => (
              <div
                key={user._id}
                className={`cursor-pointer p-3 rounded-md border shadow-sm ${
                  selectedUser?._id === user._id ? "bg-blue-200 border-blue-500" : "bg-gray-50"
                }`}
                onClick={() => setSelectedUser(user)} // Seleccionamos el usuario
              >
                <span className="font-semibold">
                  {user.firstName} {user.lastName}
                </span>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm font-medium text-gray-800">Nivel: {user.role}</p>
                <p className="text-sm font-bold text-green-700">Créditos: {user.creditos ?? 0}</p>
                <p className="text-sm text-gray-600">
                  Actualizado el: {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "No disponible"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No hay usuarios registrados.</p>
        )}
      </div>

      {/* Mostrar los turnos del usuario seleccionado */}
      {selectedUser && (
        <div className="mt-6 max-w-4xl mx-auto bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">Turnos Asignados</h3>

          {turnos.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {turnos
                .filter((turno) => turno.activo) // Solo mostrar turnos activos
                .map((turno, index) => (
                  <li key={index} className="p-3 rounded-md border bg-gray-50 shadow-sm">
                    <p className="font-semibold">
                      {turno.sede} - {turno.nivel}
                    </p>
                    <p className="text-sm text-gray-600">Día: {turno.dia}</p>
                    <p className="text-sm text-gray-600">Hora: {turno.hora}</p>
                    <p className="text-sm text-gray-600">Cupos Disponibles: {turno.cuposDisponibles}</p>

                    {/* Botón para liberar turno */}
                    <button
                      className="mt-2 text-red-600"
                      onClick={() => liberarTurno(turno._id)} // Liberamos el turno
                    >
                      Liberar Turno
                    </button>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No hay turnos activos asignados.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UsuariosPage;
