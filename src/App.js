import React, { useState, useEffect } from "react";
import ProductForm from "./components/productForm";
import ProductList from "./components/productList";
import SellProduct from "./components/sellProduct";
import SalesReport from "./components/salesReport";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]); // Estado para registrar las ventas

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/productos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors'
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al obtener los productos.');
      }
    };

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/productos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al obtener los productos.');
    }
  };

  // Crear producto
  const addProduct = (product) => {
    setProducts([...products, { id: Date.now(), ...product }]);
    fetchProducts();
  };

  // Editar producto
  const editProduct = async (id, updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:5000/api/productos/${id}`, {
        method: 'PUT', // O 'PATCH' si solo quieres actualizar algunos campos
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
        mode: 'cors'
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      fetchProducts();
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al actualizar el producto.');
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      fetchProducts();
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al eliminar el producto.');
    }
  };

  // Realizar venta
  const sellProduct = (id, quantitySold) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    // Registrar la venta
    const sale = {
      id: Date.now(),
      productId: id,
      productName: product.name,
      quantitySold,
      total: product.price * quantitySold,
      date: new Date().toLocaleString(),
    };
    setSales([...sales, sale]);

    // Actualizar el stock del producto
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, stock: product.stock - quantitySold }
          : product
      )
    );
  };

  return (
    <div className="body">
      <h1 className="title1">Gestión de Inventario</h1>
      <ProductForm onAddProduct={addProduct} />
      <br /><hr /><br />
      <SellProduct products={products} onSellProduct={sellProduct} fetchProducts={fetchProducts}/>
      <br /><hr /><br />
      <ProductList
        products={products}
        onEditProduct={editProduct}
        onDeleteProduct={deleteProduct}/>
      <br /><hr /><br />
      <SalesReport sales={sales} />
    </div>
  );
};

export default App;