//Importamos React y el hook useState
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//Declaramos el componente llamado Instruction
function Instruction() {

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-[#c9c9c9] p-8 rounded-xl shadow-md w-full max-w-md">
                <p className="text-3xl font-semibold mb-6 text-center">Instrucciones de la prueba</p>
                <button
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-400 transition duration-200 mb-4">
                    Iniciar prueba
                </button>
            </div>

        </div>
    )
}

//Exportamos el componente Information
export default Instruction;