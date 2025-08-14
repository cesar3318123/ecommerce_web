//Importamos React y el hook useState
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//Declaramos el componente llamado Information
function Information() {

    const [formData, setFormData] = useState({
    satisfaccion: "",
    facilidad_uso: "",
    relevancia: "",
    inteligencia_percibida: "",
    confianza: "",
    volveria_usar: "",
    comentarios: ""
  });

  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    const rangoValido = (valor) =>
      [1, 2, 3, 4, 5].includes(Number(valor));

    if (!rangoValido(formData.satisfaccion))
      newErrors.satisfaccion = "Debe ser un número entre 1 y 5";
    if (!rangoValido(formData.facilidad_uso))
      newErrors.facilidad_uso = "Debe ser un número entre 1 y 5";
    if (!rangoValido(formData.relevancia))
      newErrors.relevancia = "Debe ser un número entre 1 y 5";
    if (!rangoValido(formData.inteligencia_percibida))
      newErrors.inteligencia_percibida = "Debe ser un número entre 1 y 5";
    if (!rangoValido(formData.confianza))
      newErrors.confianza = "Debe ser un número entre 1 y 5";
    if (!rangoValido(formData.volveria_usar))
      newErrors.volveria_usar = "Debe ser un número entre 1 y 5";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("No se encontró el ID de usuario en localStorage");
      return;
    }

    try {
      const response = await fetch("https://ecommercebackend-production-8245.up.railway.app/api/survey/prueba3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          ...formData
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert("Encuesta enviada con éxito");
        setFormData({
          satisfaccion: "",
          facilidad_uso: "",
          relevancia: "",
          inteligencia_percibida: "",
          confianza: "",
          volveria_usar: "",
          comentarios: ""
        });
      } else {
        alert(data.error || "Error al enviar encuesta");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };



    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
                {/* Botón de regresar en la esquina superior izquierda */}
            <div className="fixed top-4 left-4 z-50">
                <button 
                 onClick={() => window.history.back()}
                 className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition">
                Regresar
                </button>
            </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Prueba 3: Encuesta de UX (por sistema) </h2>
        <p className="text-center mb-6">Observa cada imagen de los resultados de búsquedas y califica del 1 al 3 (1: Irrelevante, 2: Relevante, 3: Muy relevante):</p>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Satisfacción */}
      <div>
        <label className="block mb-1 font-medium">1.	Satisfacción general con el sistema:  (1-5)</label>
        <input
          type="number"
          name="satisfaccion"
          min="1"
          max="5"
          value={formData.satisfaccion}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          required
        />
      </div>

      {/* Facilidad de uso */}
      <div>
        <label className="block mb-1 font-medium">2.	Facilidad de uso (fue fácil completar las tareas): (1-5)</label>
        <input
          type="number"
          name="facilidad_uso"
          min="1"
          max="5"
          value={formData.facilidad_uso}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          required
        />
      </div>

      {/* Relevancia */}
      <div>
        <label className="block mb-1 font-medium">3.	Relevancia percibida de los resultados: (1-5)</label>
        <input
          type="number"
          name="relevancia"
          min="1"
          max="5"
          value={formData.relevancia}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          required
        />
      </div>

      {/* Inteligencia percibida */}
      <div>
        <label className="block mb-1 font-medium">4.	Inteligencia percibida (entendió lo que pedí): (1-5)</label>
        <input
          type="number"
          name="inteligencia_percibida"
          min="1"
          max="5"
          value={formData.inteligencia_percibida}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          required
        />
      </div>

      {/* Confianza */}
      <div>
        <label className="block mb-1 font-medium">5.	Confianza en las respuestas/resultados: (1-5)</label>
        <input
          type="number"
          name="confianza"
          min="1"
          max="5"
          value={formData.confianza}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          required
        />
      </div>

      {/* Volvería a usar */}
      <div>
        <label className="block mb-1 font-medium">6.	Volvería a usarlo: (1-5)</label>
        <input
          type="number"
          name="volveria_usar"
          min="1"
          max="5"
          value={formData.volveria_usar}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          required
        />
      </div>

      {/* Comentarios */}
      <div>
        <label className="block mb-1 font-medium">7.	Comentario abierto (qué mejorarías):</label>
        <textarea
          name="comentarios"
          value={formData.comentarios}
          onChange={(e) =>
            setFormData({ ...formData, comentarios: e.target.value })
          }
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
      >
        Enviar
      </button>

      {message && (
        <p className="mt-2 text-center text-green-600 font-medium">{message}</p>
      )}
    </form>


        </div>
    )
}

//Exportamos el componente Information
export default Information;