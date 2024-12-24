import React, { useState } from "react";

const ProductForm = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    name: "",
    reference: "",
    price: "",
    weight: "",
    category: "",
    stock: "",
    creationDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      nombreProducto,
      referencia,
      precio,
      peso,
      categoria,
      stock,
    } = product;
  
    // Validaciones
    if (
      !nombreProducto ||
      !referencia ||
      !precio ||
      !peso ||
      !categoria ||
      !stock
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    if (isNaN(precio) || isNaN(peso) || isNaN(stock)) {
      alert("Precio, peso y stock deben ser números.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
        mode: 'cors'
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const data = await response.json();
      console.log('Producto agregado:', data);
  
      onAddProduct(product);
      setProduct({
        nombreProducto: "",
        referencia: "",
        precio: "",
        peso: "",
        categoria: "",
        stock: ""
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al agregar el producto.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        type="text"
        name="nombreProducto"
        placeholder="Nombre del producto"
        value={product.nombreProducto}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="text"
        name="referencia"
        placeholder="Referencia"
        value={product.referencia}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={product.precio}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="number"
        name="peso"
        placeholder="Peso (kg)"
        value={product.peso}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="text"
        name="categoria"
        placeholder="Categoría"
        value={product.categoria}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={product.stock}
        onChange={handleChange}
        className="form-input"
      />
      <button type="submit" className="form-button">Agregar Producto</button>
    </form>
  );
};

export default ProductForm;
