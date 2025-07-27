// Importamos React y el hook useState
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para redirección

// Declaramos el componente llamado Registro
function Register() {
  // Definimos el estado del formulario con nombre, email y password
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  // Función que se ejecuta cada vez que se cambia un input
  const handleChange = (e) => {
    setForm({
      ...form, // copiamos el estado actual
      [e.target.name]: e.target.value, // actualizamos el campo modificado
    });
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que la página se recargue


    try {
      const res = await fetch(`https://ecommercebackend-production-8245.up.railway.app/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, // Indicamos que el cuerpo de la petición es JSON
        body: JSON.stringify(form), // Convertimos el formulario a JSON
      });

      const data = await res.json(); // Parseamos la respuesta JSON
      if (res.ok) {
        alert(`Bienvenido, ${data.nombre}`); // Si la respuesta es exitosa, mostramos un mensaje de bienvenida
        navigate("/"); // Redirige a la página de inicio de sesión
      } else {
        alert(`Error: ${data.message}`); // Si hay un error, mostramos el mensaje de error
      }

    } catch (error) {
      console.error("Error al registrarse:", error); // Si ocurre un error, lo mostramos en la consola
      alert("Error al registrarse. Por favor, inténtalo de nuevo."); // Mostramos un mensaje de error al usuario
    }

  };
  const navigate = useNavigate(); // Hook para redirección

  // Lo que retorna el componente (JSX = JavaScript + HTML)
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
    <p className="text-2xl font-semibold mb-6 text-center">Nota: No insertes tu cuenta y contraseña verdadera, inventa una con tu nombre y registrala</p>
      {/* Contenedor del formulario con estilos de Tailwind */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#c9c9c9] p-8 rounded-xl shadow-md w-full max-w-md"
      >
        {/* Título */}
        <h2 className="text-5xl font-semibold mb-6 text-center">Registro</h2>

        {/* Input: Nombre */}
        <label className="block mb-2 font-medium" htmlFor="nombre">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre} // Valor del estado
          onChange={handleChange} // Actualiza el estado al escribir
          required
          placeholder="Tu nombre"
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Input: Email */}
        <label className="block mb-2 font-medium" htmlFor="email">
          Cuenta (Email)
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="tu@email.com"
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
          value={form.password}
          onChange={handleChange}
          required
          placeholder="********"
          className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {/* Input: Repite la contraseña */}
        <label className="block mb-2 font-medium" htmlFor="password">
          Repite otra vez tu contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="********"
          className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Botón de enviar */}
        <button
          type="submit"
          className="w-full bg-zinc-800 text-white py-2 rounded-md hover:bg-zinc-500 transition"
        >
          Registrarse
        </button>

        {/*Boton para cancelar */}
        <button
            onClick={() => navigate("/")} // Redirige a la página de inicio
            type="button"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-400 transition mt-4"
        >
            Cancelar
        </button>
      </form>
    </div>
  );
}

// Exportamos el componente para poder usarlo en App.jsx
export default Register;
