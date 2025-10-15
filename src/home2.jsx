//Importamos React y el hook useState
import React, { useEffect, useState } from "react";
import logo from "./logo.jpg"; // Importamos el logo de la carpeta public
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para redire
import favicon from "./Logo_invertido.png"; // Importamos el favicon de la carpeta public
import addToCart from "./addToCar.jsx"; // Importamos la función para añadir al carrito
import { Link } from "react-router-dom"; // Importamos Link para navegación

//Creamos el componente llamado Home_IA
function Home_IA() {
  const userId = localStorage.getItem("userId");
  const [ads, setAds] = useState([]); // Estado para los anuncios

  const [email, setEmail] = useState(""); // Estado para el email

  const [productsDefault, setProductsDefault] = useState([]); // Estado para almacenar los productos por defecto

  const [username, setUsername] = useState(""); // Estado para el nombre de usuario

  const [queryDefault, setQueryDefault] = useState("cookie"); // término por defecto

  const [isOpen, setIsOpen] = useState(false); // Estado para el drawer (Sidebar)

  const toggleSidebar = () => {
    if (!isOpen) setCartOpen(false); // Si abrimos menú, cerramos carrito
    setIsOpen(!isOpen);
  };

  const toggleCart = () => {
    if (!cartOpen) setIsOpen(false); // Si abrimos carrito, cerramos menú
    setCartOpen(!cartOpen);
  };

  const closeSidebar = () => setIsOpen(false); // Función para cerrar el drawer

  const [error, setError] = useState(""); // Estado para manejar errores

  const navigate = useNavigate(); // Hook para redirección

  const [errorDefault, setErrorDefault] = useState(""); // Estado para manejar errores por defecto

  const [prompt, setPrompt] = useState(""); // Estado para el prompt de búsqueda

  const [response, setResponse] = useState(""); // Estado para la respuesta generada

  const [loading, setLoading] = useState(false); // Estado para el indicador de carga

  const [products, setProducts] = useState([]); // Estado para los productos obtenidos

  // Estados del carrito
  const [cartOpen, setCartOpen] = useState(false); // Sidebar derecho del carrito

  const [cartItems, setCartItems] = useState([]); // Productos añadidos al carrito

  // Estado para temporizador
  const [cooldown, setCooldown] = useState(0);

  const buscarProductos = async (termino) => {
    setProductsDefault([]); // Resetea el estado de los productos antes de buscar
    setErrorDefault(""); // Resetea el estado de error antes de buscar
    try {
      // Búsqueda IA
      const resIA = await fetch(
        "https://ecommercebackend-production-8245.up.railway.app/api/generateContentanalytic",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: termino }),
        }
      );
      if (!resIA.ok) throw new Error("Error búsqueda IA");
      const dataIA = await resIA.json();
      setProductsDefault(dataIA.products);
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };

  useEffect(() => {
    // Verifica si el usuario está autenticado
    buscarProductos(queryDefault);
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
            throw new Error("");
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

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

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

  useEffect(() => {
    if (cartOpen && userId) {
      //setLoading(true);
      fetch(
        `https://ecommercebackend-production-8245.up.railway.app/api/cartGet/${userId}`
      )
        .then((res) => {
          if (!res.ok)
            throw new Error("");
          return res.json();
        })
        .then((data) => setCartItems(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [cartOpen]);

  // Función asincrona para manejar la búsqueda
  const handleSearch = async () => {
    if (!prompt.trim() || cooldown > 0) return; // Si el prompt está vacío, no hacemos nada

    //Indicamos que estamos cargando (para mostrar "Cargando..." o desactivar el botón)

    setLoading(true);

    //Limpiamos cualquier respuesta previa
    setResponse("");

    try {
      //Realizamos una petición POST a la API de búsqueda
      const res = await fetch(
        "https://ecommercebackend-production-8245.up.railway.app/api/searchIA",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }, // Indicamos que el cuerpo de la petición es JSON
          body: JSON.stringify({ prompt }), // Convertimos el prompt a JSON
        }
      );

      //Parseamos la respuesta JSON
      const data = await res.json();

                if (!data || data.length === 0) {
      setError("No se encontraron productos para tu búsqueda 😔");
      setProducts([]);
      return;
    }

      // Guardamos la respuesta de la IA en el estado, si no hay respuesta, mostramos un mensaje de error

      if (data.aiResult) {
        setResponse(data.aiResult);
        setProducts(data.products || []); // Guardamos los productos obtenidos
      } else {
        setResponse("No se pudo generar una respuesta. Inténtalo de nuevo.");
        setProducts([]); // Limpiamos los productos si no hay respuesta
      }

      // Inicia cooldown de 30 segundos (puedes ajustar)
      setCooldown(5);
    } catch (error) {
      setResponse("Error al conectar con el servidor.");
      console.error("Error al buscar:", error);
    } finally {
      // Indicamos que hemos terminado de cargar
      setLoading(false);
    }
  };

  // Función para eliminar un producto del carrito
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
    <div className="relative min-h-screen bg-gray-100 flex flex-col overflow-x-hidden">
      {/* Encabezado */}
      <header className="w-full bg-black shadow-md">
        {/* Contenedor en línea */}
        <div className="flex items-center space-x-6 p-4">
          {/* Logo */}
          <img src={favicon} alt="Logo" className="w-16 h-auto" />
          {/* Título */}
          <h1 className="text-white text-3xl font-semibold">Modelo IA 📦</h1>
        </div>
      </header>

      {/* Botón para abrir/cerrar carrito */}
      <button
        onClick={toggleCart}
        className="fixed right-4 top-4 z-50 px-4 py-2 bg-green-600 text-white rounded hover:bg-zinc-800 transition"
      >
        🛒
      </button>

      {/*Boton para abrir y cerrar el sidebar */}
      <button
        onClick={toggleSidebar}
        className="fixed left-4 top-1/2 z-50 transform -translate-y-1/2 px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-500 transition"
      >
        {isOpen ? "Cerrar ➤" : "Ménu ➤"}
      </button>

      {/* Contenedor de anuncios */}
      <h2 className="text-xl font-semibold mt-6 mb-2 text-center">Anuncios</h2>
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

      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded shadow-md min-h-[150px]">
        <h2 className="text-xl font-semibold mb-4">
          {response
            ? response.split("#.#")[0].trim() // Primera sección como título
            : "Soy un sistema de busqueda basado en lenguaje natural e IA ¿Deseas algo?"}
        </h2>
        <p className="text-xs font-semibold mb-4">
          Nota. Es necesario esperar un cierto tiempo después de cada consulta
          para no saturar el servicio
        </p>

      {loading ? (
  "Cargando..."
) : error ? (
  <p className="text-red-600 font-semibold text-center">{error}</p>
) : response && products.length > 0 ? (
  response
    .split("#.#")
    .slice(1, 9)
    .map((section, index) => {
      const product = products[index] || {};
      return (
        <>
          <p className="text-gray-700">{section.trim()}</p>
          <div
            key={index}
            className="border p-4 rounded shadow mb-4 bg-gray-50"
          >
            {product.imagen && (
              <img
                src={product.imagen}
                alt={product.nombre || `Producto ${index + 1}`}
                className="w-full h-40 object-contain mb-2"
              />
            )}
            <h3 className="text-lg font-semibold mb-1">
              {product.nombre || `Producto ${index + 1}`}
            </h3>
            {product.marca && (
              <p className="text-gray-500 mb-2">{product.marca}</p>
            )}

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => addToCart(product)}
                className="bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-500 transition"
              >
                Añadir al carrito 🛒
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition"
                onClick={() => {
                  localStorage.setItem("selectedId", product.id);
                  navigate("/infor_products");
                }}
              >
                Ver descripción 📋
              </button>
            </div>
          </div>
        </>
      );
    })
) : (
  <p className="text-gray-700 font-semibold text-center">
    No se encontraron productos 😔
  </p>
)}

      </div>

      {/* Contenedor scroll horizontal */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-4 pt-4">
        {products.map((product, index) => (
          <>
            <div
              key={index}
              onClick={() => {
                localStorage.setItem("selectedId", product.id); // guardar en localStorage
                console.log("Id del producto agregado: ", product.id); // Verificar que el ID se guarda correctamente
                navigate("/infor_products"); // redirigir a la página de detalle
              }}
              className="flex flex-col justify-between w-48 bg-white rounded-lg shadow p-3 cursor-pointer hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mt-6 mb-2 text-center">
                Resultados de tu búsqueda:
              </h2>
              <div>
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="w-full h-40 object-contain mb-2"
                />
                <h3 className="text-lg font-semibold">{product.nombre}</h3>
                <p className="text-gray-500">{product.marca}</p>
              </div>

              {/* Botón siempre abajo */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Evita que se dispare el clic del div
                  addToCart(product); // Agregar al carrito
                }}
                className="mt-4 bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-500 transition"
              >
                Añadir al carrito 🛒
              </button>
            </div>
          </>
        ))}
      </div>

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
                onClick={() => {
                  localStorage.setItem("selectedId", product.id); // guardar en localStorage
                  console.log("Id del producto agregado: ", product.id); // Verificar que el ID se guarda correctamente
                  navigate("/infor_products"); // redirigir a la página de detalle
                }}
                className="flex-shrink-0 w-64 border p-4 rounded shadow bg-white flex flex-col justify-between cursor-pointer hover:shadow-lg transition"
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
                    e.stopPropagation(); // Evita que se dispare el clic del div
                    addToCart(product); // Agregar al carrito
                  }}
                  className="mt-4 bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-500 transition"
                >
                  Añadir al carrito 🛒
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="h-40 bg-gray-100"></div>

      {/*Fondo semitrasparente del overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar} // Cierra sidebar al clicar fuera
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        ></div>
      )}
      {/* Panel inferior tipo chat de IA (como el de ChatGPT) */}
      <div className="fixed bottom-4 left-4 right-4 bg-black text-white px-6 py-4 rounded-md shadow-lg z-50">
        <div className="flex justify-end items-center gap-4 flex-wrap">
          {/* Input y botón alineados a la derecha */}
          <input
            type="text"
            placeholder="Escribe tu consulta aquí"
            className="flex-grow max-w-md px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            style={{ backgroundColor: "#00a6ed" }}
            className="text-black px-4 py-2 rounded-md transition"
          >
            {cooldown > 0 ? `Espera ${cooldown}s` : "⬆️"}
          </button>
        </div>
      </div>

      {/* Fondo semitransparente del overlay para el carrito */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)} // cierra carrito al hacer clic fuera
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        ></div>
      )}

      {/* Sidebar Carrito */}
      <div
        className={`
    fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
    ${cartOpen ? "translate-x-0" : "translate-x-full"}
    z-50
  `}
      ></div>

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

          <button
            onClick={() => navigate("/home")}
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

            <button
              onClick={() => navigate("/prueba2")}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition mb-2"
            >
              Prueba 2: A/B 📝
            </button>
          
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

      {/* Sidebar Carrito */}
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

          {/* 👇 Productos del carrito */}
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
                      localStorage.setItem("selectedId", item.productId); // guardar en localStorage
                      console.log("Id del producto agregado: ", item.productId); // Verificar que el ID se guarda correctamente
                      navigate("/infor_products"); // redirigir a la página de detalle
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

//Exportamos el componente Home_IA
export default Home_IA;
