import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import { Link } from "react-router-dom";

const CoinInfo = ({ image, name, symbol }) => {
  useEffect(() => {
    const getCoinPrice = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=` +
          API_KEY
      );

      const json = await response.json();
      setPrice(json);
    };

    getCoinPrice().catch(console.error);
  }, [symbol]);

  const [price, setPrice] = useState(null);

  return (
    <div>
      {price ? (
        <Link
          className="main-list"
          style={{ color: "White" }}
          to={`/coinDetails/${symbol}`}
          key={symbol}
        >
          <img
            className="icons"
            src={`https://www.cryptocompare.com${image}`}
            alt={`Small icon for ${name} crypto coin`}
          />
          {name} <span className="tab"></span> ${price.USD} USD
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CoinInfo;
