//Importamos el React y el hook useState
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./logo.jpg"; // Importamos el logo de la carpeta public

//Creamos el componente llamado Profile
function Profile() {



  const [email, setEmail] = useState(""); // Estado para el email
  
  const [username, setUsername] = useState(""); // Estado para el nombre de usuario

  const navigate = useNavigate(); 


      useEffect(() => {
              // Verifica si el usuario está autenticado
              const userEmail = localStorage.getItem("userEmail");
              const userName = localStorage.getItem("username");
              if (!userEmail) {
                  setEmail("Invitado"); // Si no hay email en localStorage, muestra "Invitado"
                  setUsername("Invitado"); // También establece el nombre de usuario como "Invitado"
              } else {
                  setEmail(userEmail); // Si hay email, lo establece en el estado
                  setUsername(userName); // También establece el nombre de usuario en el estado
              }
      
          }, [navigate]);




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
          Nombre: <strong>{username}</strong>
        </label>

        {/* Cuenta */}
        <label className="block mb-2 font-medium" htmlFor="email">
          Cuenta (Email): <strong>{email}</strong>
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