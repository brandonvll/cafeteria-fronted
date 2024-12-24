import React from "react";

const productList = ({ products, onEditProduct, onDeleteProduct }) => {
  const handleEdit = (id) => {
    const nombreProducto = prompt("Nuevo nombre del producto:");
    const referencia = prompt("Nueva referencia:");
    const precio = prompt("Nuevo precio:");
    const peso = prompt("Nuevo peso:");
    const categoria = prompt("Nueva categoría:");
    const stock = prompt("Nuevo stock:");

    if (nombreProducto && referencia && precio && peso && categoria && stock) {
      onEditProduct(id, {
        nombreProducto,
        referencia,
        precio: parseInt(precio, 10),
        peso: parseInt(peso, 10),
        categoria,
        stock: parseInt(stock, 10)
      });
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
              <tr key={product.id} className="product-item">
                <td>{product.nombreProducto}</td>
                <td>{product.referencia}</td>
                <td>${product.precio}</td>
                <td>{product.peso} kg</td>
                <td>{product.categoria}</td>
                <td>{product.stock}</td>
                <td>{product.fechaCreacion}</td>
                <td>
                  <button onClick={() => handleEdit(product._id)} className="edit-button"><i className="fas fa-edit"></i></button>
                </td>
                <td>
                  <button onClick={() => onDeleteProduct(product._id)} className="delete-button"><i className="fas fa-trash-alt"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default productList;
