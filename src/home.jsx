//Importamos React y el hook useState
import React, { useEffect, useState } from "react";
import logo from "./logo.jpg"; // Importamos el logo de la carpeta public
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para redirección
import favicon from "./CIGR_20_2.png"; // Importamos el favicon de la carpeta public


//Declaramos el componente llamado Home
function Home() {
    const [query, setQuery] = useState(""); // Estado para la consulta de búsqueda

    const [products, setProducts] = useState([]); // Estado para almacenar los productos

    const [error, setError] = useState(''); // Estado para manejar errores

    const [email, setEmail] = useState(""); // Estado para el email

    const [username, setUsername] = useState(""); // Estado para el nombre de usuario

    const [isOpen, setIsOpen] = useState(false); // Estado para el drawer (Sidebar)

    const toggleSidebar = () => setIsOpen(!isOpen); // Función para alternar el estado del drawer

    const closeSidebar = () => setIsOpen(false); // Función para cerrar el drawer

    const navigate = useNavigate(); // Hook para redirección



    const handleSubmit = async (e) => {
        e.preventDefault(); //Evita que la pagina se recargue al enviar el formulario
        setError(''); //Resetea el estado de error antes de hacer la búsqueda
        setProducts([]); //Resetea el estados de los resultados de productos antes de hacer una nueva búsqueda


        try {
            //Realiza una petición GET a la API para buscar productos
            const response = await fetch(`https://ecommercebackend-production-8245.up.railway.app/api/searchTradictional?q=${encodeURIComponent(query)}`);
            //Verifica si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('Error al buscar productos');
            }

            const data = await response.json(); //Convierte la respuesta a JSON
            setProducts(data); //Actualiza el estado de los productos con los datos obtenidos
        } catch (error) {
            console.error('Error frontend: No se pudo buscar productos:', error);
            setError('Error frontend: No se pudo buscar productos'); //Actualiza el estado de error si ocurre un problema
        }
    }

 

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
        

        <div className="relative min-h-screen bg-gray-100 flex flex-col">
        {/*Encabezado*/}
        <header className = "w-full bg-[#c9c9c9] shadow-md">
            {/*Parte superior*/}
            <div className="flex items-center px-4 py-3">
            {/*Boton para abrir y cerrar el sidebar */}
            <button
                onClick ={toggleSidebar}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                {isOpen ? "Cerrar ➤" : "Ménu ➤"}
            </button>

            <div className="p-4">
                <img src={favicon} alt="Logo" className="w-32 h-auto" />
            </div>


            <h1 className="text-3xl font-semibold text-center">Modelo Tradicional 📦</h1>
            </div>
            {/*Parte inferior*/}
            <div className="p-4 flex justify-end items-center space-x-4">
            <form onSubmit = {handleSubmit}>
            {/* Input de búsqueda */}
            <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Actualiza el estado de la consulta al cambiar el input
            placeholder="Escribe tu consulta aquí"
            className="flex-grow max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* Botón Buscar */}
            <button 
            type = "submit" // Envía el formulario al hacer clic
            className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition">
                Buscar
            </button>

            </form>

            </div>
            
            </header>

            {/*Contenedor del error*/}
            {error && <p className = "text-red-500 text-center mt-4">{error}</p>}

            {/*Fondo semitrasparente del overlay */}
            {isOpen && (
                <div
                onClick={closeSidebar}               // Cierra sidebar al clicar fuera
                className="fixed inset-0 bg-black bg-opacity-40 z-40">

            </div>
            )}


            <ul className = "space-y-4">
                {products.map((product, index) => (
                    <li key={index} className = "border p-4 rounded shadow">
                        <h3 className = "font-bold text-lg">{product.nombre || 'Sin nombre' }</h3>
                        <p className = "text-gray-700">Marca: {product.marca || 'Sin marca' }</p>
                        {product.imagen && (
                            <img
                                src={product.imagen}
                                alt={product.nombre || 'Producto sin nombre'}
                                className="mt-2 w-32 h-auto"
                            />

                        )}
                    </li>
                ))}
            </ul>


  


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
                {/* Botón para cambiar la Interfaz*/}
                <button
                onClick={() => navigate("/home2")}
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

//Exportamos el componente Home
export default Home;