import React from 'react';

const TradeSection = ({
  executeBuyOrderAmount,
  setExecuteBuyOrderAmount,
  executeBuyOrderAtMarket,
  executeSellOrderPrice,
  setExecuteSellOrderPrice,
  executeSellOrderAtMarket,
  createBuyOrderAmount,
  setCreateBuyOrderAmount,
  createBuyOrderPrice,
  setCreateBuyOrderPrice,
  createBuyOrder,
  createSellOrderAmount,
  setCreateSellOrderAmount,
  createSellOrderPrice,
  setCreateSellOrderPrice,
  createSellOrder
}) => {
  return (
    <div id="trade">
      <div className="head-dv">
        <h2>Trade</h2>
      </div>

      <form className="form-type" onSubmit={(e) => { e.preventDefault(); executeBuyOrderAtMarket(); }}>
        <label htmlFor="token">Compra instantánea</label>
        <div className="group">
          <input
            type="number"
            name="token"
            id="token"
            placeholder="TOKEN B"
            value={executeBuyOrderAmount}
            onChange={(e) => setExecuteBuyOrderAmount(e.target.value)}
          />
          <button id="v2" className="button">
            <i className="fa-solid fa-right-left"></i>
          </button>
          <button className="button2" type="submit">Comprar</button>
        </div>
        <p>= {executeBuyOrderAmount} TOKEN A</p>
      </form>

      <form className="form-type" onSubmit={(e) => { e.preventDefault(); executeSellOrderAtMarket(); }}>
        <label htmlFor="token2">Venta instantánea</label>
        <div className="group">
          <input
            type="number"
            name="token2"
            id="token2"
            placeholder="TOKEN A"
            value={executeSellOrderPrice}
            onChange={(e) => setExecuteSellOrderPrice(e.target.value)}
          />
          <button id="v3" className="button">
            <i className="fa-solid fa-right-left"></i>
          </button>
          <button className="button2" type="submit">Vender</button>
        </div>
        <p>= {executeSellOrderPrice} TOKEN B</p>
      </form>

      <form className="form-type f2" onSubmit={(e) => { e.preventDefault(); createBuyOrder(); }}>
        <label htmlFor="token3">Orden de compra límite</label>
        <div className="group f2">
          <input
            type="number"
            name="token3"
            id="token3"
            placeholder="TOKEN B"
            value={createBuyOrderAmount}
            onChange={(e) => setCreateBuyOrderAmount(e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio"
            name="price"
            id="price"
            value={createBuyOrderPrice}
            onChange={(e) => setCreateBuyOrderPrice(e.target.value)}
          />
        </div>
        <p>= {createBuyOrderAmount/createBuyOrderPrice} ONCE</p>
        <button className="button" type="submit">Crear orden de compra</button>
      </form>

      <form className="form-type f2" onSubmit={(e) => { e.preventDefault(); createSellOrder(); }}>
        <label htmlFor="token4">Orden de venta límite</label>
        <div className="group f2">
          <input
            type="number"
            name="token4"
            id="token4"
            placeholder="TOKEN A"
            value={createSellOrderAmount}
            onChange={(e) => setCreateSellOrderAmount(e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio"
            name="price2"
            id="price2"
            value={createSellOrderPrice}
            onChange={(e) => setCreateSellOrderPrice(e.target.value)}
          />
        </div>
        <p>= {createSellOrderAmount*createSellOrderPrice} USDC</p>
        <button className="button" type="submit">Crear orden de venta</button>
      </form>
    </div>
  );
};

export default TradeSection;