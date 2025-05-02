import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./../pages/Profile";
import Menu from "./../pages/Menu";
import Ejemplo1 from "../exercises/typescript/Ejemplo1";
import Ejemplo1trusthyfalsy from "../exercises/typescript/Ejemplo1TruthyFalsy";
import Ejemplo2trusthyfalsy from "../exercises/typescript/Ejemplo2TruthyFalsy";
import Ejemplo3trusthyfalsy from "../exercises/typescript/Ejemplo3TruthyFalsy";
import Reporte1 from "../reports/AppPDF";
import Reporte2 from "../reports/AppPDF2";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ejemplo1" element={<Ejemplo1 />} />
        <Route
          path="/ejemplo1trusthyfalsy"
          element={<Ejemplo1trusthyfalsy />}
        />
        <Route
          path="/ejemplo2trusthyfalsy"
          element={<Ejemplo2trusthyfalsy />}
        />
        <Route
          path="/ejemplo3trusthyfalsy"
          element={<Ejemplo3trusthyfalsy />}
        />
        <Route path="/reporte1" element={<Reporte1 />} />
        <Route path="/reporte2" element={<Reporte2 />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
