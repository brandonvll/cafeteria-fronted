import React, { useState, useEffect } from 'react';

const SellProduct = ({ fetchProducts }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [sales, setSales] = useState([]);

  // Cargar los productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/productos');
        const data = await response.json();
        // Filtrar productos con stock > 0
        const availableProducts = data.filter(product => product.stock > 0);
        setProducts(availableProducts);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };
    fetchProducts();
  }, []);

  // Manejar el cambio en el producto seleccionado
  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  // Manejar el cambio en la cantidad
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  // Registrar la venta
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedProduct && quantity > 0) {
      try {
        // Enviar la venta al backend
        const response = await fetch('http://localhost:5000/api/ventas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: selectedProduct,
            quantitySold: quantity,
          }),
        });
        const saleData = await response.json();

        // Actualizar el stock localmente
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product._id === selectedProduct
              ? { ...product, stock: product.stock - quantity }
              : product
          )
        );

        // Agregar la venta a la lista de ventas
        setSales(prevSales => [...prevSales, saleData]);
        alert('Venta realizada con éxito');
        setQuantity(0); // Resetear la cantidad
        fetchProducts();
      } catch (error) {
        console.error("Error al registrar la venta:", error);
        alert('Error al registrar la venta');
      }
    } else {
      alert('Por favor, selecciona un producto y una cantidad válida.');
    }
  };

  return (
    <div>
      <h2 className="title1">Venta de Productos</h2>
      <div className="sell-product-container">
        <form onSubmit={handleSubmit} className="sell-product-form">
          <div className="form-group">
            <label className="form-label">Producto:</label>
            <select value={selectedProduct} onChange={handleProductChange} className="form-control">
              <option value="">Selecciona un producto</option>
              {products.map(product => (
                <option key={product._id} value={product._id}>
                  {product.nombreProducto} - {product.precio}$
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Cantidad:</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={products.find(product => product._id === selectedProduct)?.stock || 0}
              className="form-control"
            />
          </div>
          <button type="submit" className="form-button" >Vender</button>
        </form>

        <h3 className='title3'>Ventas Realizadas:</h3>
        <table className="sales-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad Vendida</th>
              <th>Fecha de Venta</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={index}>
                <td>{sale.productName}</td>
                <td>{sale.quantitySold}</td>
                <td>{new Date(sale.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellProduct;
