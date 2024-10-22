import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinDetail = () => {
  let params = useParams();

  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getCoinDetail = async () => {
      const details = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${params.symbol}&tsyms=USD&api_key=` +
          API_KEY
      );
      const description = await fetch(
        `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${params.symbol}&api_key=` +
          API_KEY
      );

      const detailsJson = await details.json();
      const descripJson = await description.json();

      setFullDetails({
        numbers: detailsJson.DISPLAY[params.symbol.toUpperCase()],
        textData: descripJson.Data[params.symbol.toUpperCase()],
      });
    };

    getCoinDetail().catch(console.error);
  }, [params.symbol]);

  return (
    <div>
      {!fullDetails ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>{fullDetails.textData.FullName}</h1>
          <img
            className="images"
            src={`https://www.cryptocompare.com${fullDetails.numbers.USD.IMAGEURL}`}
            alt={`Small icon for ${params.symbol} crypto coin`}
          />
          <div> {fullDetails.textData.Description}</div>
          <br></br>
          <div>
            This coin was built with the algorithm{" "}
            {fullDetails.textData.Algorithm}{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinDetail;
