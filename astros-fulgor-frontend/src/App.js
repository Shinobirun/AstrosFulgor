import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import AdminPage from './components/pages/AdminPage';
import HomePage from './pages/homePage';
import RegisterPage from "./pages/registerPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
