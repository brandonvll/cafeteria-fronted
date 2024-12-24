import React, { useState } from "react";

const EditModal = ({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "precio" || name === "peso" || name === "stock" ? parseInt(value, 10) : value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
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
          <button onClick={handleSave} className="save-button">Guardar</button>
          <button onClick={onClose} className="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
