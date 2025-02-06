import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import RegisterPage from "./pages/registerPage";
import LoginForm from "./components/forms/loguinForm"; // Importamos la página de login
import Dashboard from "./pages/dasboardPage"; // Importamos la página de dashboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
