import React from 'react';

const OrderBook = ({ tokenA, tokenB, sellOrders, buyOrders, currentPrice, onRefresh }) => {
  return (
    <div id="order-book">
      <div className="head-dv">
        <h2>Libro de Órdenes</h2>
      </div>
      <table className="order-table">
        <thead>
          <tr>
            <th>Precio</th>
            <th>{tokenA}</th>
            <th>{tokenB}</th>
          </tr>
        </thead>
        <tbody>
          {sellOrders.map((order, index) => (
            <tr key={`sell-${index}`}>
              <td className="p-v red">{order.price}</td>
              <td className="a-a">{order.amountA}</td>
              <td className="b-a">{order.amountB}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{currentPrice}</h3>

      <table className="order-table">
        <tbody>
          {buyOrders.map((order, index) => (
            <tr key={`buy-${index}`}>
              <td className="p-v green">{order.price}</td>
              <td className="a-a">{order.amountA}</td>
              <td className="b-a">{order.amountB}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button" onClick={onRefresh}>Actualizar</button>
    </div>
  );
};

export default OrderBook;