//Importamos el React y el hook useState
import React, { useState } from "react";
import Logo from "./logo.jpg"; // Importamos el logo de la carpeta public

//Creamos el componente llamado Profile
function Profile() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gray-100">
      
      {/* Botón de regresar en la esquina superior izquierda */}
      <div className="absolute top-4 left-4">
        <button 
          onClick={() => window.history.back()}
          className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition"
        >
          Regresar
        </button>
      </div>

      {/* Cuadro gris centrado */}
      <div className="bg-[#c9c9c9] p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-5xl font-semibold mb-6 text-center">Perfil</h2>

        {/* Imagen */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-32 h-32 rounded-full" />
        </div>

        {/* Nombre */}
        <label className="block mb-2 font-medium" htmlFor="nombre">
          Nombre:
        </label>

        {/* Cuenta */}
        <label className="block mb-2 font-medium" htmlFor="email">
          Cuenta (Email):
        </label>

        {/* Botón cerrar sesión */}
        <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-400 transition duration-200">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}


export default Profile;