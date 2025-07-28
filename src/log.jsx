// Importamos React y el hook useState
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importamos Link para navegación
import { useNavigate } from "react-router-dom";

//Declaramos el componente llamado Log
function Login() {
    const navigate = useNavigate(); // Hook para redirección
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
// Función que se ejecuta cada vez que se cambia un input
    const handleChange = (e) => {
        setForm({
            ...form,  // copiamos el estado actual
            [e.target.name]: e.target.value,  // actualizamos el campo modificado
        });
    };

// Función que se ejecuta al enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();  // evita que la página se recargue

        try {
            const res = await fetch(`https://ecommercebackend-production-8245.up.railway.app/api/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },  // Indicamos que el cuerpo de la petición es JSON
                body: JSON.stringify(form),  // Convertimos el formulario a JSON
            });


            const data = await res.json();  // Parseamos la respuesta JSON

            if (res.ok) {
                alert(`Bienvenido, ${data.username}`);  // Si la respuesta es exitosa, mostramos un mensaje de bienvenida
                navigate("/home");  // Redirige a la página de inicio
            } else {
                alert(`Error: ${data.message}`);  // Si hay un error, mostramos el mensaje de error
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);  // Si ocurre un error, lo mostramos en la consola
            alert("Error al iniciar sesión. Por favor, inténtalo de nuevo.");  // Mostramos un mensaje de error al usuario
        }

    };

// Lo que retorna el componente (JSX = JavaScript + HTML)
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        {/* Contenedor del formulario con estilos de Tailwind */}
        <form
        onSubmit={handleSubmit}
        className="bg-[#c9c9c9] p-8 rounded-xl shadow-md w-full max-w-md"
        >
            {/* Título */}
            <h2 className="text-5xl font-semibold mb-6 text-center">Iniciar sesión</h2>

            {/* Input: Email */}
            <label className="block mb-2 font-medium" htmlFor="email">
                Cuenta
            </label>
            <input
                id="email"
                name="email"
                type="email"
                value={form.email}  // Valor del estado
                onChange={handleChange}  // Actualiza el estado al escribir
                required
                placeholder="Tu cuenta (Email)"
                className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Input: Contraseña */}
            <label className="block mb-2 font-medium" htmlFor="password">
                Contraseña
            </label>
            <input
                id="password"
                name="password"
                type="password"
                value={form.password}  // Valor del estado
                onChange={handleChange}  // Actualiza el estado al escribir
                required
                placeholder="Tu contraseña"
                className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* Botón de envío */}
            <button
                type="submit"
                className="w-full bg-zinc-800 text-white py-2 rounded-md hover:bg-zinc-500 transition duration-200"
            >
                Iniciar sesión
            </button>
            {/* Enlace para registrarse */}
            <p className="text-center mt-4">
                ¿No tienes cuenta? <Link to="/reg" className="text-blue-500 hover:underline"> Regístrate aquí </Link>
            </p>
            {/*Entrar como invitado */}
            <p className="text-center mt-4">
                <Link to="/home" className="text-blue-500 hover:underline"> Entrar como invitado </Link>
            </p>

        </form>

        </div>
    )
}

export default Login;