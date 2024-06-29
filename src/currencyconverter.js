import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './currencyconverter.css';

//currency coverter function in reactJS//
const CurrencyConverter = () => {
  const [currencies, setcurrencies] = useState([]);
  const [fromcurrency, setfromcurrency] = useState('USD');
  const [tocurrency, settocurrency] = useState('INR');
  const [amount, setamount] = useState(1);
  const [result, setresult] = useState(null);

  // The UseEffect will render the api data only once along with main function get starts//

  useEffect(() => {
    axios
      .get(
        `https://v6.exchangerate-api.com/v6/e7f431800d0604061b388824/latest/USD`
      )
      .then((response) => {
        setcurrencies(Object.keys(response.data.conversion_rates));
      })
      .catch((error) => console.log("Error fetching the Data", error));
  }, []);

  // this function provides the exchange rate from one currency to the other//

  const convertCurrency = () => {
    axios
      .get(
        `https://v6.exchangerate-api.com/v6/e7f431800d0604061b388824/pair/${fromcurrency}/${tocurrency}/${amount}`
      )
      .then((response) => {
        const converstionresult = response.data.conversion_result;
        setresult(converstionresult);
      })
      .catch((error) => console.log("Error converting the pairs,", error));
  };

  return (
    <div className="currencyconverter">
      <h1> Currency Converter</h1>
      <span> Amount</span>
      <input
        type="number"
        value={amount}
        onChange={(e) => setamount(e.target.value)}
      />
      <span> From</span>
      <select
        value={fromcurrency}
        onChange={(e) => setfromcurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <span> To </span>
      <select
        value={tocurrency}
        onChange={(e) => settocurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <button onClick={convertCurrency}>Convert</button>
      {result && (
        <h2>
          {amount} {fromcurrency} = {result} {tocurrency}
        </h2>
      )}
    </div>
  );
};
export default CurrencyConverter;
