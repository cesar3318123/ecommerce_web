//Importamos React y el hook useState
import React, { useState } from "react";
import logo from "./logo.jpg"; // Importamos el logo de la carpeta public
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para redirección


//Creamos el componente llamado purchase_screen
function Purchase_screen() {

    const [isOpen, setIsOpen] = useState(false); // Estado para el drawer (Sidebar)

    const toggleSidebar = () => setIsOpen(!isOpen); // Función para alternar el estado del drawer

    const closeSidebar = () => setIsOpen(false); // Función para cerrar el drawer

    const navigate = useNavigate(); // Hook para redirección

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            {/*Boton para regresar a la pantalla anterior*/}
            <div className="absolute top-4 left-4">
                <button 
                    onClick={() => window.history.back()}
                    className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition"
                >
                    Regresar
            </button>
    
            </div>
            {/*Boton para abrir y cerrar el sidebar */}
            <button
                onClick ={toggleSidebar}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                {isOpen ? "Cerrar ➤" : "Ménu ➤"}
            </button>


            {/*Cuadro gris centrado*/}
            <div className="bg-[#c9c9c9] p-8 rounded-xl shadow-md w-full max-w-md">
                {/*Título*/}
                <h2 className="text-5xl font-semibold mb-6 text-center">Información del producto</h2>
                {/*Botón para realizar la compra*/}
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-400 transition duration-200 mb-4">
                    Comprar
                </button>                
            </div>


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
    );
}

//Exportamos el componente purchase_screen
export default Purchase_screen;