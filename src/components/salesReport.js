import React, { useState, useEffect } from "react";

const SalesReport = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/ventas', {
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
        setSales(data);
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al obtener el historial de ventas.');
      }
    };

    fetchSales();
  }, []);

  return (
    <div> 
      <h2 className="title1">Historial de Ventas</h2>
      <div className="sales-report-container">
      {sales.length === 0 ? (
        <p className="no-sales">No se han registrado ventas.</p>
      ) : (
        <table className="sales-table">
          <thead>
            <tr>
              <th>ID producto</th>
              <th>nombre</th>
              <th>Cantidad</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr>
                <td>{sale.productId}</td>
                <td>{sale.productName}</td>
                <td>{sale.quantitySold}</td>
                <td>{sale.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default SalesReport;