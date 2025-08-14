//Importamos React y el hook useState
import React, { useState } from "react";


//Declaramos el componente llamado Survey
function Survey() {
  const [formData, setFormData] = useState({
    grupo: "",
    num_tarea: "",
    frase_exacta: "",
    sistema_usado: "",
    producto_encontrado: "",
    tiempo_empleado: "",
    claridad: "",
    comentarios: ""
  });



  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validaciones en línea para algunos campos
    if (name === "grupo") {
      if (!/^[AB]?$/.test(value.toUpperCase())) return;
      setFormData({ ...formData, [name]: value.toUpperCase() });
    } else if (name === "num_tarea") {
      if (!/^[1-3]?$/.test(value)) return;
      setFormData({ ...formData, [name]: value });
    } else if (name === "sistema_usado") {
      if (!/^[1-2]?$/.test(value)) return;
      setFormData({ ...formData, [name]: value });
    } else if (name === "claridad") {
      if (!/^[1-5]?$/.test(value)) return;
      setFormData({ ...formData, [name]: value });
    } else if (name === "tiempo_empleado") {
      // solo números positivos
      if (!/^\d*$/.test(value)) return;
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("No se encontró el usuario en localStorage");
      return;
    }

    // Validaciones finales
    const { grupo, num_tarea, frase_exacta, sistema_usado, producto_encontrado, tiempo_empleado, claridad, comentarios } = formData;
    if (!grupo || !num_tarea || !frase_exacta || !sistema_usado || !producto_encontrado || !tiempo_empleado || !claridad || !comentarios) {
      setMessage("Todos los campos son obligatorios");
      return;
    }

    const dataToSend = {
      userId: Number(userId),
      grupo,
      num_tarea: Number(num_tarea),
      frase_exacta,
      sistema_usado: Number(sistema_usado),
      producto_encontrado,
      tiempo_empleado: Number(tiempo_empleado),
      claridad: Number(claridad),
      comentarios
    };

    try {
      const res = await fetch("https://ecommercebackend-production-8245.up.railway.app/api/survey/prueba2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });
      const result = await res.json();
      setMessage(result.mensaje || "Registro creado");

      if (res.ok) {
        setFormData({
          grupo: "",
          num_tarea: "",
          frase_exacta: "",
          sistema_usado: "",
          producto_encontrado: "",
          tiempo_empleado: "",
          claridad: "",
          comentarios: ""
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
          className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition"
        >
          Regresar
        </button>
      </div>


      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Grupo */}
        <div>
          <label className="block mb-1 font-medium">Grupo (A o B)</label>
          <input
            type="text"
            name="grupo"
            maxLength="1"
            value={formData.grupo}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Num tarea */}
        <div>
          <label className="block mb-1 font-medium">Número de tarea (1-3)</label>
          <input
            type="number"
            name="num_tarea"
            min="1"
            max="3"
            value={formData.num_tarea}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Frase exacta */}
        <div>
          <label className="block mb-1 font-medium">Frase exacta</label>
          <textarea
            name="frase_exacta"
            value={formData.frase_exacta}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Sistema usado */}
        <div>
          <label className="block mb-1 font-medium">Sistema usado (1 o 2)</label>
          <input
            type="number"
            name="sistema_usado"
            min="1"
            max="2"
            value={formData.sistema_usado}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Producto encontrado */}
        <div>
          <label className="block mb-1 font-medium">Producto encontrado</label>
          <input
            type="text"
            name="producto_encontrado"
            value={formData.producto_encontrado}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Tiempo empleado */}
        <div>
          <label className="block mb-1 font-medium">Tiempo empleado (segundos)</label>
          <input
            type="number"
            name="tiempo_empleado"
            min="1"
            value={formData.tiempo_empleado}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Claridad */}
        <div>
          <label className="block mb-1 font-medium">Claridad (1-5)</label>
          <input
            type="number"
            name="claridad"
            min="1"
            max="5"
            value={formData.claridad}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Comentarios */}
        <div>
          <label className="block mb-1 font-medium">Comentarios</label>
          <textarea
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Enviar
        </button>

        {message && <p className="mt-2 text-center text-green-600 font-medium">{message}</p>}
      </form>
        
  </div>
);

}

//Exportamos el componente Survey
export default Survey;