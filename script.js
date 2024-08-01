// script.js

const API_KEY = "cur_live_SoIweKqpXAyuw4tBb9eUH36VE7CaiaZRmuCFYDtN"; // Replace with your API key
const API_URL = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}`;

document.addEventListener("DOMContentLoaded", () => {
  fetchCurrencies();
  document
    .getElementById("converter-form")
    .addEventListener("submit", convertCurrency);
});

async function fetchCurrencies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    populateCurrencyOptions(data.data);
  } catch (error) {
    console.error("Error fetching currency data:", error);
  }
}

function populateCurrencyOptions(currencyData) {
  const fromCurrencySelect = document.getElementById("from-currency");
  const toCurrencySelect = document.getElementById("to-currency");

  for (const currency in currencyData) {
    const option = document.createElement("option");
    option.value = currency;
    option.textContent = currency;
    fromCurrencySelect.appendChild(option);
    toCurrencySelect.appendChild(option.cloneNode(true));
  }
}

async function convertCurrency(event) {
  event.preventDefault();

  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;

  try {
    const response = await fetch(`${API_URL}&base_currency=${fromCurrency}`);
    const data = await response.json();
    const rate = data.data[toCurrency].value;
    const convertedAmount = (amount * rate).toFixed(2);
    displayResult(convertedAmount, toCurrency);
  } catch (error) {
    console.error("Error converting currency:", error);
  }
}

function displayResult(amount, currency) {
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `${amount} ${currency}`;
}
