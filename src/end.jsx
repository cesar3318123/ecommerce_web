//Importamos React y el hook useState
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "./Cara_feliz.png"; // Importamos el logo de la carpeta public

//Declaramos el componente llamado End
function End() {

   return (
   <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-[#c9c9c9] p-8 rounded-xl shadow-md w-full max-w-md">
        <p className="text-2xl font-semibold mb-6 text-center">
            Has concluido exitosamente las pruebas
        </p>
        
        {/* Imagen centrada */}
        <div className="flex justify-center p-4">
            <img src={image} alt="Logo" className="w-32 h-auto" />
        </div>
        
        <p className="text-lg mb-4 text-center">
            Gracias por participar, tu opinión es muy importante para nosotros.
        </p>
        
        
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-400 transition duration-200 mb-4">
            Aceptar
        </button>
    </div>
   </div>
);
}

//Exportamos el componente Information
export default End;