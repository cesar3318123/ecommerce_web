//Importamos React y el hook useState
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importamos Link para navegación


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
        alert("Encuesta enviada con éxito");
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
      <h2 className="text-2xl font-bold mb-4 text-center">Prueba 2: Pruebas A/B</h2>
      <p className="text-left mb-6">•	Realizaras 3 tareas de búsqueda de productos relacionados en despensa.</p>
      <p className="text-left mb-6">•	Completa cada tarea lo más rápido posible y sin ayuda.</p>
      <p className="text-left mb-6">•	Al final, responde preguntas sobre tu experiencia.</p>
      <p className="text-left mb-6">•	Tareas sugeridas (ejemplo)</p>
      <p className="text-left mb-6">1.	“Encuentra una bebida de chocolate con envase ≤ 500 ml.”</p>
      <p className="text-left mb-6">2.	“Busca snacks bajos en azúcar y elige uno para añadir al carrito.”</p>
      <p className="text-left mb-6">3.	“Localiza alimentos aptos para intolerancia a la lactosa y selecciona uno.”</p>
      <p className="text-left mb-6">• Por cada tarea terminada se tendrá que contestar ciertas preguntas.</p>


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
          <label className="block mb-1 font-medium">Frase exacta que el participante escribio en la consulta</label>
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
          <label className="block mb-1 font-medium">Versión del sistema, (insertar "1" si usaste el sistema de IA y lenguaje natural, inserta "2" si usaste el tradicional)</label>
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
          <label className="block mb-1 font-medium">¿Si encontraste el producto?</label>
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
          <label className="block mb-1 font-medium">¿Que tan claras fueron las respuestas? (1-5)</label>
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
          <label className="block mb-1 font-medium">Comentarios breves del participante</label>
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


      <p className="text-center mb-6">
        Recuerda que para poder hacer las pruebas necesitas{" "}
        <Link to="/reg" className="text-blue-600 hover:underline">
         registrarte
       </Link>.
      </p>
      </form>
        
  </div>
);

}

//Exportamos el componente Survey
export default Survey;