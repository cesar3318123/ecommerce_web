import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "./logo.jpg";
import favicon from "./CIGR_20_2.png";
import addToCart from "./addToCar.jsx";

function Home3() {
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

  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // Cooldown
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);



    // Función para buscar productos por defecto (tradicional)
  const buscarProductosDefault = async (termino) => {
    try {
      const res = await fetch(`https://ecommercebackend-production-8245.up.railway.app/api/searchTradictional?q=${encodeURIComponent(termino)}`);
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
  }, [navigate]);



  // Función para buscar ambos sistemas
  const handleSubmit = async (e) => {
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
      const resTrad = await fetch(`https://ecommercebackend-production-8245.up.railway.app/api/searchTradictional?q=${encodeURIComponent(query)}`);
      if (!resTrad.ok) throw new Error("Error búsqueda tradicional");
      const dataTrad = await resTrad.json();
      setProductsTrad(dataTrad);

      // Búsqueda IA
      const resIA = await fetch("https://ecommercebackend-production-8245.up.railway.app/api/generateContentanalytic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
      });
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
        <div key={index} className="flex-shrink-0 w-64 border p-4 rounded shadow bg-white flex flex-col justify-between">
          <h3 className="font-bold text-lg">{product.nombre || 'Sin nombre'}</h3>
          <p className="text-gray-700">Marca: {product.marca || 'Sin marca'}</p>
          {product.imagen && <img src={product.imagen} alt={product.nombre || 'Producto sin nombre'} className="mt-2 w-full h-40 object-cover" />}
          <button onClick={() => addToCart(product)} className="mt-4 bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-500 transition">
            Añadir al carrito 🛒
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#c9c9c9] shadow-md">
        <div className="flex items-center px-4 py-3">
          <button onClick={toggleSidebar} className="fixed left-4 top-1/2 z-50 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            {isOpen ? "Cerrar ➤" : "Ménu ➤"}
          </button>
          <div className="p-4">
            <img src={favicon} alt="Logo" className="w-32 h-auto" />
          </div>
          <h1 className="text-3xl font-semibold text-center">Analisis y comparativa de modelos 📊 📈</h1>
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
            <button type="submit" className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition">Buscar</button>
          </form>
        </div>
      </header>

      {/* Errores */}
      {errorTrad && <p className="text-red-500 text-center mt-4">{errorTrad}</p>}
      {errorIA && <p className="text-red-500 text-center mt-4">{errorIA}</p>}

      {/* Loading */}
      {loadingTrad && <p className="text-center mt-4 text-blue-500 font-semibold">Cargando búsqueda tradicional...</p>}
      {loadingIA && <p className="text-center mt-4 text-blue-500 font-semibold">Cargando búsqueda IA...</p>}

      {/* Resultados Comparativos */}
      {searched && (
        <>
          {productsTrad.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mt-6 mb-2 text-center">Resultados Tradicionales:</h2>
              {renderProducts(productsTrad)}
            </>
          )}
          {productsIA.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mt-6 mb-2 text-center">Resultados IA:</h2>
              {renderProducts(productsIA)}
            </>
          )}
          {productsTrad.length === 0 && productsIA.length === 0 && (
            <p className="text-center mt-4 text-red-500 font-semibold">No se encontró ningún producto 😢</p>
          )}
        </>
      )}

      {/* Productos por defecto */}
      {productsTrad.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-center">Recomendado para ti:</h2>
          {renderProducts(productsTrad)}
        </>
      )}

      {/* Sidebar */}
      {isOpen && (
        <div onClick={closeSidebar} className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
      )}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} z-50`}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menú</h2>
          <div className="p-4"><img src={logo} alt="Logo" className="w-32 h-auto" /></div>
          <p>Usuario: <strong>{username}</strong></p>
          <p>Cuenta: <strong>{email}</strong></p>
          <button onClick={() => navigate("/Profile")} className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition mb-2">Perfil 🪪</button>
          <button onClick={() => navigate("/model_analysis")} className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-400 transition mb-2">Analisis de Modelos 📈</button>
          <button onClick={() => navigate("/home2")} className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-400 transition mb-2">Cambiar Modelo ★★</button>
          <button onClick={() => navigate("/prueba1")} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition mb-2">Prueba 1: Precisión 🔍</button>
          {email === "cgutierrez23@ucol.mx" && (
            <button onClick={() => navigate("/prueba2")} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition mb-2">Prueba 2: A/B 📝</button>
          )}
          <button onClick={() => navigate("/prueba3")} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition mb-2">Prueba 3: A/B 📚</button>
          <button onClick={toggleSidebar} className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-500 transition mb-2">{isOpen ? "Cerrar ❌" : "Cerrar ❌"}</button>
          <p className="text-center mb-6">¿No tienes cuenta? <Link to="/reg" className="text-blue-600 hover:underline">registrate</Link>.</p>
        </div>
      </div>
    </div>
  );
}

export default Home3;
