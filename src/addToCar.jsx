const addToCart = async (product) => {
      try {
    // Aquí debes obtener el userId (puede venir del login o localStorage)
    const userId = localStorage.getItem("userId") || 1; // Ejemplo fijo

    const response = await fetch("https://ecommercebackend-production-8245.up.railway.app/api/cartSave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        nombre: product.nombre,
        marca: product.marca,
        imagen: product.imagen,
      }),
    });

    if (response.ok) {
      alert(`Producto ${product.nombre} añadido al carrito`);
    } else {
      alert("Error al añadir al carrito");
    }
  } catch (error) {
    alert("Error en la conexión con el servidor");
    console.error(error);
  }
}

// Exporta la función para que pueda ser utilizada en otros componentes
export default addToCart;