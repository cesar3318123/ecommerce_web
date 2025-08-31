import React, { useState, useEffect } from "react";
import addToCart from "./addToCar.jsx"; // Importa tu función de carrito

function Infor_products() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("selectedId");

    if (!id) {
      setError("No se encontró el ID del producto en localStorage");
      setLoading(false);
      return;
    }

    fetch(`https://ecommercebackend-production-8245.up.railway.app/api/product/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener el producto");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Hubo un problema al obtener el producto");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Botón de regresar */}
      <div className="self-start mb-4">
        <button
          onClick={() => window.history.back()}
          className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition"
        >
          Regresar
        </button>
      </div>

      {product && (
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row w-full max-w-4xl">
          {/* Imagen */}
          {product.imagen && (
            <div className="md:w-1/3 flex justify-center items-center">
              <img
                src={product.imagen}
                alt={product.nombre}
                className="rounded-lg object-cover w-full h-64 md:h-auto"
              />
            </div>
          )}

          {/* Información */}
          <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.nombre}</h2>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Marca:</span> {product.marca || "No disponible"}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Categoría:</span> {product.categoria || "No disponible"}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Calorías:</span> {product.calorias || "No disponible"}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Proteínas:</span> {product.proteinas || "No disponible"}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Carbohidratos:</span> {product.carbohidratos || "No disponible"}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Grasas:</span> {product.grasas || "No disponible"}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Azúcar:</span> {product.azucar || "No disponible"}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Sodio:</span> {product.sodio || "No disponible"}
              </p>
            </div>

            {/* Botón agregar al carrito */}
            <div className="mt-4">
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 transition w-full md:w-auto"
              >
                Añadir al carrito 🛒
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Infor_products;
