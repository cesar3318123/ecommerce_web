import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importamos Link para navegación

function Prueba4() {
  const [formData, setFormData] = useState({
    preciso: null,
    preferencia: null,
    entiendeConsulta: null,
    innovador: null,
    lenguajeNatural: null,
    facilidad: null,
    moderno: null,
    pocoTiempo: null,
  });

  const [success, setSuccess] = useState(false); // estado para mostrar mensaje
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "true", // convierte string en boolean
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://ecommercebackend-production-8245.up.railway.app/api/survey/prueba4",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error(data.error || "Error al enviar la encuesta");
      //Si todo sale bien mostrar alerta de gracias por participar
      const data = await res.json();
      setMessage(data.mensaje || "Registro creado");
      console.log("✅ Respuesta guardada:", data);
      alert("¡Gracias por tu participación!");

      // 🔹 Resetear formulario (volver todo a null)
      setFormData({
        preciso: null,
        preferencia: null,
        entiendeConsulta: null,
        innovador: null,
        lenguajeNatural: null,
        facilidad: null,
        moderno: null,
        pocoTiempo: null,
      });

      // 🔹 También limpiar los radios seleccionados
      e.target.reset();
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Botón de regresar */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => window.history.back()}
          className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition"
        >
          Regresar
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-6">Prueba 4: Compra 🛒</h1>
      <h3 className="text-lg mb-6">
        Utilizando el sistema de analisis de modelos, indaga libremente por la
        interfaz completando busquedas personales y uso de las funciones
        disponibles, al finalizar responde una encuesta de cual sistema de
        busqueda fue más eficiente
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "preciso", label: "¿Cuál de los 2 te parece más preciso?" },
          {
            name: "preferencia",
            label: "¿Cuál preferirías usar en una tienda real?",
          },
          {
            name: "entiendeConsulta",
            label: "¿Cuál de los 2 crees que entiende mejor la consulta?",
          },
          {
            name: "innovador",
            label: "¿Cuál de los 2 sistemas consideras más innovador?",
          },
          {
            name: "lenguajeNatural",
            label: "¿Cuál entiende mejor el lenguaje natural?",
          },
          {
            name: "facilidad",
            label:
              "¿En cuál encontraste con mayor facilidad un producto específico?",
          },
          {
            name: "moderno",
            label:
              "¿Cuál se parece más a lo que esperas de una tienda moderna?",
          },
          {
            name: "pocoTiempo",
            label: "¿Cuál usarías si tuvieras poco tiempo para comprar?",
          },
        ].map((q, i) => (
          <div key={i} className="flex flex-col">
            <label className="font-semibold">{q.label}</label>
            <div className="flex gap-4 mt-1">
              <label>
                <input
                  type="radio"
                  name={q.name}
                  value="true"
                  onChange={handleChange}
                  required
                />{" "}
                Sistema A (IA Generativa)
              </label>
              <label>
                <input
                  type="radio"
                  name={q.name}
                  value="false"
                  onChange={handleChange}
                />{" "}
                Sistema B (Tradicional)
              </label>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-500 transition"
        >
          Enviar respuestas
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center font-medium text-green-600">{message}</p>
      )}

      <p className="text-center mb-6">
        Recuerda que para poder hacer las pruebas necesitas{" "}
        <Link to="/reg" className="text-blue-600 hover:underline">
          registrarte
        </Link>
        .
      </p>
    </div>
  );
}

export default Prueba4;
