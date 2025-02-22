import React, { useEffect, useState } from "react";
import axios from "axios";

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [turnos, setTurnos] = useState([]);  // Estado para los turnos

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  useEffect(() => {
    const fetchTurnos = async () => {
      if (selectedUser) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:5000/api/turnos/usuario", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTurnos(response.data);
        } catch (error) {
          console.error("Error al obtener los turnos del usuario:", error);
        }
      }
    };

    fetchTurnos();
  }, [selectedUser]);  // Solo se ejecuta cuando el selectedUser cambia

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Lista de Usuarios
      </h2>
      <div className="max-w-4xl mx-auto bg-white p-4 shadow-md rounded-lg">
        {usuarios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {usuarios.map((user) => (
              <div
                key={user._id}
                className={`cursor-pointer p-3 rounded-md border shadow-sm ${
                  selectedUser === user._id ? "bg-blue-200 border-blue-500" : "bg-gray-50"
                }`}
                onClick={() => setSelectedUser(user._id)}
              >
                <span className="font-semibold">
                  {user.firstName} {user.lastName}
                </span>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm font-medium text-gray-800">Nivel: {user.role}</p>
                <p className="text-sm font-bold text-green-700">Créditos: {user.creditos ?? 0}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No hay usuarios registrados.</p>
        )}
      </div>

      {/* Mostrar los turnos del usuario seleccionado */}
      {selectedUser && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Turnos Asignados</h3>
          {turnos.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {turnos.map((turno) => (
                <li key={turno._id} className="p-3 rounded-md border bg-gray-50 shadow-sm">
                  <p className="font-semibold">{turno.nombre}</p>
                  <p className="text-sm text-gray-600">Fecha: {turno.fecha}</p>
                  <p className="text-sm text-gray-600">Cupos Disponibles: {turno.cuposDisponibles}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">El usuario no tiene turnos asignados.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UsuariosPage;
