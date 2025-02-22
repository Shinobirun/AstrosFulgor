import React, { useEffect, useState } from "react";
import axios from "axios";

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Lista de Usuarios</h2>
      <div className="max-w-4xl mx-auto bg-white p-4 shadow-md rounded-lg">
        {usuarios.length > 0 ? (
          <ul>
            {usuarios.map((user) => (
              <li key={user._id} className="border-b p-2">
                <span className="font-semibold">{user.firstName} {user.lastName}</span> - {user.email} - {user.role}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No hay usuarios registrados.</p>
        )}
      </div>
    </div>
  );
};

export default UsuariosPage;
