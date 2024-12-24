import React, { useState } from "react";

const ProductList = ({ products, onEditProduct, onDeleteProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    nombreProducto: "",
    referencia: "",
    precio: "",
    peso: "",
    categoria: "",
    stock: "",
  });

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({ ...product });
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "precio" || name === "peso" || name === "stock" ? parseInt(value, 10) : value,
    });
  };

  const handleSave = () => {
    if (
      formData.nombreProducto &&
      formData.referencia &&
      formData.precio &&
      formData.peso &&
      formData.categoria &&
      formData.stock
    ) {
      onEditProduct(selectedProduct._id, formData);
      closeEditModal();
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  return (
    <div>
      <h2 className="title1">Lista de Productos</h2>
      <div className="product-list-container">
        {products.length === 0 ? (
          <p className="no-products">No hay productos registrados.</p>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Referencia</th>
                <th>Precio</th>
                <th>Peso</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Fecha de Creación</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="product-item">
                  <td>{product.nombreProducto}</td>
                  <td>{product.referencia}</td>
                  <td>${product.precio}</td>
                  <td>{product.peso} kg</td>
                  <td>{product.categoria}</td>
                  <td>{product.stock}</td>
                  <td>{product.fechaCreacion}</td>
                  <td>
                    <button
                      onClick={() => openEditModal(product)}
                      className="edit-button"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => onDeleteProduct(product._id)}
                      className="delete-button"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Producto</h2>
            <form>
              <label>Nombre del Producto:</label>
              <input
                type="text"
                name="nombreProducto"
                value={formData.nombreProducto}
                onChange={handleChange}
              />
              <label>Referencia:</label>
              <input
                type="text"
                name="referencia"
                value={formData.referencia}
                onChange={handleChange}
              />
              <label>Precio:</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
              />
              <label>Peso:</label>
              <input
                type="number"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
              />
              <label>Categoría:</label>
              <input
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
              />
              <label>Stock:</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </form>
            <div className="modal-actions">
              <button onClick={handleSave} className="save-button">
                Guardar
              </button>
              <button onClick={closeEditModal} className="cancel-button">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
