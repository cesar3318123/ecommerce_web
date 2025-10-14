import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "./logo.jpg";
import favicon from "./CIGR_20_2.png";
import addToCart from "./addToCar.jsx";
import ecommerce from "./img/ecommerce.png";

function Home3() {
  const userId = localStorage.getItem("userId");
  const [ads, setAds] = useState([]); // Estado para los anuncios

  const [query, setQuery] = useState(""); // Input del usuario
  const [queryDefault] = useState("cookie"); // Término por defecto

  const [productsTrad, setProductsTrad] = useState([]);
  const [productsIA, setProductsIA] = useState([]);

  const [loadingTrad, setLoadingTrad] = useState(false);
  const [loadingIA, setLoadingIA] = useState(false);

  const [errorTrad, setErrorTrad] = useState("");
  const [errorIA, setErrorIA] = useState("");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [searched, setSearched] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const [error, setError] = useState(""); // Estado para manejar errores
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga

  // Estados del carrito
  const [cartOpen, setCartOpen] = useState(false); // Sidebar derecho del carrito

  const [cartItems, setCartItems] = useState([]); // Productos añadidos al carrito

  // Estados para esconder la imager
  const [imagen, setImagen] = useState(true);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    if (!isOpen) setCartOpen(false); // Si abrimos menú, cerramos carrito
    setIsOpen(!isOpen);
  };

  // Función para abrir/cerrar el carrito
  const toggleCart = () => {
    if (!cartOpen) setIsOpen(false); // Si abrimos carrito, cerramos menú
    setCartOpen(!cartOpen);
  };
  const closeSidebar = () => setIsOpen(false);

  // Cooldown
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  // Función para buscar productos por defecto (tradicional)
  const buscarProductosDefault = async (termino) => {
    try {
      const res = await fetch(
        `https://ecommercebackend-production-8245.up.railway.app/api/searchTradictional?q=${encodeURIComponent(
          termino
        )}`
      );
      const data = await res.json();
      setProductsTrad(data);
    } catch (error) {
      console.error("Error al buscar productos por defecto:", error);
      setErrorTrad("Error al cargar productos recomendados");
    }
  };

  // Carga inicial: productos por defecto y datos de usuario
  useEffect(() => {
    buscarProductosDefault(queryDefault);
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("username");
    if (!userEmail) {
      setEmail("Invitado");
      setUsername("Invitado");
    } else {
      setEmail(userEmail);
      setUsername(userName);
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

  useEffect(() => {
    if (cartOpen && userId) {
      //setLoading(true);
      fetch(
        `https://ecommercebackend-production-8245.up.railway.app/api/cartGet/${userId}`
      )
        .then((res) => {
          if (!res.ok)
            throw new Error("No tienes productos agregados en tu carrito");
          return res.json();
        })
        .then((data) => setCartItems(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [cartOpen]);

  // Función para buscar ambos sistemas
  const handleSubmit = async (e) => {
    setImagen(true);
    e.preventDefault();
    if (!query.trim() || cooldown > 0) return;

    setSearched(true);
    setProductsTrad([]);
    setProductsIA([]);
    setErrorTrad("");
    setErrorIA("");
    setLoadingTrad(true);
    setLoadingIA(true);

    // Activar cooldown de 3 segundos para evitar spam
    setCooldown(3);

    try {
      // Búsqueda Tradicional
      const resTrad = await fetch(
        `https://ecommercebackend-production-8245.up.railway.app/api/searchTradictional?q=${encodeURIComponent(
          query
        )}`
      );
      if (!resTrad.ok) throw new Error("Error búsqueda tradicional");
      const dataTrad = await resTrad.json();
      setProductsTrad(dataTrad);

      // Búsqueda IA
      const resIA = await fetch(
        "https://ecommercebackend-production-8245.up.railway.app/api/generateContentanalytic",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: query }),
        }
      );
      if (!resIA.ok) throw new Error("Error búsqueda IA");
      const dataIA = await resIA.json();
      setProductsIA(dataIA.products);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setErrorTrad("Error en búsqueda tradicional");
      setErrorIA("Error en búsqueda IA");
    } finally {
      setLoadingTrad(false);
      setLoadingIA(false);
    }
  };

  // Componente para mostrar productos
  const renderProducts = (products) => (
    <div className="flex overflow-x-auto space-x-4 p-4">
      {products.map((product, index) => (
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
          <p className="text-gray-700">Marca: {product.marca || "Sin marca"}</p>
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
          {/*Botón de información del producto */}
          <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition">
            Ver descripción 📋
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="w-full bg-green-600 shadow-md">
        {/* Botón para abrir/cerrar carrito */}
        <button
          onClick={toggleCart}
          className="fixed right-4 top-4 z-50 px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-800 transition"
        >
          🛒
        </button>
        <div className="flex items-center px-4 py-3">
          <button
            onClick={toggleSidebar}
            className="fixed left-4 top-1/2 z-50 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isOpen ? "Cerrar ➤" : "Ménu ➤"}
          </button>
          <div className="p-4">
            <img src={favicon} alt="Logo" className="w-32 h-auto" />
          </div>
          <h1 className="text-3xl font-semibold text-center">
            Analisis y comparativa de modelos 📊 📈
          </h1>
        </div>
        <div className="p-4 flex justify-end items-center space-x-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Escribe tu consulta aquí"
              className="flex-grow max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition"
            >
              Buscar
            </button>
          </form>
        </div>
      </header>

      {/* Errores */}
      {errorTrad && (
        <p className="text-red-500 text-center mt-4">{errorTrad}</p>
      )}
      {errorIA && <p className="text-red-500 text-center mt-4">{errorIA}</p>}

      {/* Loading */}
      {loadingTrad && (
        <p className="text-center mt-4 text-blue-500 font-semibold">
          Cargando búsqueda tradicional...
        </p>
      )}
      {loadingIA && (
        <p className="text-center mt-4 text-blue-500 font-semibold">
          Cargando búsqueda IA...
        </p>
      )}

      {/* Resultados Comparativos */}
      {/* Resultados Comparativos */}
      <div className="mt-10 px-6">
        {searched && (
          <>
            {/* Resultados Tradicionales */}
            {productsTrad.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                  🧩 Resultados con busqueda de palabras clave
                </h2>

                <div className="flex overflow-x-auto space-x-6 p-4 bg-gray-50 rounded-lg shadow-inner">
                  {renderProducts(productsTrad)}
                </div>

                <p className="text-center mt-3 text-gray-600">
                  Total resultados:{" "}
                  <span className="font-semibold">{productsTrad.length}</span>
                </p>
              </div>
            )}

            {/* Línea divisoria entre resultados */}
            {productsTrad.length > 0 && productsIA.length > 0 && (
              <div className="relative flex items-center justify-center my-10">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="absolute bg-white px-4 text-gray-500 text-sm font-medium">
                  Comparativa entre sistemas
                </span>
              </div>
            )}

            {/* Resultados IA */}
            {productsIA.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                  🤖 Resultados con Lenguaje natural e IA
                </h2>

                <div className="flex overflow-x-auto space-x-6 p-4 bg-gray-50 rounded-lg shadow-inner">
                  {renderProducts(productsIA)}
                </div>

                <p className="text-center mt-3 text-gray-600">
                  Total resultados:{" "}
                  <span className="font-semibold">{productsIA.length}</span>
                </p>
              </div>
            )}

            {/* Mensajes si no hay resultados */}
            {!loadingTrad && productsTrad.length === 0 && (
              <p className="text-center mt-4 text-red-500 font-semibold">
                No se encontró ningún producto usando el sistema tradicional 😢
              </p>
            )}
            {!loadingIA && productsIA.length === 0 && (
              <p className="text-center mt-4 text-red-500 font-semibold">
                No se encontró ningún producto usando el sistema de IA con
                lenguaje natural 😢
              </p>
            )}
          </>
        )}
      </div>

      {/* Fondo semitransparente del overlay para el carrito */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)} // cierra carrito al hacer clic fuera
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        ></div>
      )}
      {imagen && (
        <div>
          <p className="text-xl font-bold mb-6">
            Realiza tus consultas de productos en el buscador de la parte de
            arriba
          </p>

          <div className="flex justify-center my-4">
            <img
              src={ecommerce}
              alt="Ecommerce"
              className="w-full max-w-4xl h-auto object-contain mx-auto mb-4 border rounded-lg shadow"
            />
          </div>
        </div>
      )}

      {/* Sidebar */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
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
            onClick={() => navigate("/home2")}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-400 transition mb-2"
          >
            Cambiar Modelo ★★
          </button>
          <button
            onClick={() => navigate("/prueba1")}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition mb-2"
          >
            Prueba 1: Precisión 🔍
          </button>
          {email === "cgutierrez23@ucol.mx" && (
            <button
              onClick={() => navigate("/prueba2")}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition mb-2"
            >
              Prueba 2: A/B 📝
            </button>
          )}
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

export default Home3;
