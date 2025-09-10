//Importamos el React y el hook useState
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./logo.jpg"; // Importamos el logo de la carpeta public

//Creamos el componente llamado Profile
function Profile() {
  const [email, setEmail] = useState(""); // Estado para el email

  const [username, setUsername] = useState(""); // Estado para el nombre de usuario

  const [cartItems, setCartItems] = useState([]); // Estado para productos en carrito

  const [loading, setLoading] = useState(true); // Estado de carga

  const [error, setError] = useState(""); // Estado de error

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si el usuario está autenticado
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("username");
    if (!userEmail) {
      setEmail("Invitado"); // Si no hay email en localStorage, muestra "Invitado"
      setUsername("Invitado"); // También establece el nombre de usuario como "Invitado"
    } else {
      setEmail(userEmail); // Si hay email, lo establece en el estado
      setUsername(userName); // También establece el nombre de usuario en el estado
    }

    // Si hay userId, obtenemos los productos del carrito
    if (userId) {
      fetch(
        `https://ecommercebackend-production-8245.up.railway.app/api/cartGet/${userId}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("No tienes productos agregados en tu carrito");
          }
          return res.json();
        })
        .then((data) => {
          setCartItems(data);
          console.log("Productos en carrito:", data);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [navigate]);

  // 🔹 Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    //Mandamos un alert para informar al usuario que ha cerrado sesión
    alert("Has cerrado sesión correctamente");
    navigate("/"); // Redirige a la página principal
  };
  const handleDeleteItem = async (itemId) => {
    if (!userId) return;

    try {
      const response = await fetch(
        `https://ecommercebackend-production-8245.up.railway.app/api/cartDelete/${userId}/${itemId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Removemos el item del estado local
        setCartItems(cartItems.filter((item) => item.id !== itemId));
        alert("Producto eliminado correctamente");
      } else {
        alert(data.error || "Error al eliminar producto");
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gray-100">
      {/* Botón de regresar en la esquina superior izquierda */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => window.history.back()}
          className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition"
        >
          Regresar
        </button>
      </div>

      {/* Cuadro gris centrado */}
      <div className="bg-[#c9c9c9] p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-5xl font-semibold mb-6 text-center">Perfil</h2>

        {/* Imagen */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-32 h-32 rounded-full" />
        </div>

        {/* Nombre */}
        <label className="block mb-2 font-medium" htmlFor="nombre">
          Nombre: <strong>{username}</strong>
        </label>

        {/* Cuenta */}
        <label className="block mb-2 font-medium" htmlFor="email">
          Cuenta (Email): <strong>{email}</strong>
        </label>

        {/* Botón cerrar sesión */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-400 transition duration-200"
        >
          Cerrar sesión
        </button>

        {/*Apartado de productos añadidos al carrito */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">
            Mis productos en el carrito:
          </h3>
          {loading ? (
            <p>Cargando productos...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : cartItems.length === 0 ? (
            <p>No tienes productos en tu carrito.</p>
          ) : (
            <ul className="space-y-3">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="border p-3 rounded bg-white shadow"
                >
                  <p className="font-semibold">{item.nombre}</p>
                  <p className="text-gray-700">Marca: {item.marca}</p>
                  {item.imagen && (
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="mt-2 w-24 h-auto"
                    />
                  )}
                  {/* Botón eliminar */}
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-400 transition"
                  >
                    Eliminar
                  </button>
                  {/*Botón de descripción */}
                <div>  
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500 transition"
                    onClick={() => {
                      localStorage.setItem("selectedId", item.productId);
                      navigate("/infor_products");
                    }}
                  >
                    Ver descripción 📋
                  </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
