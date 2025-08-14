//Importamos React y el hook useState
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//Declaramos el componente llamado Instruction
function Instruction() {

const [formData, setFormData] = useState({
    userId: "",
    busqueda1: "",
    busqueda2: "",
    busqueda3: "",
    busqueda4: "",
    busqueda5: "",
    busqueda6: "",
    busqueda7: "",
    busqueda8: "",
    busqueda9: "",
    busqueda10: ""
  });

   const [message, setMessage] = useState("");


   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


    const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir los campos de busqueda a números
    const dataToSend = {
      ...formData,
      userId: Number(formData.userId),
      busqueda1: Number(formData.busqueda1),
      busqueda2: Number(formData.busqueda2),
      busqueda3: Number(formData.busqueda3),
      busqueda4: Number(formData.busqueda4),
      busqueda5: Number(formData.busqueda5),
      busqueda6: Number(formData.busqueda6),
      busqueda7: Number(formData.busqueda7),
      busqueda8: Number(formData.busqueda8),
      busqueda9: Number(formData.busqueda9),
      busqueda10: Number(formData.busqueda10),
    };

        try {
      const res = await fetch("/api/prueba1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await res.json();
      setMessage(result.message || "Datos enviados");

      if (res.ok) {
        setFormData({
          userId: "",
          busqueda1: "",
          busqueda2: "",
          busqueda3: "",
          busqueda4: "",
          busqueda5: "",
          busqueda6: "",
          busqueda7: "",
          busqueda8: "",
          busqueda9: "",
          busqueda10: ""
        });
      }
    } catch (error) {
      console.error(error);
      setMessage("Error al enviar los datos");
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

            <h2 className="text-2xl font-bold mb-4 text-center">Formulario Prueba 1</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ID del usuario */}
        <div>
          <label className="block mb-1 font-medium">ID Usuario</label>
          <input
            type="number"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Campos de búsqueda */}
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i}>
            <label className="block mb-1 font-medium">
              Búsqueda {i + 1} (1-3)
            </label>
            <input
              type="number"
              name={`busqueda${i + 1}`}
              min="1"
              max="3"
              value={formData[`busqueda${i + 1}`]}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
        ))}

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center font-medium text-green-600">{message}</p>
      )}


        </div>
    )
}

//Exportamos el componente Information
export default Instruction;