import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-50 flex flex-col items-center justify-center px-6 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full text-center border border-green-100">
        <h1 className="text-3xl font-extrabold text-green-700 mb-6">
          🛒 Instrucciones del Prototipo
        </h1>

        <div className="space-y-4 text-gray-700 leading-relaxed text-base sm:text-lg">
          <p>
            Este es un prototipo de <strong>E-commerce</strong> que utiliza dos
            sistemas de búsqueda:
          </p>
          <ul className="list-disc list-inside text-left mx-auto max-w-md">
            <li>
              🔍 <strong>Lenguaje natural con IA</strong>
            </li>
            <li>
              🧩 <strong>Búsqueda tradicional por palabras clave</strong>
            </li>
          </ul>

          <p>
            El objetivo es comparar ambos sistemas en términos de{" "}
            <strong>precisión, relevancia</strong> y{" "}
            <strong>experiencia de usuario</strong>.
          </p>

          <p>
            Para ello, se realizarán <strong>4 pruebas</strong> diferentes.  
            Selecciona a continuación con cuál sistema deseas comenzar:
          </p>


          <p>En el boton izquierdo encontraras el menu con las pruebas y otras opciones.</p>
          <p>En el boton derecho encontraras el carrito con todos los productos agregados.</p>

          <p>En esta versión, el sistema no puede realizar compras ni visualizar precios</p>
          <p>pero si buscar productos, que es el objetivo principal de la investigación</p>
        </div>

        {/* Botones de navegación */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/home2"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow transition-all duration-200 hover:scale-105"
          >
            🤖 Sistema con IA (Lenguaje Natural)
          </Link>

          <Link
            to="/home"
            className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-6 py-3 rounded-xl shadow transition-all duration-200 hover:scale-105"
          >
            💡 Sistema Tradicional
          </Link>
        </div>
      </div>

      <footer className="mt-10 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Proyecto E-commerce Experimental · Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default Menu;
