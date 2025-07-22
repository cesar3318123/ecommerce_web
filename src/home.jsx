//Importamos React y el hook useState
import React, { useState } from "react";
import logo from "./logo.jpg"; // Importamos el logo de la carpeta public
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para redirección
import favicon from "./CIGR_20_2.png"; // Importamos el favicon de la carpeta public

//Declaramos el componente llamado Home
function Home() {
    const [isOpen, setIsOpen] = useState(false); // Estado para el drawer (Sidebar)

    const toggleSidebar = () => setIsOpen(!isOpen); // Función para alternar el estado del drawer

    const closeSidebar = () => setIsOpen(false); // Función para cerrar el drawer

    const navigate = useNavigate(); // Hook para redirección
    return (
        

        <div className="relative min-h-screen bg-gray-100 flex flex-col">
        {/*Encabezado*/}
        <header className = "w-full bg-[#c9c9c9] shadow-md">
            {/*Parte superior*/}
            <div className="flex  items-center px-4 py-3">
            {/*Boton para abrir y cerrar el sidebar */}
            <button
                onClick ={toggleSidebar}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                {isOpen ? "Cerrar ➤" : "Ménu ➤"}
            </button>

            <div className="p-4">
                <img src={favicon} alt="Logo" className="w-32 h-auto" />
            </div>


            <h1 className="text-5xl font-semibold text-center">Modelo de sistema de busqueda 📦</h1>
            </div>
            {/*Parte inferior*/}
            <div className="p-4 flex items-center space-x-4">
            {/* Input de búsqueda */}
            <input
            type="text"
            placeholder="Escribe tu consulta aquí"
            className="flex-grow max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* Botón Buscar */}
            <button className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition">
                Buscar
            </button>
            {/* Botón Cambiar Modelo */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition">
                Cambiar Modelo
            </button>
            {/* Botón para cambiar la Interfaz*/}
            <button
                onClick={() => navigate("/home2")}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-400 transition">
                ★★
            </button>
            </div>
            
            </header>

            {/*Fondo semitrasparente del overlay */}
            {isOpen && (
                <div
                onClick={closeSidebar}               // Cierra sidebar al clicar fuera
                className="fixed inset-0 bg-black bg-opacity-40 z-40">

            </div>
            )}
            {/*Drawer (Sidebar) */}
            <div
             className={`
                fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                z-50
                `}
            >
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Menú</h2>
                <div className="p-4">
                    <img src={logo} alt="Logo" className="w-32 h-auto" />
                </div>
                <p>Usuario:</p>
                <p>Cuenta:</p>
                <button
                onClick={() => navigate("/Profile")}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition mb-2">
                    Perfil
                </button>
                <button
                onClick ={toggleSidebar}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition mb-2">
                {isOpen ? "Cerrar" : "Cerrar"}
                </button>

                </div>
            </div>
        </div>
    )
}

//Exportamos el componente Home
export default Home;