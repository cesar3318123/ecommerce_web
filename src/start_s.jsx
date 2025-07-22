//Importamos React y el hook useState
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//Declaramos el componente llamado start_s
function Start_s() {

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-green-600 p-8 rounded-xl shadow-md w-full max-w-md">
                <p className="text-3xl font-semibold mb-6 text-center">Proceso de compra parte 1 completado</p>
                <p className="text-9xl font-semibold mb-6 text-center">✓</p>

                <button
                className="w-full bg-zinc-800 text-white py-2 rounded-md hover:bg-zinc-500 transition duration-200 mb-4">
                    Realizar encuesta
                </button>
            </div>

        </div>
    )
}

//Exportamos el componente Information
export default Start_s;