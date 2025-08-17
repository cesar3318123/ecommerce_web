//Importamos React y el hook useState
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Importamos Link para navegación

//Declaramos el componente llamado Instruction
function Instruction() {

const [formData, setFormData] = useState({
    busqueda1: "",
    busqueda2: "",
    busqueda3: "",
    busqueda4: "",
    busqueda5: "",
    busqueda6: "",
    busqueda7: "",
    busqueda8: "",
    busqueda9: "",
    busqueda10: "",
    busqueda11: "",
    busqueda12: "",
    busqueda13: "",
    busqueda14: "",
    busqueda15: "",
    busqueda16: "",
    busqueda17: "",
    busqueda18: "",
    busqueda19: "",
    busqueda20: ""
  });



   const [message, setMessage] = useState("");


   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const busquedasConfig = [
  { titulo: "Busqueda 1: dame bebidas de manzana - Modelo tradicional de busqueda", img: require("../img/Imagen1.png") },
  { titulo: "Busqueda 2: dame bebidas de manzana - Modelo de lenguaje natural e IA", img: require("../img/Imagen2.png") },
  { titulo: "Busqueda 3: naranjas - Modelo tradicional de busqueda", img: require("../img/Imagen3.png") },
  { titulo: "Busqueda 4: naranjas - Modelo de lenguaje natural e IA", img: require("../img/Imagen4.png") },
  { titulo: "Busqueda 5: dame alimentos y bebidas bajos en azúcar - Modelo tradicional de busqueda", img: require("../img/Imagen5.png") },
  { titulo: "Busqueda 6: dame alimentos y bebidas bajos en azúcar - Modelo de lenguaje natural e IA", img: require("../img/Imagen6.png") },
  { titulo: "Busqueda 7: cereales con alto contenido de fibra - Modelo tradicional de busqueda", img: require("../img/Imagen7.png") },
  { titulo: "Busqueda 8: cereales con alto contenido de fibra - Modelo de lenguaje natural e IA", img: require("../img/Imagen8.png") },
  { titulo: "Busqueda 9: muéstrame por favor alimentos saludables - Modelo tradicional de busqueda", img: require("../img/Imagen9.png") },
  { titulo: "Busqueda 10: muéstrame por favor alimentos saludables - Modelo de lenguaje natural e IA", img: require("../img/Imagen10.png") },
  { titulo: "Busqueda 11: Quiero ver todas las marcas de galletas con chispas de chocolate que tengas - Modelo tradicional de busqueda", img: require("../img/Imagen11.png") },
  { titulo: "Busqueda 12: Quiero ver todas las marcas de galletas con chispas de chocolate que tengas - Modelo de lenguaje natural e IA", img: require("../img/Imagen12.png") },
  { titulo: "Busqueda 13: Bebidas energéticas sin azúcar - Modelo tradicional de busqueda", img: require("../img/Imagen13.png") },
  { titulo: "Busqueda 14: Bebidas energéticas sin azúcar - Modelo de lenguaje natural e IA", img: require("../img/Imagen14.png") },
  { titulo: "Busqueda 15: Salsas para pasta de tomate natural - Modelo tradicional de busqueda", img: require("../img/Imagen15.png") },
  { titulo: "Busqueda 16: Salsas para pasta de tomate natural - Modelo de lenguaje natural e IA", img: require("../img/Imagen16.png") },
  { titulo: "Busqueda 17: Alimentos veganos ricos en proteína - Modelo tradicional de busqueda", img: require("../img/Imagen17.png") },
  { titulo: "Busqueda 18: Alimentos veganos ricos en proteína - Modelo de lenguaje natural e IA", img: require("../img/Imagen18.png") },
  { titulo: "Busqueda 19: Botanas saladas para ver una película - Modelo tradicional de busqueda", img: require("../img/Imagen19.png") },
  { titulo: "Busqueda 20: Botanas saladas para ver una película - Modelo de lenguaje natural e IA", img: require("../img/Imagen20.png") }
  // ...y así hasta Imagen20
];


    const handleSubmit = async (e) => {



    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("No te has registrado, por favor regístrate primero");
      return;
    }

      // 🔹 Validar que no haya campos vacíos
  for (const key in formData) {
    if (formData[key] === "") {
      setMessage("Debes llenar todos los campos");
      return;
    }
  }

    // Convertir los campos de busqueda a números
    const dataToSend = {
      ...formData,
      userId: Number(userId),
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
      busqueda11: Number(formData.busqueda11),
      busqueda12: Number(formData.busqueda12),
      busqueda13: Number(formData.busqueda13),
      busqueda14: Number(formData.busqueda14),
      busqueda15: Number(formData.busqueda15),
      busqueda16: Number(formData.busqueda16),
      busqueda17: Number(formData.busqueda17),
      busqueda18: Number(formData.busqueda18),
      busqueda19: Number(formData.busqueda19),
      busqueda20: Number(formData.busqueda20)
    };

      for (const val of Object.values(dataToSend).filter(v => typeof v === "number")) {
    if (val < 1 || val > 3) {
      setMessage("Todos los valores deben estar entre 1 y 3");
      return;
    }
  }

        try {
      const res = await fetch("https://ecommercebackend-production-8245.up.railway.app/api/survey/prueba1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await res.json();
      setMessage(result.message || "Datos enviados");

      if (res.ok) {
        setMessage(result.mensaje || "Registro creado");
        alert("Encuesta enviada con éxito");
        setFormData({
          busqueda1: "",
          busqueda2: "",
          busqueda3: "",
          busqueda4: "",
          busqueda5: "",
          busqueda6: "",
          busqueda7: "",
          busqueda8: "",
          busqueda9: "",
          busqueda10: "",
          busqueda11: "",
          busqueda12: "",
          busqueda13: "",
          busqueda14: "",
          busqueda15: "",
          busqueda16: "",
          busqueda17: "",
          busqueda18: "",
          busqueda19: "",
          busqueda20: ""
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

            <h2 className="text-2xl font-bold mb-4 text-center">Prueba 1: Pruebas de precisión y relevancia </h2>
            <p className="text-center mb-6">Observa cada imagen de los resultados de búsquedas y califica del 1 al 3 (1: Irrelevante, 2: Relevante, 3: Muy relevante):</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        

{/* Render dinámico de inputs */}
{busquedasConfig.map((busqueda, i) => (
  <div key={i} className="mb-4">
    {/* Imagen */}
    <img
      src={busqueda.img}
      alt={busqueda.titulo}
      className="w-40 h-40 object-contain mx-auto mb-2 border rounded-lg shadow"
    />

    {/* Título encima del input */}
    <label className="block mb-1 font-semibold text-center">
      {busqueda.titulo} (1-3)
    </label>

    {/* Input */}
    <input
      type="text"
      name={`busqueda${i + 1}`}
      value={formData[`busqueda${i + 1}`]}
      onChange={(e) => {
        const val = e.target.value;
        if (/^[1-3]?$/.test(val)) {
          handleChange(e);
        }
      }}
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

      <p className="text-center mb-6">
        Recuerda que para poder hacer las pruebas necesitas{" "}
        <Link to="/reg" className="text-blue-600 hover:underline">
         registrarte
       </Link>.
      </p>



        </div>
    )
}

//Exportamos el componente Information
export default Instruction;