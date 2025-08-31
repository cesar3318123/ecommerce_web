//Importamos React y el hook useState
import React, { useState, useEffect } from "react";


//Declaramos el componente llamado End
function Infor_products() {
  const [product, setProduct] = useState(null); // estado para el producto
  const [loading, setLoading] = useState(true); // estado de carga
  const [error, setError] = useState(null); // estado de error

  useEffect(() => {
        // Recuperar el ID desde localStorage
    const name = localStorage.getItem("selectedProductName");

    if (!name) {
      setError("No se encontró el ID del producto en localStorage");
      setLoading(false);
      return;
    }

    // Hacer fetch al backend con el id
    fetch(`https://ecommercebackend-production-8245.up.railway.app/api/product/${encodeURIComponent(name)}`)
    .then((res) => {
    if (!res.ok) throw new Error("Error al obtener el producto");
    return res.json();
    })
          .then((data) => {
        setProduct(data); // guardar producto en el estado
        setLoading(false);
      })
            .catch((err) => {
        console.error(err);
        setError("Hubo un problema al obtener el producto");
        setLoading(false);
      });

  }, []);

   return (
   <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
<div className="bg-[#c9c9c9] p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Descripción del producto</h2>

        {loading && <p className="text-gray-600">Cargando...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {product && (
          <div>
            <h3 className="text-lg font-semibold">{product.nombre}</h3>
            <p className="text-gray-700">Marca: {product.marca}</p>
            <p className="text-gray-700">Categoría: {product.categoria}</p>
            <p className="text-gray-700">Calorías: {product.calorias}</p>

            {product.imagen && (
              <img
                src={product.imagen}
                alt={product.nombre}
                className="mt-4 w-full h-48 object-cover rounded"
              />
            )}
          </div>
        )}
      </div>
   </div>
);
}

//Exportamos el componente Information
export default Infor_products;