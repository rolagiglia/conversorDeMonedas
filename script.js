// script.js
document.getElementById("conversionForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const monedaOrigen = document.getElementById("monedaOrigen").value;
    const monedaDestino = document.getElementById("monedaDestino").value;
    const valor = parseFloat(document.getElementById("valor").value);

    if (!monedaOrigen || !monedaDestino || isNaN(valor)) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const API_KEY = "73674022f35423a472806e7a59154c7a"; // Reemplaza con tu clave real
    const BASE_URL = "http://api.exchangeratesapi.io/v1/lastest";

    try {
        const url = `${BASE_URL}?access_key=${API_KEY}&symbols=${monedaDestino}`;  
        const response = await fetch(url);      
        if (!response.ok) throw new Error("No se pudo obtener la tasa de cambio.");
        const data = await response.json();
        const tasa = data.rates[monedaDestino];
        const resultado = valor * tasa;

        document.getElementById("resultado").innerText =
            `El resultado es ${resultado.toFixed(2)} ${monedaDestino}`;
    } catch (error) {
        document.getElementById("resultado").innerText =
             `Ocurrió un error al realizar la conversión. Inténtalo más tarde. ${tasa}`;
        console.error(error);
    }
});
