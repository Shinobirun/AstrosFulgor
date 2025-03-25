import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage";
import RegisterPage from "./pages/registerPage";
import LoginForm from "./components/forms/loguinForm";
import Dashboard from "./pages/dasboardPage";
import TurnosPage from "./pages/turnosPage"; 
import UsuariosPage from "./pages/usuariosPage";
import TurnosDisponiblesPage from "./pages/turnosDisponiblesPage";
import PerfilPage from "./pages/perfilPage";

// Componente para proteger rutas que requieren autenticación
const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("token");

  // Si no hay token, redirige a la página de login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si hay token, muestra el componente protegido
  return element;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Rutas protegidas */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/turnos" element={<ProtectedRoute element={<TurnosPage />} />} />
        <Route path="/usuarios" element={<ProtectedRoute element={<UsuariosPage />} />} />
        <Route path="/turnos-disponibles/:nivel" element={<ProtectedRoute element={<TurnosDisponiblesPage />} />} />
        <Route path="/perfil" element={<ProtectedRoute element={<PerfilPage />} />} />
      </Routes>
    </Router>
  );
}

export default App;

