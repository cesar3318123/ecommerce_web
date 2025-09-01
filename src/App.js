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
import Infor_products from "./infor_products"; //Para la pagina de fin de prueba
import Survey from "./survey"; //Para la pagina de encuesta
import Prueba4 from "./prueba4"; //Para la pagina de prueba 4

function App() {
  return (
    //Rutas de las paginas
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} /> 
        <Route path="/reg" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/model_analysis" element={<Purchasescreen />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/prueba3" element={<Information />} /> 
        <Route path="/prueba1" element={<Instruction />} />
        <Route path="/infor_products" element={<Infor_products />} />
        <Route path="/prueba2" element={<Survey />} />
        <Route path="/prueba4" element={<Prueba4 />} />
      </Routes>
    </Router>
  );
}

export default App;

