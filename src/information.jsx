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

        <form onSubmit={handleSubmit} className = "space-y-4">
      <h2>Encuesta de Satisfacción</h2>

      {[
        { name: "satisfaccion", label: "Satisfacción" },
        { name: "facilidad_uso", label: "Facilidad de uso" },
        { name: "relevancia", label: "Relevancia" },
        { name: "inteligencia_percibida", label: "Inteligencia percibida" },
        { name: "confianza", label: "Confianza" },
        { name: "volveria_usar", label: "Volvería a usar" }
      ].map((field) => (
        <div key={field.name}>
          <label>{field.label} (1 a 5)</label>
          <input
            type="number"
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
          {errors[field.name] && (
            <p style={{ color: "red" }}>{errors[field.name]}</p>
          )}
        </div>
      ))}

      <div>
        <label>Comentarios (opcional)</label>
        <textarea
          name="comentarios"
          value={formData.comentarios}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Enviar</button>
    </form>



        </div>
    )
}

//Exportamos el componente Information
export default Information;