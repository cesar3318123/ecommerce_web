//Importamos React y el hook useState
import React, { useEffect, useState } from "react";
import logo from "./logo.jpg"; // Importamos el logo de la carpeta public
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para redirección
import favicon from "./CIGR_20_2.png"; // Importamos el favicon de la carpeta public
import addToCart from "./addToCar.jsx"; // Importamos la función para añadir al carrito
import { Link } from "react-router-dom"; // Importamos Link para navegación

//Declaramos el componente llamado Home
function Home() {
  const userId = localStorage.getItem("userId");

  const [cartOpen, setCartOpen] = useState(false); // Sidebar derecho del carrito
  const [cartItems, setCartItems] = useState([]); // Productos añadidos al carrito

  const [ads, setAds] = useState([]); // Estado para los anuncios

  const [query, setQuery] = useState(""); // Estado para la consulta de búsqueda

  const [queryDefault, setQueryDefault] = useState("cookie"); // término por defecto

  const [products, setProducts] = useState([]); // Estado para almacenar los productos

  const [productsDefault, setProductsDefault] = useState([]); // Estado para almacenar los productos por defecto

  const [error, setError] = useState(""); // Estado para manejar errores

  const [errorDefault, setErrorDefault] = useState(""); // Estado para manejar errores por defecto

  const [email, setEmail] = useState(""); // Estado para el email

  const [username, setUsername] = useState(""); // Estado para el nombre de usuario

  const [isOpen, setIsOpen] = useState(false); // Estado para el drawer (Sidebar)

  const toggleSidebar = () => setIsOpen(!isOpen); // Función para alternar el estado del drawer

  const closeSidebar = () => setIsOpen(false); // Función para cerrar el drawer

  const navigate = useNavigate(); // Hook para redirección

  const [loading, setLoading] = useState(false);

  const [searched, setSearched] = useState(false); // Nuevo estado para saber si se buscó algo

  const handleSubmit = async (e) => {
    e.preventDefault(); //Evita que la pagina se recargue al enviar el formulario
    setError(""); //Resetea el estado de error antes de hacer la búsqueda
    setSearched(true); // marcamos que ya se hizo la búsqueda
    setProducts([]); //Resetea el estados de los resultados de productos antes de hacer una nueva búsqueda
    setLoading(true); // Establece el estado de carga a verdadero para mostrar un indicador de carga si es necesario

    try {
      //Realiza una petición GET a la API para buscar productos
      const response = await fetch(
        `https://ecommercebackend-production-8245.up.railway.app/api/searchTradictional?q=${encodeURIComponent(
          query
        )}`
      );
      //Verifica si la respuesta es exitosa
      if (!response.ok) {
        throw new Error("Error al buscar productos");
      }

      const data = await response.json(); //Convierte la respuesta a JSON
      setProducts(data); //Actualiza el estado de los productos con los datos obtenidos
    } catch (error) {
      console.error("Error frontend: No se pudo buscar productos:", error);
      setError("Error frontend: No se pudo buscar productos"); //Actualiza el estado de error si ocurre un problema
    } finally {
      setLoading(false); // termina cargando
    }
  };

  const buscarProductos = async (termino) => {
    setProductsDefault([]); // Resetea el estado de los productos antes de buscar
    setErrorDefault(""); // Resetea el estado de error antes de buscar
    try {
      const res = await fetch(
        `https://ecommercebackend-production-8245.up.railway.app/api/searchTradictional?q=${encodeURIComponent(
          termino
        )}`
      );
      const data = await res.json();
      setProductsDefault(data);
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };

  // Función para añadir al carrito y actualizar el estado
  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  useEffect(() => {
    // Verifica si el usuario está autenticado
    buscarProductos(queryDefault); // Llama a la función para buscar productos con el término por defecto
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("username");
    if (!userEmail) {
      setEmail("Invitado"); // Si no hay email en localStorage, muestra "Invitado"
      setUsername("Invitado"); // También establece el nombre de usuario como "Invitado"
    } else {
      setEmail(userEmail); // Si hay email, lo establece en el estado
      setUsername(userName); // También establece el nombre de usuario en el estado
    }

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

  // Selección de 3 imágenes aleatorias de ads al cargar la página
  useEffect(() => {
    const totalAds = 10; // tienes imagen1 a imagen10
    const selected = [];
    while (selected.length < 3) {
      const randomNum = Math.floor(Math.random() * totalAds) + 1;
      const imagePath = `/imgpublicisted/anuncio${randomNum}.jpg`;
      if (!selected.includes(imagePath)) {
        selected.push(imagePath);
      }
    }
    setAds(selected);
  }, []);

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
    <div className="relative min-h-screen bg-gray-100 flex flex-col">
      {/*Encabezado*/}
      <header className="w-full bg-[#c9c9c9] shadow-md">
        {/*Parte superior*/}
        <div className="flex items-center px-4 py-3">
          {/*Boton para abrir y cerrar el sidebar */}
          <button
            onClick={toggleSidebar}
            className="fixed left-4 top-1/2 z-50 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isOpen ? "Cerrar ➤" : "Ménu ➤"}
          </button>

          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="fixed right-4 top-4 z-50 px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-800 transition"
          >
            {isOpen ? "🛒" : "🛒"}
          </button>

          <div className="p-4">
            <img src={favicon} alt="Logo" className="w-32 h-auto" />
          </div>

          <h1 className="text-3xl font-semibold text-center">
            Modelo Tradicional 📦
          </h1>
        </div>
        {/*Parte inferior*/}
        <div className="p-4 flex justify-end items-center space-x-4">
          <form onSubmit={handleSubmit}>
            {/* Input de búsqueda */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)} // Actualiza el estado de la consulta al cambiar el input
              placeholder="Escribe tu consulta aquí"
              className="flex-grow max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* Botón Buscar */}
            <button
              type="submit" // Envía el formulario al hacer clic
              className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition"
            >
              Buscar
            </button>
          </form>
        </div>
      </header>

      {/*Contenedor del error*/}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {errorDefault && (
        <p className="text-red-500 text-center mt-4">{errorDefault}</p>
      )}

      {/* Overlay para ambos sidebars */}
      {(isOpen || cartOpen) && (
        <div
          onClick={() => {
            closeSidebar(); // Cierra el sidebar izquierdo
            setCartOpen(false); // Cierra el sidebar derecho
          }}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        ></div>
      )}

      {loading ? (
        <p className="text-center mt-4 text-blue-500 font-semibold">
          Cargando...
        </p>
      ) : (
        searched &&
        products.length === 0 && (
          <p className="text-center mt-4 text-red-500 font-semibold">
            No se encontró ningún producto 😢
          </p>
        )
      )}

      {/*Contenedor de los productos que aparecen al buscar*/}
      {products.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-center">
            Resultados de tu búsqueda:
          </h2>

          <div className="flex overflow-x-auto space-x-4 p-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 border p-4 rounded shadow bg-white flex flex-col justify-between"
              >
                <h3 className="font-bold text-lg">
                  {product.nombre || "Sin nombre"}
                </h3>
                <p className="text-gray-700">
                  Marca: {product.marca || "Sin marca"}
                </p>

                {product.imagen && (
                  <img
                    src={product.imagen}
                    alt={product.nombre || "Producto sin nombre"}
                    className="mt-2 w-full h-40 object-cover"
                  />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 👈 evita la redirección
                    addToCart(product);
                  }}
                  className="mt-4 bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-500 transition"
                >
                  Añadir al carrito 🛒
                </button>

                {/*Botón de información del producto */}
                <button
                  className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition"
                  onClick={() => {
                    localStorage.setItem("selectedId", product.id); // guardar en localStorage
                    console.log("Id del producto agregado: ", product.id); // Verificar que el ID se guarda correctamente
                    navigate("/infor_products"); // redirigir a la página de detalle
                  }}
                >
                  Ver descripción 📋
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Contenedor de anuncios */}
      {ads.length > 0 && (
        <div className="mt-6 p-4 bg-white rounded shadow overflow-x-auto flex space-x-4">
          {ads.map((ad, idx) => (
            <img
              key={idx}
              src={ad}
              alt={`Publicidad ${idx + 1}`}
              className="w-64 h-40 object-cover flex-shrink-0 rounded-lg"
            />
          ))}
        </div>
      )}

      {/*Contenedor de los productos que apareceran por default al cargar la pagina*/}
      {productsDefault.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-center">
            Recomendado para ti:
          </h2>

          <div className="flex overflow-x-auto space-x-4 p-4">
            {productsDefault.map((product, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 border p-4 rounded shadow bg-white flex flex-col justify-between"
              >
                <h3 className="font-bold text-lg">
                  {product.nombre || "Sin nombre"}
                </h3>
                <p className="text-gray-700">
                  Marca: {product.marca || "Sin marca"}
                </p>
                {product.imagen && (
                  <img
                    src={product.imagen}
                    alt={product.nombre || "Producto sin nombre"}
                    className="mt-2 w-full h-40 object-cover"
                  />
                )}
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-500 transition"
                >
                  Añadir al carrito 🛒
                </button>
                {/*Botón de información del producto */}
                <button
                  className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition"
                  onClick={() => {
                    localStorage.setItem("selectedId", product.id); // guardar en localStorage
                    console.log("Id del producto agregado: ", product.id); // Verificar que el ID se guarda correctamente
                    navigate("/infor_products"); // redirigir a la página de detalle
                  }}
                >
                  Ver descripción 📋
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/*Drawer (Sidebar) */}
      <div
        className={`
                fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                z-50
                `}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menú</h2>
          <div className="p-4">
            <img src={logo} alt="Logo" className="w-32 h-auto" />
          </div>
          <p>
            Usuario: <strong>{username}</strong>
          </p>
          <p>
            Cuenta: <strong>{email}</strong>
          </p>
          <button
            onClick={() => navigate("/Profile")}
            className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition mb-2"
          >
            Perfil 🪪
          </button>
          <button
            onClick={() => navigate("/model_analysis")}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-400 transition mb-2"
          >
            Analisis de Modelos 📈
          </button>

          {/* Botón para cambiar la Interfaz*/}
          <button
            onClick={() => navigate("/home2")}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-400 transition mb-2"
          >
            Cambiar Modelo ★★
          </button>
          {/*Boton para la prueba 1*/}
          <button
            onClick={() => navigate("/prueba1")}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition mb-2"
          >
            Prueba 1: Precisión 🔍
          </button>
          {/*Botón para la prueba 2*/}
          {email === "cgutierrez23@ucol.mx" && (
            <button
              onClick={() => navigate("/prueba2")}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition mb-2"
            >
              Prueba 2: A/B 📝
            </button>
          )}
          {/*Botón para la prueba 3*/}
          <button
            onClick={() => navigate("/prueba3")}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition mb-2"
          >
            Prueba 3: UX 📚
          </button>

          {/*Botón para la prueba 4*/}
          <button
            onClick={() => navigate("/prueba4")}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition mb-2"
          >
            Prueba 4: Syde-by-syde 🛒
          </button>

          <button
            onClick={toggleSidebar}
            className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition mb-2"
          >
            {isOpen ? "Cerrar ❌" : "Cerrar ❌"}
          </button>

          <p className="text-center mb-6">
            ¿No tienes cuenta?{" "}
            <Link to="/reg" className="text-blue-600 hover:underline">
              registrate
            </Link>
            .
          </p>
        </div>
      </div>
      <div
        className={`
    fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
    ${cartOpen ? "translate-x-0" : "translate-x-full"}
    z-50
  `}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Carrito 🛒</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition mb-2"
          >
            Cerrar ❌
          </button>

          {/* 👇 Aquí desplegamos los productos */}
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-center mt-4">
              Tu carrito está vacío 🛒
            </p>
          ) : (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-2 flex flex-col bg-gray-50 shadow-sm"
                >
                  <h3 className="font-semibold text-sm truncate">
                    {item.nombre || "Sin nombre"}
                  </h3>
                  <p className="text-gray-700 text-xs">
                    Marca: {item.marca || "Sin marca"}
                  </p>
                  {item.imagen && (
                    <img
                      src={item.imagen}
                      alt={item.nombre || "Producto"}
                      className="mt-2 w-full h-24 object-cover rounded"
                    />
                  )}
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="mt-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition text-sm"
                  >
                    Eliminar ❌
                  </button>

                  {/*Botón de información del producto */}
                  <button
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition"
                    onClick={() => {
                      const productId = item.productId || item.id;
                      localStorage.setItem("selectedId", productId);
                      console.log("Id del producto seleccionado:", productId);
                      navigate("/infor_products");
                    }}
                  >
                    Ver descripción 📋
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

//Exportamos el componente Home
export default Home;
