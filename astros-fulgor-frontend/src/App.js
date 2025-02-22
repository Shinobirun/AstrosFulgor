import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import RegisterPage from "./pages/registerPage";
import LoginForm from "./components/forms/loguinForm";
import Dashboard from "./pages/dasboardPage";
import TurnosPage from "./pages/turnosPage"; // Nueva página para ver todos los turnos
import UsuariosPage from "./pages/usuariosPage"; // Nueva página para ver usuarios
import TurnosDisponiblesPage from "./pages/turnosDisponiblesPage"; // Nueva página para turnos por nivel
import PerfilPage from "./pages/perfilPage"; // Nueva página para perfil de usuario

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/turnos" element={<TurnosPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/turnos-disponibles/:nivel" element={<TurnosDisponiblesPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
      </Routes>
    </Router>
  );
}

export default App;
