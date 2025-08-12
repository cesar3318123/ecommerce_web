//Importamos React y el hook useState
import React, { useEffect, useState } from "react";
import logo from "./logo.jpg"; // Importamos el logo de la carpeta public
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para redire
import favicon from "./Logo_invertido.png"; // Importamos el favicon de la carpeta public


//Creamos el componente llamado Home_IA
function Home_IA() {

    const [email, setEmail] = useState(""); // Estado para el email

    const [username, setUsername] = useState(""); // Estado para el nombre de usuario

    const [isOpen, setIsOpen] = useState(false); // Estado para el drawer (Sidebar)

    const toggleSidebar = () => setIsOpen(!isOpen); // Función para alternar el estado del drawer

    const closeSidebar = () => setIsOpen(false); // Función para cerrar el drawer

    const navigate = useNavigate(); // Hook para redirección

    const [prompt, setPrompt] = useState(""); // Estado para el prompt de búsqueda

    const [response, setResponse] = useState(""); // Estado para la respuesta generada

    const [ loading, setLoading] = useState(false); // Estado para el indicador de carga

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


    // Función asincrona para manejar la búsqueda
    const handleSearch = async () => {
        if (!prompt.trim()) return; // Si el prompt está vacío, no hacemos nada

        //Indicamos que estamos cargando (para mostrar "Cargando..." o desactivar el botón)

        setLoading(true);

        //Limpiamos cualquier respuesta previa
        setResponse("");


        try {
            //Realizamos una petición POST a la API de búsqueda
            const res = await fetch("https://ecommercebackend-production-8245.up.railway.app/api/searchIA", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, // Indicamos que el cuerpo de la petición es JSON
                body: JSON.stringify({ prompt }), // Convertimos el prompt a JSON
        });

        //Parseamos la respuesta JSON
        const data = await res.json();

        // Guardamos la respuesta de la IA en el estado, si no hay respuesta, mostramos un mensaje de error

        if (data.response) {
            setResponse(data.response);
        } else {
            setResponse("No se pudo generar una respuesta. Inténtalo de nuevo.");
        }







    } catch (error) {
            setResponse("Error al conectar con el servidor.");
            console.error("Error al buscar:", error);
        
        } finally {
            // Indicamos que hemos terminado de cargar
            setLoading(false);
        }
            
        
        
    }

    return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col overflow-x-hidden">
        {/* Encabezado */}
        <header className="w-full bg-black shadow-md">
            {/* Contenedor en línea */}
            <div className="flex items-center space-x-6 p-4">
                {/* Logo */}
                <img src={favicon} alt="Logo" className="w-16 h-auto" />
                {/* Título */}
                <h1 className="text-white text-3xl font-semibold">
                    Modelo IA 📦
                </h1>
            </div>
        </header>




        {/*Boton para abrir y cerrar el sidebar */}
        <button
            onClick ={toggleSidebar}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-500 transition">
            {isOpen ? "Cerrar ➤" : "Ménu ➤"}
        </button>


        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded shadow-md min-h-[150px]">
            <h2 className="text-xl font-semibold mb-4">Respuesta IA:</h2>
            <p className="whitespace-pre-wrap">{loading ? "Cargando..." : response}</p>
        </div>




            {/*Fondo semitrasparente del overlay */}
            {isOpen && (
                <div
                onClick={closeSidebar}               // Cierra sidebar al clicar fuera
                className="fixed inset-0 bg-black bg-opacity-40 z-40">

            </div>
            )}
        {/* Panel inferior tipo chat de IA (como el de ChatGPT) */}
        <div className="fixed bottom-4 left-4 right-4 bg-black text-white px-6 py-4 rounded-md shadow-lg z-50">
            <div className="flex justify-end items-center gap-4 flex-wrap">
            {/* Input y botón alineados a la derecha */}
            <input
             type="text"
             placeholder="Escribe tu consulta aquí"
             className="flex-grow max-w-md px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
             value={prompt}
             onChange={(e) => setPrompt(e.target.value)}
             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            
            <button 
             onClick={handleSearch}
             disabled={loading}
             style={{ backgroundColor: '#00a6ed' }} className="text-black px-4 py-2 rounded-md transition">
                ⬆️
            </button>
         </div>
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
                <p>Usuario: <strong>{username}</strong></p>
                <p>Cuenta: <strong>{email}</strong></p>
                <button
                onClick={() => navigate("/Profile")}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition mb-2">
                    Perfil 🪪
                </button>
                <button
                 onClick={() => navigate("/home")}
                 className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-400 transition mb-2">
                 Cambiar Modelo ★★
                </button>
                {/*Boton para ver instruccines de la prueba */}
                <button
                onClick={() => navigate("/instructions")}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition mb-2">
                Instrucciones de prueba 🔍
                </button>
                {/*Botón de formulario */}
                <button
                onClick={() => navigate("/survey")}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition mb-2">
                Formulario de prueba 📝
                </button>
                <button
                onClick ={toggleSidebar}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition mb-2">
                {isOpen ? "Cerrar ❌" : "Cerrar ❌"}
                </button>



                </div>
            


            
            </div>


    </div>

    )



}


//Exportamos el componente Home_IA
export default Home_IA;