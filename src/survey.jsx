//Importamos React y el hook useState
import React, { useState } from "react";


//Declaramos el componente llamado Survey
function Survey() {
    return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">

    {/* Botón de regresar en la esquina superior izquierda */}
      <div className="fixed top-4 left-4 z-50">
        <button 
          onClick={() => window.history.back()}
          className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition"
        >
          Regresar
        </button>
      </div>
        <div className="bg-[#c9c9c9] p-8 rounded-xl shadow-md w-full max-w-md">
            <p className="text-3xl font-semibold mb-6 text-center">Encuesta de satisfacción</p>
        {/* Pregunta 1 */}
        <div className="mb-4">
            <label className="block font-medium mb-2">¿Encontraste lo que querías?</label>
            <div className="flex gap-4">
                <label><input type="radio" name="pregunta1" value="sí" /> Sí</label>
                <label><input type="radio" name="pregunta1" value="no" /> No</label>
            </div>
        </div>

        {/* Pregunta 2 */}
        <div className="mb-4">
             <label className="block font-medium mb-2">¿Te llegaste a frustrar por algún motivo?</label>
             <div className="flex gap-4">
                 <label><input type="radio" name="pregunta2" value="sí" /> Sí</label>
                 <label><input type="radio" name="pregunta2" value="no" /> No</label>
             </div>
        </div>

        {/* Pregunta 3 */}
        <div className="mb-4">
             <label className="block font-medium mb-2">¿La interfaz implementada te pareció perfecta?</label>
             <div className="flex gap-4">
                 <label><input type="radio" name="pregunta3" value="sí" /> Sí</label>
                 <label><input type="radio" name="pregunta3" value="no" /> No</label>
             </div>
       </div>

        {/* Pregunta 4 */}
        <div className="mb-4">
             <label className="block font-medium mb-2">
               ¿El rendimiento de la plataforma (tiempo de espera en la búsqueda, tiempo para pasar a la siguiente pantalla y tiempo para iniciar sesión) te pareció perfecto?
             </label>
             <div className="flex gap-4">
                 <label><input type="radio" name="pregunta4" value="sí" /> Sí</label>
                 <label><input type="radio" name="pregunta4" value="no" /> No</label>
             </div>
        </div>

        {/* Pregunta 5 - libre */}
        <div className="mb-6">
            <label className="block font-medium mb-2">
               Puedes mencionar desventajas que hayas observado al usar este sistema de búsqueda:
            </label>
            <textarea
               name="comentarios"
               placeholder="Escribe tu respuesta aquí..."
               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
               rows="4"
            ></textarea>
        </div>

        {/* Botón de envío */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-400 transition duration-200">
          Enviar encuesta
        </button>
    </div>
  </div>
);

}

//Exportamos el componente Survey
export default Survey;