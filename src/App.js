import React from "react";
import  {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./reg"; //Para la pagina de registro
import Login from "./log"; //Para la pagina de inicio de sesion
import Home from "./home"; //Para la pagina de inicio
import Profile from "./profile"; //Para la pagina de perfil
import Purchasescreen from "./purchase";
import Home2 from "./home2"; //Para la pagina de inicio IA modo interfaz
import Information from "./information"; //Para la pagina de informacion
import Instruction from "./instructions"; //Para la pagina de instrucciones
import End from "./end"; //Para la pagina de fin de prueba
import Survey from "./survey"; //Para la pagina de encuesta

function App() {
  return (
    //Rutas de las paginas
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} /> 
        <Route path="/reg" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/purchase" element={<Purchasescreen />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/information" element={<Information />} /> 
        <Route path="/instructions" element={<Instruction />} />
        <Route path="/end" element={<End />} />
        <Route path="/survey" element={<Survey />} /> 
      </Routes>
    </Router>
  );
}

export default App;

